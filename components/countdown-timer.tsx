// Import React and any necessary type definitions
import React from "react"

import { useCountdown } from "@/hooks/usecountdown"

import DateTimeDisplay, { TimeConstrant } from "./datetime-display"

interface INotice {
  type?: string
  message: string
}

const Notice: React.FC<INotice> = ({ type, message }) => {
  return (
    <div className="notice">
      <span>{message}</span>
    </div>
  )
}
interface ShowCounterProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const ShowCounter: React.FC<ShowCounterProps> = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  return (
    <div className="show-counter flex items-center gap-x-1">
      <DateTimeDisplay
        value={days}
        type={TimeConstrant.DAYS}
        isDanger={days <= 3}
      />

      <DateTimeDisplay
        value={hours}
        type={TimeConstrant.HOURS}
        isDanger={days === 0 && hours <= 12}
      />

      <DateTimeDisplay
        value={minutes}
        type={TimeConstrant.MINUTES}
        isDanger={days == 0 && hours === 0 && minutes <= 60}
      />

      <DateTimeDisplay
        value={seconds}
        type={TimeConstrant.SECONDS}
        isDanger={days === 0 && hours === 0 && minutes == 0 && seconds <= 59}
      />
    </div>
  )
}

interface CountdownTimerProps {
  targetStartTime: number
  targetEndTime: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetStartTime,
  targetEndTime,
}) => {
  const [daysToStart, hoursToStart, minutesToStart, secondsToStart] =
    useCountdown(targetStartTime)
  const [daysToEnd, hoursToEnd, minutesToEnd, secondsToEnd] =
    useCountdown(targetEndTime)
  const hasStarted =
    daysToStart + hoursToStart + minutesToStart + secondsToStart <= 0
  const hasEnded = daysToEnd + hoursToEnd + minutesToEnd + secondsToEnd <= 0
  if (hasEnded) {
    return <Notice message="Ended" />
  } else if (hasStarted) {
    return <Notice message="Progress" />
  } else {
    return (
      <ShowCounter
        days={daysToStart}
        hours={hoursToStart}
        minutes={minutesToStart}
        seconds={secondsToStart}
      />
    )
  }
}

export default CountdownTimer
