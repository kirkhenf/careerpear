import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

export default class Wizard extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    static Page = ({ children }) => children

    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            values: props.initialValues || {}
        }
    }
    next = values =>
        this.setState(state => ({
            page: Math.min(state.page + 1, this.props.children.length - 1),
            values
        }))

    previous = () =>
        this.setState(state => ({
            page: Math.max(state.page - 1, 0)
        }))

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

    handleSubmit = values => {
        const { children, onSubmit } = this.props
        const { page } = this.state
        const isLastPage = page === React.Children.count(children) - 1
        if (isLastPage) {
            return onSubmit(values)
        } else {
            this.next(values)
        }
    }

    render() {
        const { children } = this.props
        const { page, values } = this.state
        const activePage = React.Children.toArray(children)[page]
        const isLastPage = page === React.Children.count(children) - 1
        return (
            <Form
                initialValues={values}
                validate={this.validate}
                onSubmit={this.handleSubmit}>
                {({ handleSubmit, submitting, values }) => (
                    <form onSubmit={handleSubmit}>
                        {activePage}
                        <Grid item xs={12}>
                            <Grid container spacing={16} justify="center">
                                    {page > 0 && (
                                        <Grid item>
                                            <Button variant="outlined" type="button" onClick={this.previous}>
                                                Back
                </Button>
                                        </Grid>
                                    )}
                                    {!isLastPage && <Grid item><Button color="primary" variant="contained" type="submit">Next</Button></Grid>}
                                    {isLastPage && (
                                        <Grid item>
                                            <Button color="primary" variant="contained" type="submit" disabled={submitting}>
                                                Submit
                </Button>
                                        </Grid>
                                    )}
                            </Grid>
                        </Grid>

                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}
            </Form>
        )
    }
}
