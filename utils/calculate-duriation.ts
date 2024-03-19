export const calculateDuration = (startsAt: string, endsAt: string): string => {
    const startDate = new Date(startsAt)
    const endDate = new Date(endsAt)
    const durationMs = endDate.getTime() - startDate.getTime()
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60)
    const seconds = Math.floor((durationMs / 1000) % 60)
    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`
  }