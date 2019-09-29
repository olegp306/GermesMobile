import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import RequestListComponent from "./RequestListComponent";
import { Images, Colors } from "../../theme";
import { fetchRequests } from "../../redux/germes/requests/actions";
import { connect } from "react-redux";
import _ from "lodash";

const mapStateToProps = store => {
  return {
    requests: store.requests.toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRequests: () => dispatch(fetchRequests())
  };
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

  _handleOnRefreshList = () => {
    this.props.fetchRequests();
  };

  render() {
    const { items, isFetching, fetched, refreshing } = this.props.requests;
    const allItemssArr = _.values(items);

    const filteredItemssArr = allItemssArr.filter(item => {
      return item.statusId == this.props.statusFilter;
    });

    return (
      <View style={styles.screenContainer}>
        {isFetching ? (
          <Text>Загрузка заявок</Text>
        ) : (
          <RequestListComponent
            requests={filteredItemssArr}
            refreshing={refreshing}
            onRefresh={this._handleOnRefreshList}
          />
        )}
      </View>
    );
  }
}

const styles = new StyleSheet.create({
  screenContainer: {
    flex: 1,    
    //margin: "1%",
    backgroundColor: Colors.baseBackgroundColor,    
    borderRadius: 3
  }
});
