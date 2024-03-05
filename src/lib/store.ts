import { configureStore, createSelector } from '@reduxjs/toolkit'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { todoReducer, filteringTypeReducer } from './slices'
import { isTodayDay } from './utils'

const store = configureStore({
  reducer: {
    todo: todoReducer,
    filter: filteringTypeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppStore = useStore.withTypes<typeof store>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const getMemoizedTodos = createSelector(
  (state: RootState) => state.todo.todos,
  (state: RootState) => state.filter.type,
  (todos, filterType) => {
    switch (filterType) {
      case "all":
        return todos
      case "completed":
        return todos.filter(todo => todo.completed)
      case "current":
        return todos.filter((todo) => isTodayDay(todo.date))
    }
  }
)

export const getCountAllTodos = (state: RootState): number => state.todo.todos.length

export const getCountCompletedTodos = createSelector(
  (state: RootState) => state.todo.todos,
  (todos) => {
    return todos.filter(todo => todo.completed).length
  }
)

export const getCountUncompletedTodos = createSelector(
  (state: RootState) => state.todo.todos,
  (todos) => {
    return todos.filter(todo => !todo.completed).length
  }
)

export default store