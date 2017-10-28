import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class Login extends React.Component<RouteComponentProps<{}>, {}> {


    form = {
        onSubmit: function (e: any) {
            e.preventDefault();
            console.log("submitted");
        }
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
                                <form name="form" onSubmit={this.form.onSubmit} noValidate>
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control input-lg" placeholder="E-mail Address" name="Email" type="text" />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control input-lg" placeholder="Password" name="Password" type="password" />
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="RememberMe" type="checkbox" />Remember me!
                                            </label>
                                        </div>
                                        <div className="pull-right" > Never been here? <NavLink to={'/register'} exact activeClassName='active'> Register</NavLink>
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