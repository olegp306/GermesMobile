import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Images, Colors } from "../../theme";
import {
  Avatar,
  Card,
  Paragraph,
  Text,
  Button,
  Badge
} from "react-native-paper";
import CustomerInfoCardContainer from "../../containers/customer/customerInfo/CustomerInfoCardContainer";
import BigButtonWithBadgeComponent from "./BigButtonWithBadgeComponent";
import FutureRequestComponent from "./FutureRequestComponent";

import _ from "lodash";

import { fetchRequests } from "../../store/germes/requests/actions";
import { green100 } from "../../theme/paperUicolors";

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
      <View>
        <View style={{ height: "1%", width: "100%" }} />
        {/* Сведения о пользователе */}
        <CustomerInfoCardContainer />

        <View style={{ height: "1%", width: "100%" }} />

        <ScrollView contentContainerStyle={styles.contentContainer}>
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

          <View style={{ height: "2%", width: "100%" }} />
          <Button
            style={{ width: "85%", margin: "4%" }}
            contentStyle={{ height: 45 }}
            mode="outlined "
            onPress={()=>this.props.fetchRequests()}
            loading={requests.isFetching}
            
          >
            обновить данные
          </Button>
          <View style={{ height: "2%", width: "100%" }} />
          <FutureRequestComponent requests={requests} />
          {/* <View style={{ alignItems: "center" }}>
            <Card style={{ width: "95%" }}>
              <Card.Title
                title="Не работает Статистика сданных дел"
                subtitle="Заявки которые будут скоро получены"
                elevation={3}
                left={props => <Avatar.Icon {...props} icon="update" />}
                // verified-user
              />
              <Card.Content style={styles.cardContent}>
                <View style={styles.rowContainer}>
                  <Paragraph>27.03.2018</Paragraph>
                  <Paragraph>3 шт.</Paragraph>
                </View>

                <View style={styles.rowContainer}>
                  <Paragraph>28.03.2018</Paragraph>
                  <Paragraph>9 шт.</Paragraph>
                </View>

                <View style={styles.rowContainer}>
                  <Paragraph>29.03.2018</Paragraph>
                  <Paragraph>22 шт.</Paragraph>
                </View>
              </Card.Content>
            </Card>
          </View> */}

          <View style={{ height: "12%", width: "100%" }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    paddingBottom: 250
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
  // containerWithShadowStyle2: {
  //   borderWidth: 1,
  //   borderRadius: 2,
  //   borderColor: "#ddd",
  //   borderBottomWidth: 0,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.8,
  //   shadowRadius: 2,
  //   elevation: 1,
  //   marginLeft: 5,
  //   marginRight: 5,
  //   marginTop: 10
  // },

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
  }
});
