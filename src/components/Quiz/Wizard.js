import React from 'react'
import PropTypes from 'prop-types'
import { Form, FormSpy } from 'react-final-form'
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ReactGA from 'react-ga';

const CREATIVE = 1;
const LOGICAL = 0;

const styles = theme => ({
  backButton: {
    [theme.breakpoints.down('sm')]: {
      top: '10px',
      left: '10px'
    },
  }
});

const clear = ([children, page, previous, reset], state, { changeValue }) => {
  if (page != 0) {
    var element = React.Children.toArray(children)[page - 1].props.children.props.children[2].props.children.props.children.props.questionName;
    previous();
    changeValue(state, element, () => undefined)
  } else {
    reset();
  }
}

export class Wizard extends React.Component {
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
    this.props.getPageProgress({
      currentPage: this.state.page,
      numPages: props.children[0].length
    })
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
    if (this.props.brain === CREATIVE) {
      return 'creative'
    } else return 'logical'
  }

  previous = () => {
    const { children } = this.props
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))
    ReactGA.ga('send', 'pageview', '/quiz/' + this.brainType() + '/' + (this.state.page));
    // this.props.getPageProgress((this.state.page - 1) / (React.Children.count(children) - 1) * 100);
    this.props.getPageProgress({
      currentPage: this.state.page - 1,
      numPages: React.Children.count(children) - 1
    });
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

  next = (values, previous, e) => {
    const { page } = this.state
    const { children } = this.props
    console.log(values);
    if (values.dirty) {
      const { children } = this.props
      const isLastPage = page === React.Children.count(children) - 1;
      this.setState(state => ({
        page: Math.min(state.page + 1, React.Children.count(children) - 1),
        values
      }))
      this.props.addSomething(e.getState().values);
      if (!isLastPage) ReactGA.ga('send', 'pageview', '/quiz/' + this.brainType() + '/' + (this.state.page));
      else ReactGA.ga('send', 'pageview', '/quiz/signup');
      this.props.getPageProgress({
        currentPage: this.state.page + 1,
        numPages: React.Children.count(children) - 1
      });
    }
  }

  render() {
    const { children, reset, isFetching, classes } = this.props
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
          <form style={{ height: '100%', width: '100%' }} onSubmit={handleSubmit}>
            {activePage}
            <Fab disabled={page == 0} color="secondary" classes={{ root: classes.backButton }} onClick={() => clear(children, page, () => this.previous(), reset)} style={{ position: 'fixed', bottom: '15px', left: '15px' }}>
              <ChevronLeftIcon />
            </Fab>
            {/* {!isLastPage && <Grid item><Button color="primary" variant="contained" type="submit">Next</Button></Grid>} */}
            {/* {isLastPage && (
              <Button className="submitButton" color="secondary" variant="contained" type="submit" disabled={isFetching}>Submit</Button>
            )} */}
            <FormSpy onChange={(values, previous) => next(values, previous, form)} subscription={{ values: true, touched:true, dirty:true }} />
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      </Form>
    )
  }
}

export default withStyles(styles)(Wizard)
