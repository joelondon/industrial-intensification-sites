import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex'
    }
  },
  snack: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function Feedback() {
  const classes = useStyles()

  const [email, setEmail] = React.useState('')
  const [feedback, setFeedback] = React.useState('')
  const [checked, setChecked] = React.useState(false)

  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }
  const handleChangeFeedback = event => {
    setFeedback(event.target.value)
  }
  const handleChangeChecked = event => {
    setChecked(event.target.checked)
  }

  const [snackOpen, setSnackOpen] = React.useState(false)

  const openSnackBar = () => {
    setSnackOpen(true)
    setEmail('')
    setFeedback('')
    setChecked(false)
  }

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackOpen(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const data = {
      correspondent: event.target.email.value
        ? event.target.email.value
        : 'noreply@london.gov.uk',
      app: 'industrial-intensification-sites-feedback',
      title: 'industrial-intensification-sites feedback',
      message:
        event.target.feedback.value +
        '. Permission to contact: ' +
        event.target.permission.checked
    }
    // PREPARE POST HEADERS AND BODY
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    async function asyncFetch(requestOptions) {
      const response = await fetch(
        'https://apps.london.gov.uk/node-mailer/mail/send',
        requestOptions
      )
      const text = await response.text()
      text.includes('Message accepted for delivery')
        ? openSnackBar()
        : console.err('not sent')
    }

    asyncFetch(requestOptions)
  }

  return (
    <>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={closeSnackBar}
      >
        <Alert onClose={closeSnackBar} severity="success">
          Thanks, your message has been sent to the team and a receipt emailed
          to the email contact provided.
        </Alert>
      </Snackbar>
      <FormControl component="fieldset" fullWidth={true}>
        <FormLabel component="legend">
          We are keen to hear from users of the map as to what they found useful
          and any improvements we could make. Please leave your comments,
          suggestions or questions to the team below.
        </FormLabel>
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="on"
        >
          <TextField
            required
            id="email"
            label="Your email"
            value={email}
            onChange={handleChangeEmail}
          />
          <TextField
            multiline
            maxRows={20}
            required
            id="feedback"
            label="Your feedback"
            value={feedback}
            onChange={handleChangeFeedback}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChangeChecked}
                name="permission"
                color="secondary"
                id="permission"
              />
            }
            label="Tick here if you give us permission to email this contact"
          />
          <Button variant="contained" type="submit">
            Send
          </Button>
        </form>
      </FormControl>
    </>
  )
}
