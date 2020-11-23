import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/BurgerBuilder/Checkout/Checkout';
import {Route} from 'react-router-dom'

import Orders from './containers/BurgerBuilder/Orders/Orders'
class App extends Component {
  render() {
    return (
      <div>
          <Layout>
          <switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path='/orders' component={Orders}/>
            </switch>
          </Layout>
      </div>
    );
  }
}

export default App;
