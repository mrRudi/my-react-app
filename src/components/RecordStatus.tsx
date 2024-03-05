import Chip, { type ChipProps } from "@mui/material/Chip"
import type { ReactNode } from "react"


interface RecordStatusProps extends Omit<ChipProps, "variant"> {
  variant: "completed" | "uncompleted"
}

export const RecordStatus = ({ variant, ...rest }: RecordStatusProps): ReactNode => {
  return <Chip
    size="small"
    variant="filled"
    clickable={false}
    label={variant === 'completed' ? "Completed" : "Not completed"}
    color={variant === 'completed' ? "success" : "error"}
    {...rest}
  />
}
