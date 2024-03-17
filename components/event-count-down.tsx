"use client"

import React, { useEffect, useState } from "react"
import FlipCountdown from "@rumess/react-flip-countdown"
import { useTheme } from "next-themes"

import { Themes } from "../types/themes"

type Props = {
  endsAt :string;
}
const EventCountDown:React.FC<Props> = ({endsAt}) => {
  const { theme } = useTheme()
  const [countdownTheme, setCountdownTheme] = useState<Themes>("light")

  useEffect(() => {
    setCountdownTheme(theme === "dark" ? "dark" : "light")
  }, [theme])
  return (
    <FlipCountdown
      endAtZero
      hideYear
      hideMonth
      size="small"
      dayTitle="Day"
      hourTitle="Hrs"
      minuteTitle="Min"
      secondTitle="Sec"
      titlePosition="bottom"
      theme={countdownTheme}
      endAt={endsAt}
    />
  )
}

export default EventCountDown
