import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { PieChart, pieArcLabelClasses, type PieValueType } from '@mui/x-charts'
import type { MakeOptional } from '@mui/x-date-pickers/internals'
import { getCountAllTodos, getCountCompletedTodos, getCountUncompletedTodos, useAppSelector } from '../lib/store'

type DataItem = MakeOptional<PieValueType, "id">

export const Statistic = (): JSX.Element => {
  const countAllTodos = useAppSelector(getCountAllTodos)
  const countCompletedTodos = useAppSelector(getCountCompletedTodos)
  const countUncompletedTodos = useAppSelector(getCountUncompletedTodos)
  const [data, setData] = useState<DataItem[]>([])

  useEffect(() => {
    const values: DataItem[] = []
    if (countCompletedTodos) {
      values.push({ value: countCompletedTodos, label: 'Completed', color: "green" })
    }
    if (countUncompletedTodos) {
      values.push({ value: countUncompletedTodos, label: 'Uncompleted', color: "red" })
    }
    setData(values)
  }, [countCompletedTodos, countUncompletedTodos])

  return <>
    <Typography variant='subtitle1' sx={{ textAlign: "center" }}>All todos: {countAllTodos}</Typography>
    <PieChart
      colors={['red', 'green']}
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          data: data,
          arcLabelMinAngle: 45,
          innerRadius: 3,
          paddingAngle: 3,
          cornerRadius: 12,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      width={500}
      height={300}
    />
  </>
}