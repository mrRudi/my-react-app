import type { MouseEvent } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../lib/store'
import { FilteringType, changeFilteringType, filteringTypes } from '../lib/slices'

export const Filters = (): JSX.Element => {
  const filteringType = useAppSelector((state) => state.filter.type)
  const dispatch = useAppDispatch()

  const handleFilteringTypeChange = (e: MouseEvent<HTMLElement>, value: FilteringType | null): void => {
    if (value != null) {
      dispatch(changeFilteringType(value))
    }
  }

  return <ToggleButtonGroup
    value={filteringType}
    exclusive
    fullWidth
    onChange={handleFilteringTypeChange}
  >
    {filteringTypes.map(filteringItem =>
      <ToggleButton key={filteringItem.type} value={filteringItem.type} disableRipple>
        {filteringItem.name}
      </ToggleButton>
    )}
  </ToggleButtonGroup>
}