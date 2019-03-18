import React from "react";
import RenderRadios from '../RenderRadios';

export default class MultipleChoice extends React.Component {
    render() {
        return (
            <RenderRadios
                questionText={this.props.Question}
                questionName={this.props.QuestionName}
                options={this.props.Options} />    
        )
    }
}