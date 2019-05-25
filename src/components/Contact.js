import React, { Component } from 'react';
import './Landing.css';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import Avatar from '@material-ui/core/Avatar'
import { compose } from 'redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import { CardContent, Typography, CardMedia } from '@material-ui/core';
import './Contact.css'

class ContactPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="contactContainer">
        <Grid className="cardContainer" container spacing={16} justify="center" alignItems="center">
          <Grid item xs={6} md={3}>
            <Card className="contactCard">
              <Avatar className="contactCardPhoto" src={('https://ui-avatars.com/api/?name=Ani+McDowell&background=297A6D')} />
              <CardContent>
                <Typography>Ani McDowell</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card className="contactCard">
              <Avatar className="contactCardPhoto" src={('https://ui-avatars.com/api/?name=Kirk+Henf&background=297A6D')} />
              <CardContent>
                <Typography>Kirk Henf</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card className="contactCard">
              <Avatar className="contactCardPhoto" src={('https://ui-avatars.com/api/?name=Mayoor+Rai&background=297A6D')} />
              <CardContent>
                <Typography>Mayoor Rai</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card className="contactCard">
              <Avatar className="contactCardPhoto" src={('https://ui-avatars.com/api/?name=Sean+Echevarria&background=297A6D')} />
              <CardContent>
                <Typography>Sean Echevarria</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default compose(
  withRouter)(ContactPage);