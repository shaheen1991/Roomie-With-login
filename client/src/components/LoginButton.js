import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import '../css/LoginButton.css';

const LoginButton = (props) => (
  <FlatButton style={{color: "#F8F1E5" , marginLeft: 5, fontFamily:"'Alegreya Sans', sans-serif"}} label="Log In" onClick={props.onClick} />
);

export default LoginButton;
