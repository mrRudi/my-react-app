import type { ChangeEvent, KeyboardEvent } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../lib/store'
import { addTodo, changeLabelText } from '../lib/slices'

export const AddTodo = (): JSX.Element => {
  const label = useAppSelector(state => state.todo.label.text)
  const labelError = useAppSelector(state => state.todo.label.error)
  const dispatch = useAppDispatch()

  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeLabelText(e.target.value))
  }

  const addNewTodo = (): void => {
    dispatch(addTodo())
  }

  const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      addNewTodo()
    }
  }

  return <Box sx={{ display: "flex", gap: "5px", margin: "0 15px" }}>
    <TextField
      error={labelError !== null}
      helperText={labelError}
      label=""
      type="text"
      placeholder="Enter todo"
      value={label}
      onChange={handleLabelChange}
      onKeyDown={handleKeyEnter}
    />
    <Button disableRipple size='small' onClick={addNewTodo}>Add</Button>
  </Box>

}