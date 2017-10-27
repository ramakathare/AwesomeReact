import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout,Home,FetchData,Counter,Register,Login } from './components';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/register' component={Register} />
    <Route path='/login' component={Login} />
</Layout>;
