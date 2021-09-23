import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
// import 'maplibre-gl/dist/maplibre-gl.css'

export const PhotoGallery = ({ site }) => {
  const images = [
    {
      original: `${process.env.PUBLIC_URL}/pictures/${site}/Photo 1.png`
      // thumbnail: `/pictures/${site}/Photo 1.png`
    },
    {
      original: `${process.env.PUBLIC_URL}/pictures/${site}/Photo 2.png`
      // thumbnail: `/pictures/${site}/Photo 1.png`
    },
    {
      original: `${process.env.PUBLIC_URL}/pictures/${site}/Photo 3.png`
      // thumbnail: `/pictures/${site}/Photo 1.png`
    },
    {
      original: `${process.env.PUBLIC_URL}/pictures/${site}/Photo 4.png`
      // thumbnail: `/pictures/${site}/Photo 1.png`
    },
    {
      original: `${process.env.PUBLIC_URL}/pictures/${site}/Photo 5.png`
      // thumbnail: `/pictures/${site}/Photo 1.png`
    },
    {
      original: `${process.env.PUBLIC_URL}/pictures/${site}/Photo 6.png`
      // thumbnail: `/pictures/${site}/Photo 1.png`
    }
  ]
  {
    /*
    <Card height={`${window.screen.availHeight / 2}px`}>
    <CardMedia
    component="img"
    height={`${window.screen.availHeight - 400}px`}
    image={process.env.PUBLIC_URL + "/pictures/75-bugsby's-way/Photo 1.png"}
    alt="picture"
    style={{ borderRadius: '4px' }}
  />*/
  }
  {
    /* <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      Lizard
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Lizards are a widespread group of squamate reptiles, with over 6,000
      species, ranging across all continents except Antarctica
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Share</Button>
    <Button size="small">Learn More</Button>
  </CardActions>
  </Card>*/
  }
  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      showThumbnails={false}
      lazyLoad={true}
    />
  )
}
