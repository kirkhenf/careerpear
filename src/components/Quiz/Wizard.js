import React from 'react'
import PropTypes from 'prop-types'
import { Form, FormSpy } from 'react-final-form'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import arrayMutators from 'final-form-arrays'
import Fab from '@material-ui/core/Fab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const clear = ([children, page, previous], state, { changeValue }) => {
  var element = React.Children.toArray(children)[page - 1].props.children.props.questionName;
  previous();
  changeValue(state, element, () => undefined)
}

export default class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      countValues: 0,
      values: props.initialValues || {}
    }
  }

  next = values => {
    console.log("Going to next page");
    const { children, onSubmit } = this.props
    this.setState(state => ({
      page: Math.min(state.page + 1, React.Children.count(children) - 1),
      values
    }))
    this.props.addSomething(values);
    this.props.getPageProgress((this.state.page + 1) / (React.Children.count(children) - 1) * 100);
  }

  previous = () => {
    console.log("Going to previous page");
    const { children } = this.props
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))
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
    console.log(this.count(e.getState().values));
    console.log("Page: " + page)
    if (values.brain && !(this.count(e.getState().values) < page)) {
      const { children, onSubmit } = this.props
      const isLastPage = page === React.Children.count(children) - 1
      if (isLastPage) {
        return onSubmit(values)
      } else {
        this.next(values)
      }
    }
  }

  render() {
    const { children, isFetching } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        previous={this.previous}
        mutators={{
          clear
        }}
      >
        {({ handleSubmit, previous, form, form: { mutators: { clear } }, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <Grid item xs={12}>
              <Grid container spacing={16} justify="center">
                {page > 0 && (
                  <Fab color="secondary" onClick={() => clear(children, page, () => this.previous())} style={{ position: 'fixed', bottom: '30px', left: '15px' }}>
                    <ChevronLeftIcon />
                  </Fab>
                  // <Grid item>
                  //   <Button variant="outlined" type="button" onClick={() => clear(children, page, () => this.previous())}>Back</Button>
                  // </Grid>
                )}
                {/* {!isLastPage && <Grid item><Button color="primary" variant="contained" type="submit">Next</Button></Grid>} */}
                {isLastPage && (
                  <Grid item>
                    <Button color="primary" variant="contained" type="submit" disabled={isFetching}>Submit</Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <FormSpy onChange={(e) => handleSubmit(values, e)} subscription={{ values: true }}>
              {({ values }) => (
                console.log(values)
              )}
            </FormSpy>
            {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
          </form>
        )}
      </Form>
    )
  }
}
