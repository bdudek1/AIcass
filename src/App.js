import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Info from './containers/Info/Info';
import DrawImage from './containers/DrawImage/DrawImage';
import Favourites from './containers/Favourites/Favourites';
import IdentifyImages from './containers/TrainMe/IdentifyImages';
import NotFound from './containers/NotFound/NotFound';

class App extends Component {
  render () {
    return (
        <div>
          <Layout>
              <Switch>
                <Route path="/about" component={Info} />
                <Route path="/identify" component={IdentifyImages} />
                <Route path="/favourites" component={Favourites} />
                <Route path="/" exact component={DrawImage} />
                <Route component={NotFound} />
              </Switch>
          </Layout>
        </div>
    );
  }
}

export default App;
