import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IFormInput } from "../interfaces";

interface IFormElementErrorProps {
    formInput:IFormInput
}

export class FormElementErrors extends React.Component<IFormElementErrorProps, {}> {
    public render() {

        var formInput = this.props.formInput;
        if (!formInput.isInvalid) return <span></span>;

        var rules = this.props.formInput.rules;
        var errors = [];
        if (rules) {
            for (var key in rules) {
                var rule = rules[key];
                if(rule) if (rule.failed) errors.push(<div className='error'>{rule.message}</div>)
            }
        }

        return <div>{errors.join()}</div>;
    }
}
