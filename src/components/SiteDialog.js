import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { PhotoGallery } from './PhotoGallery'

export const SiteDialog = ({ visible, handleDialogVisibility, content }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div>
      <Dialog
        onClose={handleDialogVisibility}
        aria-labelledby="customized-dialog-title"
        open={visible}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={'xl'}
      >
        <IconButton
          aria-label="close"
          onClick={handleDialogVisibility}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          {content && (
            <div
              style={{
                width: '100%',
                height: fullScreen
                  ? 'auto'
                  : `${window.screen.availHeight / 1.3}px`
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingTop: '2rem'
                }}
              >
                <Box style={{ p: 1, padding: '2rem', border: '1px' }}>
                  <PhotoGallery
                    site={JSON.parse(content).properties.Development}
                  />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box style={{ p: 1, padding: '1rem' }}>
                  <Typography variant="h2" gutterBottom component="div">
                    {JSON.parse(content).properties.Development}
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <div style={{ width: '50%' }}>Borough</div>{' '}
                    <code>{JSON.parse(content).properties.Borough}</code>
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <div style={{ width: '50%' }}>Floorspace</div>
                    <code>
                      {JSON.parse(content).properties['Total floorspace m2']}m
                      <sup>2</sup>
                    </code>
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <div style={{ width: '50%' }}>Units</div>
                    <code>{JSON.parse(content).properties['No. units']}</code>
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <div style={{ width: '50%' }}>Unit sizes</div>
                    <code>
                      {JSON.parse(content).properties['Unit sizes from m2']} -{' '}
                      {JSON.parse(content).properties['Unit sizes to m2']}m
                      <sup>2</sup>
                    </code>
                  </Typography>
                  <Typography
                    gutterBottom
                    component="div"
                    style={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <div style={{ width: '50%' }}>Prices</div>
                    <code>
                      £{JSON.parse(content).properties['Price range from £']} -{' '}
                      £{JSON.parse(content).properties['Price range to £']}
                    </code>
                  </Typography>
                </Box>
              </Box>
            </div>
          )}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  )
}
