import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, withRouter } from 'react-router-dom';

import * as ReactDOM from "react-dom";
import { AuthService } from '../services';
import { RouteRenderer } from '../routes';

interface ILogin {
    email: string,
    password: string,
    rememberMe: boolean
}

export class Login extends React.Component<RouteComponentProps<{}>, ILogin> {

    constructor(props:any) {
        super(props)
        this.state = {
            email: "",
            password: "",
            rememberMe:false
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleUserInput(e: any) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(state => {
            state[name] = value;
            return state;
        });
    }

    submitForm(e: any) {
        e.preventDefault();
        AuthService.login(this.state, () => {
            RouteRenderer.RedirectToLastRestrictedPath(this.props.history);
        });
    }

    public render() {

        return (
            <div className="">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 card">
                        <div>
                            <div>
                                <h3 className="text-center">Login</h3>
                            </div>
                            <div className="panel-body">
                                <form name="form" onSubmit={this.submitForm} noValidate>
                                    <fieldset>
                                        <div className="form-group">
                                            <input value={this.state.email}
                                                onChange={this.handleUserInput}
                                                className="form-control input-lg" placeholder="E-mail Address" name="email" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <input value={this.state.password}
                                                onChange={this.handleUserInput} className="form-control input-lg" placeholder="Password" name="password" type="password" />
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input checked={this.state.rememberMe}
                                                    onChange={this.handleUserInput} name="rememberMe" type="checkbox" />Remember me!
                                            </label>
                                        </div>
                                        <div className="pull-right" > Never been here? <NavLink to={'/register'} exact activeClassName='active'> Register</NavLink>
                                        </div >
                                        <input className="btn btn-lg btn-primary btn-block" defaultValue="Login" type="submit" />
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