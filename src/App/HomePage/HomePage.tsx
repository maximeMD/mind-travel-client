import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../../_services/user.service';
import User from '../../_models/user.model';

interface IHomePageState {
  currentUser: User;
  users: User[];
  isLoadingUsers: boolean;
}

class HomePage extends Component<any, IHomePageState> {
  state = {
    currentUser: (null as unknown) as User,
    users: (null as unknown) as User[],
    isLoadingUsers: true
  };

  componentDidMount() {
    this.setState({
      currentUser: JSON.parse(localStorage.getItem('jwt') || '{}')
    });
    userService.getAll().then((users: any) => this.setState({ users }));
  }

  render() {
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h1>
          Hi {this.state.currentUser && this.state.currentUser.firstName}!
        </h1>
        <p>You're logged in with React & Basic HTTP Authentication!!</p>
        <h3>Users from secure api end point:</h3>
        {this.state.isLoadingUsers && <em>Loading users...</em>}s
        {this.state.users && this.state.users.length && (
          <ul>
            {this.state.users.map((user: User) => (
              <li key={user.id}>{user.firstName + ' ' + user.lastName}</li>
            ))}
          </ul>
        )}
        <p>
          {/* <Link to='/login'>Logout</Link> */}
          <br />
          {/* <Link to='/album'>Album</Link> */}
        </p>
      </div>
    );
  }
}

export default HomePage;
