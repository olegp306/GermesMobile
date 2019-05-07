import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Avatar, Card, Paragraph, Colors } from "react-native-paper";
import { Images } from "../../theme";

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
    const avatarUrlObj = employee.avatar.url
      ? { uri: employee.avatar.url }
      : Images.logo;

    return logged ? (
      <TouchableOpacity
        style={{ alignItems: "center" }}
        // onPress={this._handleShortPress}
      >
      
      
        <Image
          // source={avatarUrlObj}
          //source={Images.noUserPhoto}
          style={{height:60, width:60, borderRadius: 30, borderColor: "gray",borderWidth: 1,}}
          
          source={{ uri: employee.avatar.url }}
          // resizeMode="contain"
          // style={[styles.logo, { height: this.imageHeight }]}
          //style={[styles.logo, }
        />

        {/* <Image size={50} source={{ uri: employee.avatar.url }} /> */}
        <Text>{employee.name}</Text>
        <Text>{employee.contractor.name}</Text>
        {/* <Card style={{ width: "80%" }}>
          <Card.Title
            title={employee.name}
            subtitle={employee.contractor.name}
            left={props => (
              <Avatar.Image size={50} source={{ uri: employee.avatar.url }} />
            )}
            // verified-user
          />
        </Card> */}
      </TouchableOpacity>
    ) : null;
  }
}
