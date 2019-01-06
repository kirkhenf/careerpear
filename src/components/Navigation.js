import React from 'react';
import './Navigation.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import store from '../store';
import teal from '@material-ui/core/colors/teal';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      isModal: false,
      anchorEl: null
    };
  }

  render() {
    const { isModal } = this.props;
    const { authUser } = this.props;
    const { anchorEl } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="root">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit" className='topBar'>
                <Link to={routes.LANDING}>careerpear</Link>
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
                <Button><Link to={routes.SIGN_IN}>Sign In</Link></Button>
              </div>
            }
            </Toolbar>
          </AppBar>
        </div >
      </MuiThemeProvider >
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

const theme = createMuiTheme({
  palette: {
    primary: teal
  },
});

const handleClose = () => {
  store.dispatch({
    type: 'CLOSE_MENU',
  })
}

export default connect(mapStateToProps)(Navigation);