import React from 'react'
import PropTypes from 'prop-types'
import { Form, FormSpy } from 'react-final-form'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import arrayMutators from 'final-form-arrays'
import Fab from '@material-ui/core/Fab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ReactGA from 'react-ga';

const CREATIVE = 1;
const LOCICAL = 0;

const clear = ([children, page, previous, reset], state, { changeValue }) => {
  if(page != 0) {var element = React.Children.toArray(children)[page - 1].props.children.props.questionName;
    previous();
    changeValue(state, element, () => undefined)
  } else {
    reset();
  }
}

export default class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  
  static Page = ({ children }) => this.getChildren(children)

  static getChildren = children => {
    return children;
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {}
    }
  }

  // next = values => {
  //   const { children, onSubmit } = this.props
  //   this.setState(state => ({
  //     page: Math.min(state.page + 1, React.Children.count(children) - 1),
  //     values
  //   }))
  //   this.props.addSomething(values);
  //   this.props.getPageProgress((this.state.page + 1) / (React.Children.count(children) - 1) * 100);
  // }

  brainType = () => {
    if(this.props.brain === CREATIVE) {
      return 'creative'
    } else return 'logical'
  }

  previous = () => {
    const { children } = this.props
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))
    ReactGA.ga('send', 'pageview', '/quiz/' + this.brainType() + '/' + (this.state.page));
    this.props.getPageProgress((this.state.page - 1) / (React.Children.count(children) - 1) * 100);
  }

  /**
 * NOTE: Both validate and handleSubmit switching are implemented
 * here because 🏁 Redux Final Form does not accept changes to those
 * functions once the form has been defined.
 */

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  count(obj) { return Object.keys(obj).length; }

  handleSubmit = (values, e) => {
    const { page } = this.state
    const { children, onSubmit } = this.props
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    }
  }

  next = (values, e) => {
    const { page } = this.state
    if (!(this.count(e.getState().values) <= page)) {
      const { children } = this.props
      const isLastPage = page === React.Children.count(children) - 1;
      this.setState(state => ({
        page: Math.min(state.page + 1, React.Children.count(children) - 1),
        values
      }))
      this.props.addSomething(e.getState().values);
      if(!isLastPage) ReactGA.ga('send', 'pageview', '/quiz/' + this.brainType() + '/' + (this.state.page));
      else ReactGA.ga('send', 'pageview', '/quiz/SignUp');
      this.props.getPageProgress((this.state.page + 1) / (React.Children.count(children) - 1) * 100);
    }
  }

  render() {
    const { children, reset, isFetching } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        previous={this.previous}
        next={this.next}
        mutators={{
          clear
        }}
      >
        {({ handleSubmit, previous, next, form, form: { mutators: { clear } }, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <Grid item xs={12}>
              <Grid container spacing={16} justify="center">
                  <Fab color="secondary" onClick={() => clear(children, page, () => this.previous(), reset)} style={{ position: 'fixed', bottom: '30px', left: '15px' }}>
                    <ChevronLeftIcon />
                  </Fab>
                {/* {!isLastPage && <Grid item><Button color="primary" variant="contained" type="submit">Next</Button></Grid>} */}
                {isLastPage && (
                  <Grid item>
                    <Button color="primary" variant="contained" type="submit" disabled={isFetching}>Submit</Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <FormSpy onChange={() => next(values, form)} subscription={{ values: true }}/>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      </Form>
    )
  }
}
