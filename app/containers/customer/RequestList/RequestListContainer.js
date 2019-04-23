import React, { Component } from "react";
import { View, Text } from "react-native";
import RequestListComponent from "./RequestListComponent";
import { connect } from "react-redux";
import _ from "lodash";

const mapStateToProps = store => {
  return {
    requests: store.requests.toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class RequestListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { items, isFetching, fetched } = this.props.requests;
    const allItemssArr = _.values(items);

    const filteredItemssArr = allItemssArr.filter(item => {
      return item.statusId == this.props.statusFilter;
    });

    return (
      <View style={{ flex: 1 , alignItems: 'center',}}>
        {isFetching ? (
          <Text>Загрузка заявок</Text>
        ) : (
          <RequestListComponent requests={filteredItemssArr} />
        )}
      </View>
    );
  }
}
