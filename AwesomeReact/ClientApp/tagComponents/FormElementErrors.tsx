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
        var errors = [] as any[];
        if (rules) {
            for (var key in rules) {
                var rule = rules[key];
                var className = "error error_" + key;
                if (rule) if (rule.failed) errors.push(<div key={key} className={className}>{rule.message}</div>)
            }
        }

        return <div>{errors}</div>;
    }
}
