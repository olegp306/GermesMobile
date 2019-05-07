import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Image ,StyleSheet} from "react-native";
import { Images,Colors } from "../../theme";

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
        onPress={this.props.onPress}
      >
        <Image
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            borderColor: "gray",
            borderWidth: 1
          }}
          source={ employee.avatar.physicalName ? {uri: employee.avatar.url } : Images.noUserPhoto}
        />

        <Text style={styles.nameText}>{employee.name}</Text>
        <Text style={styles.companyText}>{employee.contractor.name}</Text>
        
      </TouchableOpacity>
    ) : null;
  }
}
const styles=StyleSheet.create({
  nameText:{
    fontSize: 14,
    textAlign: "center",
    fontWeight: "200",
    //color: Colors.lightBlackTextColor,
    marginTop: 5
  },
  companyText:{
    fontSize: 12,
    textAlign: "center",
    fontWeight: "100",
    color: Colors.lightBlackTextColor,
    marginTop: 5
  },
})
