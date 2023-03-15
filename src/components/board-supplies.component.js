import React, { Component } from "react";

import BoardSuppliesData from "./board-supplies-data.component";
import BoardSuppliesVendor from "./board-supplies-vendor.component";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



export default class BoardSupplies extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    return (
      <Tabs>
        <TabList>
           <Tab>Supplies</Tab>
           <Tab>Vendors</Tab>
        </TabList>

        <TabPanel>
          <BoardSuppliesData/>
        </TabPanel>
        <TabPanel>
          <BoardSuppliesVendor/>
        </TabPanel>
      </Tabs>    );
  }
}
