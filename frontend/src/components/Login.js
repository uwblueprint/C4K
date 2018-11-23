import React, { Component } from 'react'
import * as firebase from 'firebase'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const config = {
  apiKey: "AIzaSyCleo1v8xaS9vSirU8mn7nzR7AkhN0dyiM",
  authDomain: "c4k-dashboard.firebaseapp.com",
  databaseURL: "https://c4k-dashboard.firebaseio.com",
  projectId: "c4k-dashboard",
  storageBucket: "c4k-dashboard.appspot.com",
  messagingSenderId: "551785168434"
};
firebase.initializeApp(config)

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {email: 'test@test.com', password: 'test123'};
  }


  signIn () {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(err => {
      console.log(err);
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        firebase.auth().currentUser.getIdToken(true).then(idToken => {
          console.log(idToken)
        }).catch(err => {
          console.log(err)
        });
        // ...
      } else {
        // User is signed out.
        // ...
        console.log('No user')
      }
    });

    
  }
    
  render () {
    const { classes } = this.props;

    return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email Address</InputLabel>
							<Input id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input name="password" type="password" id="password" autoComplete="current-password" />
						</FormControl>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
              className={classes.submit}
              onClick={this.signIn()}
						>
							Sign in
						</Button>
					</form>
				</Paper>
			</main>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export default withStyles(styles)(Login);
