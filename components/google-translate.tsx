"use client"
import { useEffect } from "react"

const GoogleTranslate = () => {
  useEffect(() => {
    const googleTranslateScript = document.createElement("script")
    googleTranslateScript.type = "text/javascript"
    googleTranslateScript.async = true
    googleTranslateScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    document.body.appendChild(googleTranslateScript)

    window.googleTranslateElementInit = function () {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      )
    }
    return () => {
      setTimeout(() => {
        document.body.removeChild(googleTranslateScript)
      }, 1000)
    }
  }, [])

  return <div id="google_translate_element"></div>
}

export default GoogleTranslate
