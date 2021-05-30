import React, { useRef, useState } from 'react';
import '../App.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

// Dynamically center signup form modal on page
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
}));

// Signup form modal functionality
const Signup = (props:any) => {
  const classes = useStyles();
  const emailSignupInput:any = useRef();
  const userSignupInput:any = useRef();
  const passSignupInput:any = useRef();

  // Initialize display state of signup form modal in response to user click interaction
  const [openSignup, setShow] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  // Reference user inputs from text fields via useRef hooks
  const getTextFieldValues = (e:any) => {
    const textFieldObj = {
      emailText : undefined,
      userText : undefined,
      passText : undefined,
    };

    if (e.key === 'Enter' || e.type === 'click') {
      
      textFieldObj.emailText = emailSignupInput.current.value
      textFieldObj.userText = userSignupInput.current.value
      textFieldObj.passText = passSignupInput.current.value
    }
    return textFieldObj
  };

  // State changes when signup process is successful
  const onSuccess = (response:any):void => {
    // Set isLoggedIn state to true
    props.setLoggedIn(true); 
    // Close signup form modal
    handleClose();
  };

  const onFailure = (response:any):void => {
    console.error(response);
  }

  // Open signup form modal
  const handleOpen = () => {
    // Change display state of signup form modal
    setShow(true);
  };

  // Close signup form modal
  const handleClose = () => {
    //  Change display state of signup form modal
    setShow(false);
  };

  // Post signup request to server for backend validation
  const completeForm = (e:any) => {

    // Isolate user-provided inputs
    const {emailText, userText, passText} = getTextFieldValues(e);
    
    // Set request body and headers
    const requestBody = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "emailaddress": emailText,
        "username": userText,
        "password": passText
      })
    };

    // Initialize http request and handle responses or request errors
    fetch('http://localhost:8080/signup', requestBody) 
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

  // Signup form modal layout 
  const signupBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="signupTitle">Sign Up</h2>
      <form className={classes.root} noValidate autoComplete="off">
      <div>
          <TextField 
            required 
            id="signupEmail" 
            label="E-mail Address" 
            inputRef={emailSignupInput}
          />
        </div>
        <div>
          <TextField 
            required 
            id="signupUser" 
            label="Username" 
            inputRef={userSignupInput}
          />
        </div>
        <div>
          <TextField
            required
            id="signupPass"
            label="Password"
            type="password"
            autoComplete="current-password"
            inputRef={passSignupInput}
          />
        </div>
      </form>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" size="small" onClick={(e)=>completeForm(e)} >SIGN UP</Button>
        <Button variant="outlined" size="small" onClick={handleClose}  >CANCEL</Button>
      </div>
    </div>
  );


  return (
    <div>
      <button id="signupButton" onClick={handleOpen} style={{visibility: props.isLoggedIn ? 'hidden' : 'visible'}}>SIGN UP</button>
      <Modal
        open={openSignup}
        onClose={handleClose}
      >
        {signupBody}
      </Modal>
    </div>
  )
};

export default Signup;