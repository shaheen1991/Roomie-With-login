import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import '../css/LoginButton.css';

const LoginButton = (props) => (
  <FlatButton  label="Log In" onClick={props.onClick} />
);

export default LoginButton;
