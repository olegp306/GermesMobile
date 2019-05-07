import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../theme/Colors";
import _ from "lodash";

import {
  Avatar,
  Card,
  Paragraph,
  Text,
  Button,
  Badge
} from "react-native-paper";

const statusList = {
  "95485390000": {
    id: "95485390000",
    name: "сдана"
  },
  "97670516000": {
    id: "97670516000",
    name: "приостановлена"
  },
  "95486490000": {
    id: "95486490000",
    name: "получена"
  }
};

export default class FutureRequestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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

  _getFutureContainerContent = recieviedRequests => {
    const recieviedArOrdered = recieviedRequests.sort(function compare(a, b) {
      var dateA = new Date(a.fromRegistrationPlanDate);
      var dateB = new Date(b.fromRegistrationPlanDate);
      return dateA - dateB;
    });

    let contentList = {};
    let nextDate = {};
    recieviedArOrdered.forEach(el => {
      let date = new Date(el.fromRegistrationPlanDate);

      if (this._getStringDate(date) == nextDate) {
        contentList[date].count = contentList[date].count + 1;
      } else {
        nextDate = this._getStringDate(date);
        contentList[date] = { date: nextDate, fullDate: date, count: 1 };
      }
    });
    const contentAr = _.values(contentList).sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    return contentAr;
  };

  render() {
    const { isFetching, items, feched } = this.props.requests;
    const requestsAr = _.values(items);
    const recieviedRequests = requestsAr.filter(item => {
      return item.statusId == 95486490000;
    });

    const contentAr = this._getFutureContainerContent(recieviedRequests);

    let contentItems = contentAr.map((item, index) => {
      return (
        <View style={styles.rowContainer}>
          <Text style={styles.itemText}>{item.date}</Text>
          <Text style={styles.itemText}>{item.count}</Text>
        </View>
      );
    });

    return (
      <TouchableOpacity
        style={styles.smallContainerWithShadowStyle}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>ПЛАН ПОЛУЧЕНИЯ ЗАЯВОК</Text>

        <Text style={styles.buttonSmallText}>
          Заявки которые скоро будут получены
        </Text>
        {/* <View style={{alignItems: 'center',}}> </View> */}
        {contentItems}
       
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  cardContent: {
    alignItems: "center"
    // backgroundColor:"yellow"
  },
  rowContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    alignItems: "center",
    margin: '2%',
    // backgroundColor:"steelblue"
  },
  smallContainerWithShadowStyle: {
    width: "96%",
    minHeight: 100,
    alignItems: 'center',
    justifyContent: "space-evenly",
    borderRadius: 5,
    backgroundColor: Colors.navigatorBackgroudColor,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: "gray",
    shadowOffset: { height: 0, width: 0 }
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    color: "white",
    marginTop: 5
  },
  buttonSmallText: {
    fontSize: 14,
    //fontWeight: "400",
    color: "white",
    textAlign: "center",
    alignItems: "flex-end",
    marginRight: 10
  },
  itemText: {
    fontSize: 14,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    alignItems: "flex-end",
    marginRight: 10
  }
});
