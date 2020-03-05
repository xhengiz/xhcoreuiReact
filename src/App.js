import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../src/views/PrivateRoute';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import Dashboard from './views/Dashboard/Dashboard';
import Envanter from './views/Cengiz/Envanter';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null // <-- add this line
    }
  }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
             {/*   <Route path="/" name="DefaultLayout" render={props => <DefaultLayout {...props}/>} /> */}
              <PrivateRoute  name="DefaultLayout" path="/" component={ Envanter } />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
