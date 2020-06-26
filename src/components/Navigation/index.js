import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <div className="navBar">
    <Link to={ROUTES.HOME}>Home</Link>
    <Link to={ROUTES.ACCOUNT}>Account</Link>
    <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
    <SignOutButton />
  </div>
);

const NavigationNonAuth = () => (
  <div className="navBar">
    <Link to={ROUTES.HOME}>Home</Link>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </div>
);

export default Navigation;
