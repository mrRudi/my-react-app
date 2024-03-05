import { Typography } from '@mui/material'
import { getMemoizedTodos, useAppSelector } from '../lib/store'
import { Todo } from './Todo'

export const TodoList = (): JSX.Element => {
  const todos = useAppSelector(getMemoizedTodos)

  return (
    <ul style={{
      listStyleType: "none"
    }}>
      {todos.length ?
        todos.map((todo) =>
          <li key={todo.id} style={{ margin: '10px' }}>
            <Todo {...todo} />
          </li>
        )
        :
        <li>
          <Typography sx={{ textAlign: 'center' }}>
            No todos...
          </Typography>
        </li>
      }
    </ul>
  )
}
