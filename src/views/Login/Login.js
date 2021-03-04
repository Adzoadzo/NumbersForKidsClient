import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import logo from "assets/icons/logo.png";
import { login, clearAuthErrors } from 'actions/auth';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://numbersforkids.com/">
        Numbers for Kids
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmitHandler = (e) => {
    if (validate()) {
      props.login(username, password)
    }
    e.preventDefault();
  }

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!username) {
      isValid = false;
      errors["username"] = "Please enter your email.";
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (typeof username !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(username)) {
        isValid = false;
        errors["username"] = "Please enter valid email address.";
      }
    }
    setErrors(errors)
    return isValid;
  }

  const getError = (code) => {
    switch (code) {
      case 401:
        return "Wrong username or password"
      case 403:
        return "Insufficient permissions to enter this site"
      default:
        return "Wrong username or password"
    }
  }

  const closeToastHandler = () => {
    props.clearAuthErrors();
  }

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={!!props.error} autoHideDuration={3000} onClose={closeToastHandler}>
        <Alert severity="error">
          {getError(props.error?.code)}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <img style={{ width: 200 }} src={logo} alt="nu,bers-for-kids-logo" />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={usernameChangeHandler}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={passwordChangeHandler}
            error={!!errors.password}
            helperText={errors.password}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.auth?.request?.error,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password)),
    clearAuthErrors: () => dispatch(clearAuthErrors()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);