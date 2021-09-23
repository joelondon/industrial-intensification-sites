/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react'
import usePersistedState from '../hooks/usePersistedState'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 260
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const options = [
  {
    title: 'Drinking water',
    value: 'free_water',
    filter: ['==', ['get', 'free_water'], 'true']
  },
  {
    title: 'Seating',
    value: 'seating_available',
    filter: ['==', ['get', 'seating_available'], 'true']
  },
  {
    title: 'Water feature',
    value: 'water_feature',
    filter: ['>', ['length', ['get', 'shade_seating']], 0]
  },
  {
    title: 'Access for people with disabilities',
    value: 'people with disabilities',
    filter: ['in', 'people with disabilities', ['get', 'accessible']]
  },
  {
    title: 'Toilets',
    value: 'toilets',
    filter: ['in', ['get', 'toilets'], 'Toilets are available on site']
  }
]

export default function Facilities({ map }) {
  const classes = useStyles()
  const [value, setValue] = usePersistedState('facilities', [])

  const filterMap = (map, newValue) => {
    if (newValue.length > 0) {
      const filter = newValue.map(el => el.filter)
      filter.unshift('all')
      map && map.setFilter('boroughdesignatedcoolspaces', filter)
      map && map.setFilter('boroughdesignatedcoolspaces-glow', filter)
    } else {
      map && map.setFilter('boroughdesignatedcoolspaces', null)
      map && map.setFilter('boroughdesignatedcoolspaces-glow', null)
    }
  }

  useEffect(() => {
    filterMap(map, value)
  }, [map, value])

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        multiple
        value={value}
        id="facilities"
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        options={options}
        getOptionLabel={option => (option ? option.title : '')}
        renderInput={params => (
          <TextField {...params} label="Choose facilities" />
        )}
      />
    </FormControl>
  )
}
