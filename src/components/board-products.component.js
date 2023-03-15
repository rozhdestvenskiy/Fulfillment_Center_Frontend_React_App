import React, { Component } from "react";

import BoardProductsData from "./board-products-data.component";
import BoardProductsDistributor from "./board-products-distributor.component";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export default class BoardProducts extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    return (
      <Tabs>
        <TabList>
           <Tab>Products</Tab>
           <Tab>Distributors</Tab>
        </TabList>

        <TabPanel>
          <BoardProductsData/>
        </TabPanel>
        <TabPanel>
          <BoardProductsDistributor/>
        </TabPanel>
      </Tabs>    
    );
  }
}
