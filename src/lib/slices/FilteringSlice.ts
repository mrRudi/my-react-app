import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export const filteringTypes = [
  { type: 'all', name: 'All' },
  { type: 'completed', name: 'Completed' },
  { type: 'current', name: 'Current' },
] as const

export type FilteringType = typeof filteringTypes[number]['type']

const initialType = "all" as FilteringType


const filteringTypeSlice = createSlice({
  name: "filtering",
  initialState: {
    type: initialType,
  },
  reducers: create => ({
    changeFilteringType: create.reducer((state, action: PayloadAction<FilteringType>) => {
      state.type = action.payload
    }),
  }),
})

export const { changeFilteringType } = filteringTypeSlice.actions
export const filteringTypeReducer = filteringTypeSlice.reducer
