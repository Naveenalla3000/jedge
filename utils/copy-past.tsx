import { showToast } from "./show-toast"

export const handleKeyDown = (event: React.KeyboardEvent) => {
  if (
    (event.ctrlKey || event.metaKey) &&
    (event.key === "c" || event.key === "v" )
  ) {
    event.preventDefault()
    return showToast({
      title: `\u26A0 Copy or pasting code disabled`,
      description: "You should not copy or past the code",
    })
  }
}
