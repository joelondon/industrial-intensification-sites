import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'

export default function UrlToClipboardButton() {
  const [open, setOpen] = React.useState(false)

  async function copyToClip() {
    await navigator.clipboard.writeText(document.location.href)
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <>
      <Button size="small" variant="contained" onClick={copyToClip}>
        Share this tree URL
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message="URL copied to clipboard"
        onClose={handleClose}
        open={open}
        autoHideDuration={1500}
      />
    </>
  )
}
