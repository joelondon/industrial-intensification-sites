import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const nextNdays = n =>
  Array.from(Array(n)).map((el, i) => {
    switch (i) {
      case 0:
        return 'Now'
      case 1:
        return 'Today'
      case 2:
        return 'Tomorrow'
      default:
        return Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(
          new Date(Date.now() + 1000 * 60 * 60 * 24 * i)
        )
    }
  })

export default function TimePicker() {
  const classes = useStyles()
  const [day, setDay] = useState('')
  const [hour, setHour] = useState('')

  const handleChangeDay = event => {
    setDay(event.target.value)
  }
  const handleChangeHour = event => {
    setHour(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">When</InputLabel>
        <Select
          labelId="day-label"
          id="day-select"
          value={day}
          onChange={handleChangeDay}
        >
          {nextNdays(5).map(el => (
            <MenuItem key={el} name={el} value={el} on>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {day !== 'Now' && day !== '' ? (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Hour</InputLabel>
          <Select
            labelId="hour-select-label"
            id="hour-select"
            value={hour}
            onChange={handleChangeHour}
          >
            {[
              '00',
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24'
            ].map(el => (
              <MenuItem name={el} key={el} value={el} on>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        ''
      )}
    </div>
  )
}
