import React, { useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component =>  props => {

  useEffect(() => {props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        }
  })

    // componentWillUnmount() {
    //   this.listener();
    // }

    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <Component {...this.props} />
      </AuthUserContext.Provider>
    );

    return withFirebase(WithAuthentication);
  };

  export default withAuthentication