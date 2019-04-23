import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import RequestComponent from "./RequestComponent";
import _ from "lodash";

export default class RequestListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const requestsAr = _.sortBy(this.props.requests, "requestNumber");
    return (
      <FlatList
        data={requestsAr}
        renderItem={({ item }) => {
          return <RequestComponent item={item} />;
        }}
      />
    );
  }
}
