import { makeStyles } from '@material-ui/core/styles'

export const drawerWidth =
  window.innerWidth < 600
    ? document.querySelector('#root').offsetWidth
    : document.querySelector('#root').offsetWidth * 0.378

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  appBar: {
    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    [theme.breakpoints.down('sm')]: {
      right: `calc(100% - 4em) !important`,
      bottom: `0 !important`,
      top: `unset !important`
    }
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: 'none !important'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: { width: drawerWidth, flexShrink: 0 }
  },
  drawerPaper: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
      // height: `${windowHeight * 1.618 - windowHeight}px !important`
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start'
  },
  content: {
    maxWidth: '100%',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))
