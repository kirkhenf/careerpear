// import { get } from 'lodash';
// import { UserAuthWrapper } from 'redux-auth-wrapper';
// import CircularProgress from 'material-ui/CircularProgress';

// /**
//  * @description Higher Order Component that redirects to the homepage if
//  * the user does not have the required permission. This HOC requires that the user
//  * profile be loaded and the role property populated
//  * @param {Component} componentToWrap - Component to wrap
//  * @return {Component} wrappedComponent
//  */
// export const UserIsAdmin = UserAuthWrapper({ // eslint-disable-line new-cap
//   authSelector: ({ firebase: { profile, auth } }) => ({ auth, profile }),
//   authenticatingSelector: ({ firebase: { profile, auth, isInitializing } }) =>
//     auth === undefined || profile === undefined || isInitializing === true,
//   redirectAction: newLoc => (dispatch) => {
//     browserHistory.replace(newLoc);
//     dispatch({ type: UNAUTHED_REDIRECT });
//   },
//   allowRedirectBack: false,
//   failureRedirectPath: '/login',
//   wrapperDisplayName: 'UserIsAdmin',
//   predicate: auth => get(auth, `profile.role.name`) === 'admin',
//   LoadingComponent: <CircularProgress mode="indeterminate" size={80} />,
// });