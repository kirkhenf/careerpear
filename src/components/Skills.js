import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import Chip from '@material-ui/core/Chip';

import {
  InstantSearch,
  Highlight,
  SearchBox,
  Hits,
  connectSearchBox,
  connectStateResults,
  connectHits
} from 'react-instantsearch-dom';
import {
  TextField,
  MenuItem
} from '@material-ui/core';

const SkillsPage = () =>
  <div>
    <h1>Skills</h1>
    <SkillsForm />
  </div>

function findHit(array, element) {
  var didFind = false;
  element = element.toLowerCase();
  array.forEach(function (hit) {
    if (hit.name.toLowerCase() === element) didFind = true;
  })
  return didFind;
}

const MySearchBox = ({ currentRefinement, refine }) =>
  <TextField
    placeholder="Search for a skill..."
    type="text"
    value={currentRefinement}
    onChange={e => refine(e.target.value)}
  />;

const ConnectedSearchBox = connectSearchBox(MySearchBox);

const SkillChips = ({ skills }) =>
  <div>
    {skills.map(data => {
      return (
        <Chip
          key={data.key}
          // avatar={avatar}
          label={data.label}
        // onDelete={this.handleDelete(data)}
        // className={classes.chip}
        />
      )
    })}
  </div>

class SkillsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [{}]
    };
  }

  Search = connectStateResults(({ searchState, searchResults }) =>
    <div className="container">
      <ConnectedSearchBox />
      <this.CustomHits searchState={searchState} />
    </div>
  );

  CustomHits = connectHits(({ hits, searchState }) => (
    <div>
      {(searchState.query !== undefined && searchState.query !== '' && !findHit(hits, searchState.query)) && <MenuItem onClick={e => this.logItem(searchState.query)} >{searchState.query}</MenuItem>}
      {(searchState.query !== undefined && searchState.query !== '') && hits.map(hit =>
        <MenuItem onClick={(e) => this.logItem(e, hit)} key={hit.objectID}>
          <Highlight attribute="name" hit={hit} />
        </MenuItem>
      )}
    </div>
  ));

  logItem(e, hit) {
    console.log(hit);
    e.preventDefault();
    const obj = {
      key: hit.objectID,
      label: hit.name
    }
    this.setState({
      skills: [...this.state.skills, obj]
    });
  }

  render() {
    return <div>
      <InstantSearch
        appId="RGC0DTOU89"
        apiKey="4d8b325c77700c8d57bfba1d7d597d38"
        indexName="skills"
      >
        {/* Search widgets will go there */}
        <this.Search />
      </InstantSearch>
      <SkillChips skills={this.state.skills} />
    </div>
  }
}

export default compose(
  withRouter,
  firebaseConnect(),
  connect((state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
  })))(SkillsPage);