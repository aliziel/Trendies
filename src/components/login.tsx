import React, { useRef, useState }  from 'react';
import '../App.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

// Dynamically center login form modal on page
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

// Define class-level styling
const useStyles = makeStyles((theme:Theme) => createStyles({
  
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ffffff',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

// Login form modal functionality
const Login = (props:any) => {
  const classes = useStyles();
  const userLoginInput:any = useRef();
  const passLoginInput:any = useRef();

  // Initialize display state of login form modal in response to user click interaction
  const [openLogin, setShow] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  // Reference user inputs from text fields via useRef hooks
  const getTextFieldValues = (e:any) => {
    const textFieldObj = {
      userText : undefined,
      passText : undefined,
    };
    
    if (e.key === 'Enter' || e.type === 'click') {
      
      textFieldObj.userText = userLoginInput.current.value
      textFieldObj.passText = passLoginInput.current.value
    }
    return textFieldObj
  };

  // State changes when login process is successful
  const onSuccess = (response:any):void => {
    // Set isLoggedIn state to true
    props.setLoggedIn(true); 
    // Close login form modal
    handleClose();
  };

  const onFailure = (response:any):void => {
    console.error(response);
  }

  // Open login form modal
  const handleOpen = () => {
    // Change display state of login form modal
    setShow(true);
  };

  // Close login form modal
  const handleClose = () => {
    //  Change display state of login form modal
    setShow(false);
  };

  // Post login request to server for backend validation
  const completeForm = (e:any) => {

    // Isolate user-provided inputs
    const {userText, passText} = getTextFieldValues(e);
    
    // Set request body and headers
    const requestBody = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "username": userText,
        "password": passText
      })
    }

    // Initialize http request and handle responses or request errors
    fetch('http://localhost:8080/login', requestBody) 
      .then(response => response.json())
      .then(data =>{

        if(data.status === 'success'){
          // Initiate login status state change
          onSuccess('successfully logged in');
          return handleClose();
        }
        if(data.status === 'fail'){
          onFailure('failed to log in');
        }
      })
      .catch(err => console.log(err))
  };

  // Login form modal layout
  const loginBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="loginTitle">Log In</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField 
            required 
            id="loginUser" 
            label="Username" 
            inputRef={userLoginInput}
          />
        </div>
        <div>
          <TextField
            required
            id="loginPass"
            label="Password"
            type="password"
            autoComplete="current-password"
            inputRef={passLoginInput}
          />
        </div>
      </form>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" size="small" onClick={(e)=>completeForm(e)}>LOG IN</Button>
        <Button variant="outlined" size="small" onClick={handleClose}>CANCEL</Button>
      </div>
    </div>
  );
  return (
    <div>
      <button id="loginButton" onClick={handleOpen} style={{visibility: props.isLoggedIn ? 'hidden' : 'visible'}}>LOG IN</button>
      <Modal
        open={openLogin}
        onClose={handleClose}
      >
        {loginBody}
      </Modal>
    </div>
  )
};

export default Login;