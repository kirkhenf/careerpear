import React from 'react';
import './Navigation.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import store from '../store';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MediaQuery from 'react-responsive';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { SignInForm, SignInLink } from './SignIn';
import CloseIcon from '@material-ui/icons/Close';
import { PasswordForgetLink, PasswordForgetForm } from './PasswordForget';
import { SignUpForm, SignUpLink } from './SignUp';

var ResponsiveDialog = withMobileDialog({ breakpoint: 'xs' })(Dialog);

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      isModal: false,
      anchorEl: null,
      open: false,
      param: 'login'
    };
  }

  handleOpen = () => {
    //putting it in the close showed the login page while closing
    this.setState({ param: 'login' });
    this.setState({ open: true });
  };

  renderSwitch = (param) => {
    switch (param) {
      case 'login':
        return (
          <div>
            <SignInForm />
            <PasswordForgetLink parentMethod={this.handleModalClick} />
            <SignUpLink parentMethod={this.handleModalClick} />
          </div>
        )
      case 'pwForget':
        return (
          <div>
            <PasswordForgetForm />
            <SignInLink parentMethod={this.handleModalClick} />
          </div>
        )
      default:
        return (
          <div>
            <SignUpForm />
            <SignInLink optionalText={"Already have an account? "} parentMethod={this.handleModalClick} />
          </div>
        )
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleModalClick = (value) => {
    this.setState({ param: value })
  };

  render() {
    const { isModal } = this.props;
    const { authUser } = this.props;
    const { anchorEl } = this.props;

    return (
      <div className="nav">
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="title" color="inherit" className='topBar'>
              <a href={routes.LANDING}>
                <MediaQuery minDeviceWidth={600}>
                  {(matches) => {
                    if (matches) {
                      return <img className="pearLogo" alt="" src={require('../assets/careerpear-green-banner-fruit.png')} />;
                    } else {
                      return <img className="pearLogo" alt="" src={require('../assets/careerpear-green-fruit.png')} />;
                    }
                  }}
                </MediaQuery>
              </a>
            </Typography>
            {authUser
              ?
              < div className="navButtons">
                <Button><Link to={routes.HOME}>Home</Link></Button>
                <IconButton
                  aria-owns={isModal ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={(e) => onClickButton(e)}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={isModal}
                  onClose={handleClose}
                >
                  <SignOutButton />
                  <MenuItem onClick={(e) => onClickButton(e)}><Link to={routes.ACCOUNT}>My Account</Link></MenuItem>
                </Menu>
              </div>
              : <div className="navButtons">
                {/* <Button color="primary" variant="contained">Sign In</Button> */}
                <Button color="primary" onClick={this.handleOpen}>Log In</Button>
                <ResponsiveDialog
                  className="loginModal"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <DialogTitle>{"Log in to continue"}</DialogTitle>
                  <DialogContent>
                    {this.renderSwitch(this.state.param)}
                  </DialogContent>
                  <DialogActions>
                    <IconButton onClick={this.handleClose} color="primary" autoFocus>
                      <CloseIcon />
                    </IconButton>
                  </DialogActions>
                </ResponsiveDialog>
              </div>
            }
          </Toolbar>
        </AppBar>
      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  isModal: state.navigation.isModal,
  anchorEl: state.navigation.anchorEl
});

const onClickButton = (e) => {
  store.dispatch({
    type: 'TOGGLE_MENU',
    target: e.target
  })
}

const handleClose = () => {
  store.dispatch({
    type: 'CLOSE_MENU',
  })
}

export default (connect(mapStateToProps)(Navigation));