import React from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import CircularProgress from '@material-ui/core/CircularProgress'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}))

export default function SwitchesGroup(props) {
  const { layers, setLayers, legend } = props
  const classes = useStyles()

  const handleChange = event => {
    layers[event.target.name].showing = event.target.checked
    setLayers({
      ...layers,
      [event.target.name]: layers[event.target.name]
    })
  }

  const legendColour = (el, legend, layers) => {
    switch (el) {
      case 'Outdoor cool spaces':
        return '#6D6FA2'
      case 'Indoor cool spaces':
        return '#9888CD'
      case 'Cooler areas':
        return 'rgba(0,255,255,0.9)'
      case 'Water fountains':
        return '#43B7EF'
      default:
        return legend
          ? legend.filter(key => Object.keys(key)[0] === layers[el].value)[0][
              layers[el].value
            ]
          : ''
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [aboutText, setAboutText] = React.useState(null)

  const handleInfoClick = (event, el) => {
    setAnchorEl(event.currentTarget)
    setAboutText(event.currentTarget.getAttribute('about'))
  }

  const handleInfoClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return legend ? (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose map overlays to show</FormLabel>
      <FormGroup>
        {Object.keys(layers).map((el, i) => (
          <div style={{ display: 'flex' }} key={i}>
            <FormControlLabel
              key={i}
              control={
                <Switch
                  key={i}
                  color="primary"
                  style={{
                    color: legendColour(el, legend, layers),
                    ':checked': { color: 'red' }
                  }}
                  checked={layers[el].showing}
                  onChange={handleChange}
                  name={el}
                />
              }
              label={el}
            />
            <InfoOutlinedIcon
              style={{ height: 'unset' }}
              onClick={handleInfoClick}
              about={layers[el].about}
            />
          </div>
        ))}
      </FormGroup>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleInfoClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography className={classes.typography}>{aboutText}</Typography>
      </Popover>
    </FormControl>
  ) : (
    <div style={{ textAlign: 'center', margin: '0 auto' }}>
      <CircularProgress />
    </div>
  )
}
