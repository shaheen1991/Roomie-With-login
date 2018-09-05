import axios from 'axios';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { update } from '../services/withUser';
import '../css/LoginPage.css';

class LoginPage extends Component {
  state = {
    username: null,
    password: null
  }
  handleInputChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleLogin = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const { history } = this.props;

    // post an auth request
    axios.post('/api/auth', {
      username,
      password
    })
    .then(user => {
      // if the response is successful, update the current user and redirect to the home page
      update(user.data);
      history.push('/');
    })
    .catch(err => {
      // an error occured, so let's record the error in our state so we can display it in render
      // if the error response status code is 401, it's an invalid username or password.
      // if it's any other status code, there's some other unhandled error so we'll just show
      // the generic message.
      this.setState({
        error: err.response.status === 401 ? 'Invalid username or password.' : err.message
      });
    });
  }
  render() {
    const { error } = this.state;

    return (
      <Grid className="grid" fluid>
        <Row className="login-page-row">
          <Col xs={6} xsOffset={3}>
            <form onSubmit={this.handleLogin}>
              <h1 style={{fontFamily: "'Alegreya Sans', sans-serif"}}>LOG IN / REGISTER</h1>
              {error &&
                <div>
                  {error}
                </div>
              }
              <div style ={{marginBottom: -15}}> 
                <TextField
                  name="username"
                  hintText="Username"
                  floatingLabelText="Username"
                  onChange={this.handleInputChanged}
                />
              </div>
              <div style={{marginBottom: 15}}>
                <TextField
                  name="password"
                  hintText="Password"
                  floatingLabelText="Password"
                  type="password"
                  onChange={this.handleInputChanged}
                />
              </div>
              <div>
                <RaisedButton className="raisedLogBtn" primary type="submit" style={{color: "#F8F1E5", marginTop: 10}}>
                  Log In
                </RaisedButton>
              </div>
              <p className="or">
                OR
              </p>
              <p>
                <Link style={{ textDecoration: 'none' }} className="register" to="/create">
                Register
                </Link>
              </p>
            </form>
          </Col>
        </Row>
        <Footer />
      </Grid>
      
    );
  }
}

export default LoginPage;
