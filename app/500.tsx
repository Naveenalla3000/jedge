// InternalServerErrorPage.tsx

import React, { useEffect, useRef } from "react"
import { Butterfly_Kids } from "next/font/google"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const InternalServerErrorPage: React.FC = () => {
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      updateEyeRotation(leftEyeRef, event)
      updateEyeRotation(rightEyeRef, event)
    }
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const updateEyeRotation = (
    eyeRef: React.RefObject<HTMLDivElement>,
    event: MouseEvent
  ) => {
    if (eyeRef.current) {
      const eye = eyeRef.current
      const { left, top, width, height } = eye.getBoundingClientRect()
      const eyeCenterX = left + width / 2
      const eyeCenterY = top + height / 2
      const rad = Math.atan2(event.pageX - eyeCenterX, event.pageY - eyeCenterY)
      const degree = rad * (180 / Math.PI) * -1 + 180
      eye.style.transform = `rotate(${degree}deg)`
    }
  }

  return (
    <div className="error-page">
      <div className="error-wrapper">
        <span className="error-num">5</span>
        <div className="eye mr-2" ref={leftEyeRef}></div>
        <div className="eye" ref={rightEyeRef}></div>
        <p>
          Oh eyeballs! Something went wrong. We're <i>looking</i> to see what
          happened.
        </p>
        <Button className="mt-[4rem]">
          {" "}
          <Link href={"/"}>Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default InternalServerErrorPage
