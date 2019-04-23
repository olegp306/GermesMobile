import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import RequestComponent from "./RequestComponent"
import _ from "lodash";

export default class RequestListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // data={_.sortBy(items,'scanDateTime').reverse() }   

    const requestsAr=_.sortBy(this.props.requests, 'requestNumber');
    return (      
         <View>
          <FlatList
            //data={this.props.items}
            data={requestsAr}
            // keyExtractor={this._keyExtractor}
            // refreshing={this.props.refreshing}
            // onRefresh={this._handleOnRefreshList}
            renderItem={({ item }) => {
              return (
                <RequestComponent
                  item={item}                
                />
              );
            }}
          />
         </View>
      
    );
  }
}
