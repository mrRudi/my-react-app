
import { Button, Card, IconButton, Stack } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CloseIcon from '@mui/icons-material/CloseOutlined'
import { RecordStatus } from "./RecordStatus"
import { toggleTodo, deleteTodo, changeDateOfTodo, type ITodo } from "../lib/slices"
import { useAppDispatch } from "../lib/store"
import { DATE_FORMAT, formatDate, parseDate } from "../lib/utils"

export const Todo = ({ completed, date, id, label }: ITodo): JSX.Element => {
  const dispatch = useAppDispatch()

  const handleToggleTodo = (): void => {
    dispatch(toggleTodo(id))
  }

  const handleDeleteTodo = (): void => {
    dispatch(deleteTodo(id))
  }

  const handleDate = (newValue: Date | null): void => {
    dispatch(changeDateOfTodo({ id, date: newValue ? formatDate(newValue) : null }))
  }

  return (
    <Card sx={{
      width: '400px',
      padding: '0 0 10px 15px'
    }}>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Button variant="text" disableRipple onClick={handleToggleTodo} sx={{ paddingTop: "10px", textTransform: "none" }}>
          {label}
          <RecordStatus variant={completed ? "completed" : "uncompleted"} sx={{ marginLeft: "10px" }} />
        </Button>
        <IconButton onClick={handleDeleteTodo} aria-label="delete todo">
          <CloseIcon />
        </IconButton>
      </Stack>
      <DatePicker
        value={date ? parseDate(date) : null}
        onChange={handleDate}
        format={DATE_FORMAT}
        slotProps={{
          field: { clearable: true },
          textField: {
            helperText: DATE_FORMAT,
          },
        }}
      />
    </Card>
  )
}
