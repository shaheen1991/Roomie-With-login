import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import SmackTalk from "./pages/SmackTalk";
import ChoreForm from "./pages/ChoreForm";
import Calendar from "./pages/Calendar";
import { withUser, update } from './services/withUser';
import Navbar from './components/Navbar/Navbar';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import './css/App.css';
// import 'font-awesome/css/font-awesome.min.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  componentDidMount() {
    // this is going to double check that the user is still actually logged in
    // if the app is reloaded. it's possible that we still have a user in sessionStorage
    // but the user's session cookie expired.
    axios.get('/api/auth')
      .then(res => {
        // if we get here, the user's session is still good. we'll update the user
        // to make sure we're using the most recent values just in case
        update(res.data);
      })
      .catch(err => {
        // if we get a 401 response, that means the user is no longer logged in
        if (err.response.status === 401) {
          update(null);
        }
      });
  }
  render() {
    const { user } = this.props;
    return (
      <Router>
        <MuiThemeProvider>
          <Fragment>
            <Navbar
              user={user}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/create" component={CreateAccountPage} />
              <Route exact path="/choreform" component={ChoreForm} />
              <Route exact path="/smacktalk" component={SmackTalk} />
              <Route exact path="/calendar" component={Calendar} />
              <Route component={NotFoundPage} />
            </Switch>
          </Fragment>
          </MuiThemeProvider>
      </Router>
    );
  }
}

export default withUser(App);

