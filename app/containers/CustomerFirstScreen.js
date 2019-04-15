import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Images } from "../theme/";
import {
  Caption,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Badge,
  IconButton,
  Text
} from "react-native-paper";

export default class CustomerFirstScreeen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <View style={{ height: "1%", width: "100%" }} />
        {/* Сведения о пользователе */}
        <View style={{ alignItems: "center" }}>
          <Card style={{ width: "95%" }}>
            <Card.Title
              title="Петрова Мария Ивановна"
              subtitle="Центр-Инвест"
              left={props => (
                <Avatar.Image size={50} source={Images.avatarExample} />
              )}
              // verified-user
            />
            {/* <Card.Content style={styles.cardContent}>
              <Title>Петрова Мария Ивановна</Title>
              <Paragraph>Центр-Инвест. Роль - 'Заказчик'</Paragraph>
            </Card.Content> */}
          </Card>
        </View>
        <View style={{ height: "1%", width: "100%" }} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
        
          <View style={{ height: "5%", width: "100%" }} />
          <Text> Вариант №1 </Text>
          {/* Получено Замечания */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
              //alignItems: "center",
            }}
          >
            {/* Получено */}
            <Card style={{ width: "46%" }}>
              <Card.Title title="Получено" elevation={3} />
              <Text style={{ color: "red", textAlign: "center" }}>13 шт </Text>
            </Card>
            {/* Замечания */}
            <View style={{ width: "2%" }} />
            <Card style={{ width: "46%" }}>
              <Card.Title
                title="Замечания"
                // subtitle="Открытыми замечания"
                elevation={3}
              />
              <Text style={{ color: "red", textAlign: "center" }}>3 шт </Text>
            </Card>
          </View>
          <View style={{ height: "1%", width: "100%" }} />
          {/* Приостановка Сдана */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
              //alignItems: "center",
            }}
          >
            {/* Получено */}
            <Card style={{ width: "46%" }}>
              <Card.Title
                title="Приостановка"
                // subtitle="статус приостановка"
                elevation={3}
              />
              <Text style={{ color: "red", textAlign: "center" }}>1 шт </Text>
            </Card>
            {/* Замечания */}
            <View style={{ width: "2%" }} />
            <Card style={{ width: "46%" }}>
              <Card.Title title="Сдана" 
              // subtitle="статус сдана" 
              elevation={3}
               />
              <Text style={{ color: "red", textAlign: "center" }}>12 шт </Text>
            </Card>
          </View>

          <View style={{ height: "2%", width: "100%" }} />
          <Text> Вариант №2 </Text>

          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "95%" }}>
              <Card.Title
                title=" Получены сегодня"
                // subtitle="я получены"
                elevation={3}
                right={props => <Text style={{ color: "red" }}>13 шт </Text>}
                // <Badge {...props} children={3} size={30} />
              />
            </Card>
          </View>
          <View style={{ height: "1%", width: "100%" }} />

          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "95%" }}>
              <Card.Title
                title=" Замечания"
                // subtitle="Заявки которые сегодня получены"
                elevation={3}
                right={props => <Text style={{ color: "red" }}>3 шт </Text>}
              />
            </Card>
          </View>
          <View style={{ height: "1%", width: "100%" }} />
          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "95%" }}>
              <Card.Title
                title=" Приостановка"
                elevation={3}
                // right={props => <Badge {...props} children={3} size={30} />}
                right={props => <Text style={{ color: "red" }}>1 шт </Text>}
              />
            </Card>
          </View>
          <View style={{ height: "1%", width: "100%" }} />
          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "95%" }}>
              <Card.Title
                title=" Сдана"
                // subtitle="Заявки которые сегодня получены"
                elevation={3}
                right={props => <Text style={{ color: "red" }}>12 шт </Text>}
              />
            </Card>
          </View>

          <View style={{ height: "2%", width: "100%" }} />
          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "95%" }}>
              <Card.Title
                title="Статистика сданных дел"
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
          <Text>Тест блок для проверки скролла вниз</Text>
          <View style={{ alignItems: "center" }}>
            <Card style={{ width: "95%" }}>
              <Card.Title
                title="Тест блок для проверки скролва вниз"
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
                title="Тест блок 2 для проверки скролва вниз"                
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 250
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
  }
});
