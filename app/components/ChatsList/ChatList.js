import React, { Component } from "react";
import { View, Text ,FlatList} from "react-native";

export default class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { chats } = this.props;
    return (
      <View>
        <FlatList
          data={chats.items}
          keyExtractor={(item, index) => item.id}
          refreshing={this.props.refreshing}
          onRefresh={this._handleOnRefreshList}
          renderItem={({ item }) => {         

            return (
            <View>
              <Text>Название чата</Text>
              <Text>{item.name}</Text>
              <Text> закрыт чат - {item.isClose}</Text>
              <Text>Тип чата</Text>
              <Text>{item.chatTypeId}</Text>

              </View>
            );
          }
        }
        />
      </View>
    );
  }
}
