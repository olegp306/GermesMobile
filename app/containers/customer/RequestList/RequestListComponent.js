import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import RequestComponent from "./RequestComponent";
import _ from "lodash";

export default class RequestListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = (item, index) => item.requestId;

  render() {
    const requestsAr = _.sortBy(this.props.requests, "requestNumber");
    return (
      <FlatList
        data={requestsAr}
        keyExtractor={this._keyExtractor}

        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        
        renderItem={({ item }) => {
          return <RequestComponent item={item} />;
        }}
      />
    );
  }
}
