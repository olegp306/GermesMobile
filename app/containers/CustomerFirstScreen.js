import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  Caption,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Badge
} from "react-native-paper";

export default class CustomerFirstScreeen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ height: "1%", width: "100%" }} />
        {/* Сведения о пользователе */}
        <View style={{ alignItems: "center" }}>
          <Card style={{ width: "95%" }}>
            <Card.Title
              title="Петрова Мария Ивановна"
              subtitle="Центр-Инвест"
              left={props => <Avatar.Icon {...props} icon="person" />}
              // verified-user
            />
            {/* <Card.Content style={styles.cardContent}>
              <Title>Петрова Мария Ивановна</Title>
              <Paragraph>Центр-Инвест. Роль - 'Заказчик'</Paragraph>
            </Card.Content> */}
          </Card>
        </View>

        <View style={{ height: "12%", width: "100%" }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center"
            //alignItems: "center",
          }}
        >
          {/* Замечания */}
          {/* <View style={{ alignItems: "center" }}> */}
          <Card style={{ width: "46%" }}>
            <Card.Title
              title="Замечания"
              subtitle="Заявки Открытыми замечания"
              elevation={3}
              left={props => (
                <Avatar.Icon {...props} icon="notifications-active" />
              )}
            />
          </Card>
          {/* </View> */}

          <View style={{ width: "2%" }} />

          {/* Приостановка */}
          {/* <View style={{ alignItems: "center" }}> */}
          <Card style={{ width: "46%" }}>
            <Card.Title
              title="Приостановка"
              subtitle="Приостановка"
              elevation={3}
              left={props => <Avatar.Icon {...props} icon="pause" />}
            />
          </Card>

          {/* <Card style={{ width: "40%" }}>
              <Card.Title
                title="Приостановка"
                // subtitle="Приостановка"
                elevation={3}
                left={props => <Avatar.Icon {...props} icon="pause" />}
              />
            </Card> */}
          {/* </View> */}
        </View>
        <View style={{ height: "2%", width: "100%" }} />
        <View style={{ alignItems: "center" }}>
          <Card style={{ width: "95%" }}>
            <Card.Title
              title=" Получено (сегодня)"
              subtitle="Заявки которые сегодня получены"
              elevation={3}
              left={props => <Avatar.Icon {...props} icon="today" />}
              // verified-user
            />
            {/* <Card.Content style={styles.cardContent}>
              <Title>Петрова Мария Ивановна</Title>
              <Paragraph>Центр-Инвест. Роль - 'Заказчик'</Paragraph>
            </Card.Content> */}
            {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
          </Card>
        </View>

        <View style={{ height: "2%", width: "100%" }} />
        <View style={{ alignItems: "center" }}>
          <Card style={{ width: "95%" }}>
            <Card.Title
              title="Сдана"
              // subtitle="Заявки которые сегодня получены"
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

            {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
          </Card>
        </View>

        <View style={{ height: "2%", width: "100%" }} />

        <View style={{ alignItems: "center" }}>
          <Card style={{ width: "95%" }}>
            <Card.Title
              title=" Сдана"
              // subtitle="Заявки которые сегодня получены"
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

            {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
          </Card>
        </View>
        <View style={{ height: "12%", width: "100%" }} />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 120
  },

  rowContainer: {
    flexDirection: "row",
    width:'50%',
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:"steelblue"
  },

  cardContent:{
    alignItems: 'center',
    // backgroundColor:"yellow"
  
  }
});
