import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";

export default class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _onPressHandler = () => {
    console.log("открыть чат");
  };

  sortChats = chatItems => {
    //сортировка чатов по last message or chat creation datetime
    const sortChats = chatItems.sort((a, b) => {
      const aDateTime = new Date(
        a.lastMessage ? a.lastMessage.creationDate : a.creationDate
      );
      const bDateTime = new Date(
        b.lastMessage ? b.lastMessage.creationDate : b.creationDate
      );
      // console.log(`
      // чат А ${a.name} время &${aDateTime} getTime  ${aDateTime.getTime()}
      // чат B ${b.name} время &${bDateTime} getTime  ${bDateTime.getTime()}`)
      return bDateTime.getTime() - aDateTime.getTime();
    });

    return sortChats;
  };

  render() {
    const { chats } = this.props;
    const sorteredChats = this.sortChats(chats.items);

    return (
      <View>
        <FlatList
          data={sorteredChats}
          keyExtractor={(item, index) => item.id}
          refreshing={this.props.refreshing}
          onRefresh={this._handleOnRefreshList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.bigContainerWithShadowStyle}
                onPress={this._onPressHandler}
              >
                <View style={{ margin: 5 }}>
                  <Text style={styles.transactionParticipantText}>
                    {item.name}
                  </Text>
                  <View style={{ height: 5 }} />
                  <Text style={styles.addressText}> {item.description} </Text>
                  <View style={{ height: 3 }} />
                  <Text style={styles.addressText}>
                    закрыт чат - {item.isClose ? "Да" : "Нет"}{" "}
                  </Text>
                  <View style={{ height: 3 }} />
                  <Text style={styles.addressText}>
                  last message: 
                  </Text>
                  <View style={{ height: 3 }} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Text style={styles.receiptNumberText}>
                      тип чата {item.chatTypeId}
                    </Text>
                    {/* <Text style={styles.requestNumberText}>
                      {" "}
                      № {requestNumber}{" "}
                    </Text> */}
                  </View>
                  {/* <Text> {fromRegistrationPlanDate} </Text> */}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigContainerWithShadowStyle: {
    //width: "96%",
    justifyContent: "space-evenly",
    borderRadius: 5,
    backgroundColor: "white",
    shadowOpacity: 0.75,
    shadowRadius: 2,
    shadowColor: "gray",
    shadowOffset: { height: 0, width: 0 },
    marginRight: 1,
    marginLeft: 1,
    marginTop: 5
    //minHeight: 75
  },
  smGrayText: {
    fontSize: 11,
    color: "lightgray",
    textAlign: "center",
    marginTop: "2%"
  },
  transactionParticipantText: {
    fontSize: 15,
    fontWeight: "500"
  },
  addressText: {
    fontSize: 12,
    fontWeight: "200"
    // color: "gray"
  },
  requestNumberText: {
    fontSize: 13,
    fontWeight: "100"
    //color: "gray"
  },
  receiptNumberText: {
    fontSize: 13,
    fontWeight: "100",
    color: "gray"
  }
});
