import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  
} from "react-native";
import { Colors } from "../theme";

import UserInfoCardContainerSm2 from "../components/UserInfoCardContainerSm2";
import BigButtonWithBadgeComponent from "../components/BigButtonWithBadgeComponent";


import { NavigationActions, StackActions } from "react-navigation";
import _ from "lodash";

// import { fetchRequests } from "../store/germes/requests/actions";
import { fetchRequests } from "../redux/germes/requests/actions";

import { green100 } from "../theme/paperUicolors";

const mapStateToProps = store => {
  return {
    requests: store.requests.toJS(),
    session: store.session.toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRequests: () => dispatch(fetchRequests())
  };
};

const SOZDANA = 95242996000;

const SDANA = 95485390000;
const PRIOSTANOVLENA = 97670516000;
const POLUCHENA = 95486490000;

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class CourierGeneralScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleShortPress = () => {
    this.props.navigation.navigate("CustomerMyRequestsScreen");
  };
  _getStringDate = fullDate => {
    return (
      fullDate.getDate() +
      "." +
      (fullDate.getMonth() + 1 < 10
        ? "0" + (fullDate.getMonth() + 1)
        : fullDate.getMonth()) +
      "." +
      fullDate.getFullYear()
    );
  };

  componentDidMount() {
    this.props.fetchRequests();
  }

  render() {
    const { session } = this.props;
    const { requests } = this.props;
    const requestsAr = _.values(requests.items);

    const submittedRequests = requestsAr.filter(item => {
      return item.statusId == SDANA;
    });

    const recieviedRequests = requestsAr.filter(item => {
      return item.statusId == POLUCHENA;
    });

    const pausedRequests = requestsAr.filter(item => {
      return item.statusId == PRIOSTANOVLENA;
    });

    return (
      <View style={styles.screenContainer}>
        <View style={{ height: "1%", width: "100%" }} />
        {/* Сведения о пользователе */}
        <UserInfoCardContainerSm2
          onPress={() => {
            //NavigationActions.navigate({ routeName: "CustomerDrawerNav" })
            //this.props.navigate('CustomerDrawerNav')
            //alert("sss");
          }}
        />

        <View style={{ height: "1%", width: "100%" }} />

        {/* <ScrollView contentContainerStyle={styles.middleContainer}> */}
          <View style={{ height: "5%", width: "100%" }} />

          {/*Получение*/}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly"
              // backgroundColor: "green"
            }}
          >
            <BigButtonWithBadgeComponent
              buttonText={"Получение"}
              // buttonSmallText={submittedRequests.length}
              // bargeText={submittedRequests.length}
              onPress={() => {
                {
                  this.props.navigation.navigate({
                    routeName: "TabsNav"
                  });
                }
              }}
            />
            <BigButtonWithBadgeComponent
              buttonText={"Чат/замечания"}
              // buttonSmallText={submittedRequests.length}
              // bargeText={submittedRequests.length}
              onPress={() => {
                {
                  this.props.navigation.navigate({
                    routeName: "Chats"
                  });
                }
              }}
            />
          </View>
          <View style={{ height: "100%", width: "1%" }} />
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    // flex: 1,
    //flexDirection: "column",
    //justifyContent: "flex-start",
    //alignItems: "center",
    //width: "100%",
    //height: "100%",
    backgroundColor: Colors.baseBackgroundColor
  },

  middleContainer: {
    alignItems: "center",
    paddingBottom: 250,
    backgroundColor: Colors.baseBackgroundColor
  },
  smallContainerWithShadowStyle: {
    width: "48%",
    minHeight: 100,
    justifyContent: "space-evenly",
    borderRadius: 5,
    backgroundColor: Colors.navigatorBackgroudColor,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: "gray",
    shadowOffset: { height: 0, width: 0 }
  },

  bigContainerWithShadowStyle: {
    width: "96%",
    justifyContent: "space-evenly",
    borderRadius: 5,
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: "gray",
    shadowOffset: { height: 0, width: 0 }
  },

  h2: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    color: "white"
  },

  rowContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    alignItems: "center"
    // backgroundColor:"steelblue"
  },

  cardContent: {
    alignItems: "center"
    // backgroundColor:"yellow"
  },
  lastUpdateText: {
    width: "100%",
    fontSize: 12,
    fontWeight: "200",
    color: Colors.actionBackgroundColor,
    textAlign: "right",
    alignItems: "flex-end",
    marginRight: 10
  },
  smallContainerWithShadowStyle: {
    width: "48%",
    minHeight: 100,
    justifyContent: "space-evenly",
    borderRadius: 5,
    backgroundColor: Colors.lightBlackTextColor,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: "gray",
    shadowOffset: { height: 0, width: 0 }
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    color: Colors.lightGray
  },
  buttonSmallText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.lightGray,
    textAlign: "right",
    alignItems: "flex-end",
    marginRight: 10
  }
});
