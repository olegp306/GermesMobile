import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Card, Paragraph } from "react-native-paper";

const mapStateToProps = store => {
  return {
    session: store.session.toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class CustomerInfoCardContainerSm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { logged, employee } = this.props.session;

    return logged ? (
      <TouchableOpacity
        style={{ alignItems: "center" }}
        // onPress={this._handleShortPress}
      >
        <Card style={{ width: "80%" }}>
          <Card.Title
            title={employee.name}
            subtitle={employee.contractor.name}
            left={props => (
              <Avatar.Image size={50} source={{ uri: employee.avatar.url }} />
            )}
            // verified-user
          />
        </Card>
      </TouchableOpacity>
    ) : null;
  }
}
