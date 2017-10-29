import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Home, FetchData, Counter, Register, Login, NotFound } from './components';
import { AuthService, IAuthentication } from './services';
import { Redirect } from 'react-router';

abstract class CustomRenderer {
    static AuthIno: IAuthentication = AuthService.authentication;

    static RenderAfterAuthCheck(Component: React.ComponentClass): JSX.Element {
        return (!this.AuthIno.isAuth) ? this.UnAuthorizedRenderer() : (<Component />);
    }
    static UnAuthorizedRenderer() {
        return <Redirect to="/login" />;
    }
    static NormalRender(Component: React.ComponentClass): JSX.Element {
        return <Component />;
    }
}

export const routes = <Layout>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/counter' render={() => CustomRenderer.RenderAfterAuthCheck(Counter)} />
        <Route path='/fetchdata' render={() => CustomRenderer.RenderAfterAuthCheck(FetchData)} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route render={() => CustomRenderer.NormalRender(NotFound)} />
    </Switch>
</Layout>;
