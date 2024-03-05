import { Box } from '@mui/material'
import { TodoList, Statistic, AddTodo, Filters } from './components'
import './App.css'

function App(): JSX.Element {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}>
      <Statistic />
      <AddTodo />
      <Filters />
      <TodoList />
    </Box>
  )
}

export default App
