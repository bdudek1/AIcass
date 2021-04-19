import React, { Component, createContext } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Info from './containers/Info/Info';
import DrawImage from './containers/DrawImage/DrawImage';
import TrainMe from './containers/TrainMe/TrainMe';
import NotFound from './containers/NotFound/NotFound';

class App extends Component {
  render () {
    return (
        <div>
          <Layout>
              <Switch>
                <Route path="/about" component={Info} />
                <Route path="/train" component={TrainMe} />
                <Route path="/" exact component={DrawImage} />
                <Route path="/faq" component={Info} />
                <Route component={NotFound} />
              </Switch>
          </Layout>
        </div>
    );
  }
}

export default App;
