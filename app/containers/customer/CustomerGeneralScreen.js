import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Images } from "../../theme";
import { Avatar, Card, Paragraph, Text } from "react-native-paper";
import _ from "lodash";

import { fetchRequests } from "../../store/germes/requests/actions";

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
        <TouchableOpacity
          style={{ alignItems: "center" }}
          // onPress={this._handleShortPress}
        >
          <Card style={{ width: "95%" }}>
            <Card.Title
              title={session.employee.name}
              subtitle={session.employee.contractor.name}
              left={props => (
                <Avatar.Image size={50} source={Images.avatarExample} />
              )}
              // verified-user
            />
          </Card>
        </TouchableOpacity>
        <View style={{ height: "1%", width: "100%" }} />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={{ height: "5%", width: "100%" }} />
          {/* <Text> Вариант №1 </Text> */}
          {/* Получено Замечания */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              style={styles.smallContainerWithShadowStyle}
              onPress={() => {
                this.props.navigation.navigate({
                  routeName: "CustomerSubmittedRequestScreen"
                });
              }}
            >
              <Text style={styles.h2}>Сдана</Text>
              <Text style={{ color: "red", textAlign: "center" }}>
                {submittedRequests.length}{" "}
              </Text>
            </TouchableOpacity>

            <View style={{ height: "100%", width: "1%" }} />

            <TouchableOpacity
              style={styles.smallContainerWithShadowStyle}
              onPress={() => {
                this.props.navigation.navigate({
                  routeName: "CustomerPausedRequestScreen"
                });
              }}
            >
              <Text style={styles.h2}>Приостановка</Text>
              <Text style={{ color: "red", textAlign: "center" }}>
                {pausedRequests.length}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Замечания Получено */}
          <View style={{ height: "1%", width: "100%" }} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity style={styles.smallContainerWithShadowStyle}>
              <Text style={styles.h2}>Замечания</Text>
              <Text style={{ color: "red", textAlign: "center" }}>
                нет данных{" "}
              </Text>
            </TouchableOpacity>

            <View style={{ height: "100%", width: "1%" }} />

            <TouchableOpacity
              style={styles.smallContainerWithShadowStyle}
              onPress={() => {
                this.props.navigation.navigate({
                  routeName: "CustomerRecievedRequestScreen"
                });
              }}
            >
              <Text style={styles.h2}>Получена</Text>
              {/* <Text style={{ textAlign: "center",fontSize:'10', color:'gray'}}> ( сегодня )</Text> */}
              <Text style={{ color: "red", textAlign: "center" }}>
                {recieviedRequests.length}{" "}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: "2%", width: "100%" }} />
          <View style={{ alignItems: "center" }}>
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
          </View>

          <View style={{ height: "12%", width: "100%" }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 250
  },
  smallContainerWithShadowStyle: {
    width: "48%",
    minHeight: 100,
    justifyContent: "space-evenly",
    borderRadius: 5,
    backgroundColor: "white",
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
    fontSize: 18,
    textAlign: "center",
    fontWeight: "400"
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
