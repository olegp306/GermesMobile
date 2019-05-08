import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../theme/Colors";
import _ from "lodash";

import { Avatar, Card, Paragraph, Button, Badge } from "react-native-paper";

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
    const date= new Date(fullDate)
    return (
      (date.getDate()<10 ? "0" +date.getDate():date.getDate())+
      "." +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth()) +
      "." +
      date.getFullYear()
    );
  };

  _getFutureContainerContent = recieviedRequests => {
    const recieviedArOrdered = recieviedRequests.sort(function compare(a, b) {
      var dateA = new Date(a.fromRegistrationPlanDate);
      var dateB = new Date(b.fromRegistrationPlanDate);
      return dateA - dateB;
    });

    const today = new Date().setHours(0,0,0,0);
    
    let nextDate =new Date().setHours(0,0,0,0);
    let contentList={[this._getStringDate(nextDate)]:{date:this._getStringDate(nextDate), count:0}};

    recieviedArOrdered.forEach(el => {

      let fromRegPlanDate = new Date(el.fromRegistrationPlanDate).setHours(0,0,0,0);
      let nextDateString=this._getStringDate(nextDate);
      let fromRegPlanDateString = this._getStringDate(fromRegPlanDate);

      if (fromRegPlanDate <= nextDate) {
        contentList[nextDateString].count = contentList[nextDateString].count + 1;
      }     
       else {
          nextDate = fromRegPlanDate;

          contentList[fromRegPlanDateString] = { date: fromRegPlanDateString, count: 1 };
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
      return item.statusId == 95485390000;
    });

    const contentAr = this._getFutureContainerContent(recieviedRequests);

    let contentItems = contentAr.map((item, index) => {
      const isToday=(item.date == this._getStringDate(new Date))
      
      return (
        isToday?
        <View style={styles.rowContainer}>
          <Text style={styles.itemTodayText}>СЕГОДНЯ</Text>
          <Text style={styles.itemTodayText}>{item.count}</Text>
        </View>
        :
        <View style={styles.rowContainer}>
          <Text style={styles.itemText}>{item.date}</Text>
          <Text style={styles.itemText}>{item.count}</Text>
        </View>
      );
    });

    return (
      <TouchableOpacity
        style={styles.smallContainerWithShadowStyle}
        // onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>ПЛАН ПОЛУЧЕНИЯ ЗАЯВОК</Text>

        <Text style={styles.buttonSmallText}>
        заявки "СДАНА", получение по плану в следующие дни
        </Text>
        {/* <View style={{alignItems: 'center',}}> </View> */}
        {contentAr.length != 0 ? (
          contentItems
        ) : (
          <Text style={styles.messageText}>
            {" "}
            На ближайщие дни нет запланированых на получение заявок{" "}
          </Text>
        )}
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
    margin: "1%"
    // backgroundColor:"steelblue"
  },

  smallContainerWithShadowStyle: {
    width: "96%",
    minHeight: 100,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    //backgroundColor: Colors.whiteSmoke,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: "gray",
    shadowOffset: { height: 0, width: 0 }
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
    color: Colors.lightBlackTextColor,
    marginTop: 5
  },
  buttonSmallText: {
    fontSize: 12,
    fontWeight: "200",
    color: Colors.lightBlackTextColor,
    textAlign: "center"
    //alignItems: "flex-end",
    //marginRight: 10
  },
  itemText: {
    fontSize: 15,
    fontWeight: "200",    
    textAlign: "center"
   
  },
  itemTodayText: {
    fontSize: 15,
    fontWeight: "400",
    color: Colors.actionBackgroundColor,
    textAlign: "center"
    //alignItems: "flex-end",
    //marginRight: 10
  },
  messageText: {
    fontSize: 14,
    fontWeight: "200",
    color: Colors.actionBackgroundColor,
    textAlign: "center",
    marginTop: 4
  }
});
