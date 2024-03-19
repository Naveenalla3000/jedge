import { toast } from "sonner"

interface IToast {
  title: string
  description: string
}

export const showToast = ({ title, description }: IToast): void => {
  toast(title, {
    description: description,
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  })
}
