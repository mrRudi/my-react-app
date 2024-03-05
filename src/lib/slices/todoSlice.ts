import * as dateFns from "date-fns"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { formatDate, getRandomUUID } from "../utils"

export interface ITodo {
  id: string
  label: string
  completed: boolean
  date: string | null
}

const initialTodos: ITodo[] = [
  { id: getRandomUUID(), label: "today todo", completed: false, date: formatDate(new Date()) },
  { id: getRandomUUID(), label: "tomorrow todo", completed: true, date: formatDate(dateFns.addDays(new Date(), 1)) },
  { id: getRandomUUID(), label: ":) todo", completed: false, date: formatDate(dateFns.addDays(new Date(), 2)) },
]

const initialLabel: {
  N: number
  text: ITodo['label']
  error: string | null
} = {
  N: 10,
  text: '',
  error: null
}

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    label: initialLabel,
    todos: initialTodos,
  },
  reducers: create => ({
    addTodo: create.reducer((state) => {
      if (!state.label.error) {
        if (!state.label.text) {
          state.label.error = 'empty text'
        } else {
          const newTodo = {
            completed: false,
            id: getRandomUUID(),
            label: state.label.text,
            date: formatDate(new Date())
          }
          state.todos.push(newTodo)
          state.label.text = ''
        }
      }
    }),
    deleteTodo: create.reducer((state, action: PayloadAction<ITodo['id']>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    }),
    toggleTodo: create.reducer((state, action: PayloadAction<ITodo['id']>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    }),
    changeLabelText: create.reducer((state, action: PayloadAction<ITodo['label']>) => {
      state.label.text = action.payload
      if (action.payload.length > state.label.N) {
        state.label.error = `length is more than ${state.label.N} characters`
      } else {
        state.label.error = null
      }
    }),
    changeDateOfTodo: create.reducer((state, action: PayloadAction<Pick<ITodo, "id" | "date">>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.date = action.payload.date
      }
    })
  }),
})

export const { addTodo, deleteTodo, toggleTodo, changeDateOfTodo, changeLabelText } = todoSlice.actions
export const todoReducer = todoSlice.reducer
