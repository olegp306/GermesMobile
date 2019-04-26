import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import {
    Avatar,
    Card,
    Paragraph,
    Text,
    Button,
    Badge
  } from "react-native-paper";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
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
        alignItems: "center"
        // backgroundColor:"steelblue"
      },
  });
  
