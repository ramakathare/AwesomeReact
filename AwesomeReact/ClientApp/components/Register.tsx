import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { IRegisterFormModel, IFormInput } from '../interfaces'
import * as ReactDOM from "react-dom";
import { RegisterModel } from '../models';
import { FormElementErrors } from '../tagComponents/FormElementErrors';

interface IRegisterForm {
    registerForm: IRegisterFormModel
}

export class Register extends React.Component<RouteComponentProps<{}>, IRegisterForm> {

    constructor(props:any) {
        super(props);
        this.state = {
            registerForm: new RegisterModel()
        };
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(e: any) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(state => {
            (state.registerForm[name] as IFormInput).value = value; 
            return {
             registerForm: state.registerForm
            }
        }); 
    }

    componentDidMount() {
        var $this = ReactDOM.findDOMNode(this);
        console.log($this);
        console.log("mounted");
    }
    componentWillUnmount() {
        console.log("unmounted");
    }
    onSubmit(e: any) {
        e.preventDefault();
        console.log(this.state.registerForm);
        console.log(this.state.registerForm.getModel());
    }

    public render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 card">
                        <div>
                            <div>
                                <h3 className="text-center">Register</h3>
                            </div>
                            <div className="panel-body">
                                <form name="form" onSubmit={this.onSubmit.bind(this)} noValidate>
                                    <fieldset>
                                        <div className="form-group">
                                            <input onChange={this.handleUserInput} className="form-control input-lg" placeholder="E-mail Address" name="email" value={this.state.registerForm.email.value} type="text" />
                                            <FormElementErrors formInput={this.state.registerForm.email}></FormElementErrors>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleUserInput} className="form-control input-lg" placeholder="Password" name="password" value={this.state.registerForm.password.value} type="password" />
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleUserInput} className="form-control input-lg" placeholder="Confirm Password" value={this.state.registerForm.confirmPassword.value} name="confirmPassword" type="password" />

                                        </div >
                                        <div className="pull-right" > Already registered? <NavLink to={'/login'} exact activeClassName='active'> Login</NavLink>
                                        </div >
                                        <input className="btn btn-lg btn-primary btn-block" defaultValue="Register" type="submit" />
                                    </fieldset >
                                </form >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        );
    }
}