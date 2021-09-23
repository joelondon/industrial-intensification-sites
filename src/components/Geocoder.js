/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import usePersistedState from '../hooks/usePersistedState'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LinearProgress from '@material-ui/core/LinearProgress'
import centroid from '@turf/centroid'
import distance from '@turf/distance'

import useDebounce from '../hooks/useDebounce'
import { MAPBOX_TOKEN } from '../App'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 260
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export function Geocoder(props) {
  const { map } = props
  const [searchTerm, setSearchTerm] = useState('')
  const [value, setValue] = usePersistedState('searchvalue', '')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLocating, setIsLocating] = useState(false)

  const classes = useStyles()

  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const moveHandler = () => {
    map &&
      console.log(
        map
          .queryRenderedFeatures(
            [
              map.project(map.getBounds().getSouthWest()),
              map.project(map.getBounds().getNorthEast())
            ],
            {
              layers: ['boroughdesignatedcoolspaces']
            }
          )
          // .querySourceFeatures('tileserver-gl', {
          //   sourceLayer: 'boroughdesignatedcoolspaces'
          // })
          .map(el => {
            return (
              el.properties.cool_space_name +
              ' ' +
              Math.round(
                distance(
                  centroid(el).geometry.coordinates,
                  map.getCenter().toArray(),
                  {
                    units: 'kilometers'
                  }
                ) * 1000
              )
            )
          })
      )
  }

  const forwardGeocode = selection => {
    if (selection) {
      setValue(selection)
      const fly = (lng, lat, zoom) => {
        if (map) {
          map.flyTo({
            center: [lng, lat],
            zoom: zoom,
            speed: 2,
            curve: 1,
            easing(t) {
              return t
            }
          })
          map.getSource('single-point').setData({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [lng, lat]
            }
          })
        }
      }
      let lng, lat, zoom
      if (selection && selection.place_name === 'Go to my location') {
        setIsLocating(true)
        const success = position => {
          lng = position.coords.longitude
          lat = position.coords.latitude
          zoom = 14
          setIsLocating(false)
          map.once('moveend', moveHandler)
          fly(lng, lat, zoom)
        }
        navigator.geolocation.getCurrentPosition(success)
      } else {
        if (selection.id) {
          // when selection has an id it is from mapbox gazetteer
          lng = selection.geometry.coordinates[0]
          lat = selection.geometry.coordinates[1]
        } else {
          // ...it is from the geojson of features
          const centre = centroid(selection).geometry.coordinates
          lng = centre[0]
          lat = centre[1]
          fly(lng, lat, zoom)
        }
        zoom = 14
        fly(lng, lat, zoom)
      }
    }
  }

  // API call
  useEffect(() => {
    const currentLocation = { id: 'search', place_name: 'Go to my location' }
    if (debouncedSearchTerm) {
      setIsSearching(true)
      searchCharacters(debouncedSearchTerm).then(results => {
        setIsSearching(false)
        results.unshift(currentLocation)
        setResults(results)
      })
    } else {
      setResults([currentLocation])
    }
  }, [debouncedSearchTerm])

  const clearSearch = () => {
    setValue('')
    map.getSource('single-point').setData({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0]
      }
    })
  }
  const groupBy = option => (option.id ? 'location' : 'cool space')

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        id="geocoder"
        options={results}
        groupBy={groupBy}
        value={value}
        onInputChange={e => e && setSearchTerm(e.target.value)}
        onChange={(event, selection, reason) =>
          reason === 'clear' ? clearSearch() : forwardGeocode(selection)
        }
        getOptionLabel={option =>
          option
            ? option.place_name
              ? option.place_name
              : option.properties.cool_space_name
            : ''
        }
        isOptionEqualToValue={(option, value) =>
          option.place_name
            ? option.place_name === value.place_name
            : option.cool_space_name === value.cool_space_name
        }
        renderInput={params => (
          <TextField
            {...params}
            label="Search a place name or address/postcode"
          />
        )}
      />
      {isLocating || isSearching ? <LinearProgress /> : ''}
    </FormControl>
  )

  // API search function
  function searchCharacters(search) {
    return fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?bbox=-0.489,51.28,0.236,51.686&access_token=${MAPBOX_TOKEN}`
    )
      .then(r => r.json())
      .then(r => r.features)
      .catch(error => {
        console.error(error)
        return []
      })
  }
}
