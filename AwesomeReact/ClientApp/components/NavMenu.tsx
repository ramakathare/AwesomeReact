import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthService, IAuthentication } from '../services';
export class NavMenu extends React.Component<{}, {}> {
    public render() {
        var AuthIno: IAuthentication = AuthService.authentication;
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>AwesomeReact</Link>
                    
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li className={AuthIno.isAuth ? '' : 'displayNone'}>
                            <NavLink to={'/logout'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Logout
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li className={AuthIno.isAuth ? 'displayNone' : ''}>
                            <NavLink to={'/register'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Register
                            </NavLink>
                        </li>
                        <li className={AuthIno.isAuth ? 'displayNone' : ''}>
                            <NavLink to={'/login'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Login
                            </NavLink>
                        </li>
                        <li className={AuthIno.isAuth ? '' : 'displayNone'}>
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li className={AuthIno.isAuth ? '' : 'displayNone'}>
                            <NavLink to={ '/fetchdata' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>;
    }
}
