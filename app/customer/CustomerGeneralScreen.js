import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { Images, Colors } from "../theme";
import { Avatar, Card, Paragraph, Button, Badge } from "react-native-paper";
import CustomerInfoCardContainer from "./customerInfo/CustomerInfoCardContainer";
import BigButtonWithBadgeComponent from "./BigButtonWithBadgeComponent";
import FutureRequestComponent from "./FutureRequestComponent";

import _ from "lodash";

import { fetchRequests } from "../store/germes/requests/actions";
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
export default class CustomerGeneralScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleShortPress = () => {
    this.props.navigation.navigate("CustomerMyRequestsScreen");
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
        <CustomerInfoCardContainer />

        <View style={{ height: "1%", width: "100%" }} />

        <ScrollView contentContainerStyle={styles.middleContainer}>
          <View style={{ height: "5%", width: "100%" }} />

          {/* Сдана Приостановка */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <BigButtonWithBadgeComponent
              buttonText={"СДАНА"}
              buttonSmallText={submittedRequests.length}
              // bargeText={submittedRequests.length}
              onPress={() => {
                {
                  this.props.navigation.navigate({
                    routeName: "CustomerSubmittedRequestScreen"
                  });
                }
              }}
              buttonText={"СДАНА"}
              // bargeText={submittedRequests.length}
              buttonSmallText={submittedRequests.length}
            />

            <View style={{ height: "100%", width: "1%" }} />

            <BigButtonWithBadgeComponent
              buttonText={"ПРИОСТАНОВКА"}
              buttonSmallText={pausedRequests.length}
              // bargeText={pausedRequests.length}
              onPress={() => {
                {
                  this.props.navigation.navigate({
                    routeName: "CustomerPausedRequestScreen"
                  });
                }
              }}
            />
          </View>
          {/* Замечания Получено */}
          <View style={{ height: "1%", width: "100%" }} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <BigButtonWithBadgeComponent
              buttonText={"ЗАМЕЧАНИЯ"}
              buttonSmallText={"нет данных"}
              // bargeText={"нет данных"}
              // onPress={()=>{{
              //   this.props.navigation.navigate({
              //     routeName: "CustomerPausedRequestScreen"
              //   });
              // }}}
            />
            <View style={{ height: "100%", width: "1%" }} />

            <BigButtonWithBadgeComponent
              buttonText={"ПОЛУЧЕНА"}
              buttonSmallText={recieviedRequests.length}
              // bargeText={recieviedRequests.length}
              onPress={() => {
                {
                  this.props.navigation.navigate({
                    routeName: "CustomerRecievedRequestScreen"
                  });
                }
              }}
            />
          </View>
          <View style={{ height: "1%", width: "100%" }} />
          <Text style={styles.lastUpdateText}>
            {" "}
            {requests.lastSuccessFetch
              ? "последнее обновление в " + requests.lastSuccessFetch
              : null}
          </Text>
          <View style={{ height: "2%", width: "100%" }} />

          <Button
            style={{ width: "85%", margin: "4%", borderColor: "gray" }}
            contentStyle={{ height: 45 }}
            mode="outlined"
            onPress={() => this.props.fetchRequests()}
            loading={requests.isFetching}
          >
            обновить данные
          </Button>

          <View style={{ height: "2%", width: "100%" }} />
          <FutureRequestComponent
            requests={requests}
            onPress={() => {
              {
                this.props.navigation.navigate({
                  routeName: "CustomerRecievedRequestScreen"
                });
              }
            }}
          />

          <View style={{ height: "12%", width: "100%" }} />
        </ScrollView>
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
  }
});
