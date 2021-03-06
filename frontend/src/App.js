import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import axios from 'axios';

import LoginUser from './Login/login';
import RegisterUser from './Login/register';
import ToDoRouter from './ToDo/Components/ToDoRouter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true
    }
  }

  componentDidMount() {
    axios
      .get("/users/getLoggedinUser")
      .then(res => {
        this.setState({ user: res.data.user, loading: false });
      })
      .catch(err => {
        console.log(`errrr`, err);
        this.setState({ loading: false })
      });
  }

  // functions passed as Props
  UserFound = user => {
    this.setState({ user: user });
  };

  logOut = () => {
    axios
      .get("/users/logout")
      .then(res => {
        console.log(`this is the response`, res.data)
        this.setState({ user: null });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Components
  handleLoginUser = () => {
    const { user } = this.state
    if (user) {
      return <Redirect to='/' />
    } else {
      return <LoginUser setUser={this.UserFound} />
    }
  }

  handleRegisterUser = () => {
    const { user } = this.state;
    if (user) {
      return <Redirect to='/' />
    } else {
      return (<RegisterUser setUser={this.UserFound} />)
    }
  }

  handleToDoRouter = () => {
    const { user, loading } = this.state
    if (!user) {
      return <Redirect to='/login' />
    } else {
      return (<ToDoRouter user={user} logOut={this.logOut} loading={loading} />)
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" render={this.handleLoginUser} />
          <Route path='/register' render={this.handleRegisterUser} />
          <Route path='/' render={this.handleToDoRouter} />
        </Switch>
      </div>
    )
  }
}

export default App;