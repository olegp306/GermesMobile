import { DrawerItems } from "react-navigation";

import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";
import CustomerInfoCardContainer from "./customerInfo/CustomerInfoCardContainerSm2";
import { blue100 } from "../theme/paperUicolors";
import {
  Avatar,
  Card,
  Paragraph,
  Text,
  Button,
  Badge
} from "react-native-paper";
import { Colors, Images, Metrics } from "../theme";

export const CustomerDrawerContentComponent = props => (
  <View style={{ justifyContent: "space-between" }}>
    {/* <SafeAreaView style={{ flex: 1 ,backgroundColor:blue100}}> */}

    {/* </SafeAreaView> */}
    {/* <Text>боковое меню</Text> */}
    <View style={{alignItems: 'center'}} >
      <Image
        source={Images.logo}
        resizeMode="contain"
        // style={[styles.logo, { height: this.imageHeight }]}
        style={[styles.logo, { width: 200, height: 100 }]}
      />
    </View>
    <CustomerInfoCardContainer />
    {/* <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
      }}
    > */}
    <View style={{ height: "40%" }} />
    <Button
      style={{ width: "85%", margin: "4%" }}
      contentStyle={{ height: 45 }}
      mode="contained"
      onPress={() => {
        concole.log("выход");
      }}
      // loading={requests.isFetching}
    >
      выход
    </Button>

    <View style={styles.bottomContainer}>
      <Text style={styles.bottomText}>Юридические и кадастровые</Text>

      <Text style={styles.bottomText}>услуги в сфере недвижимости</Text>
      <Text style={styles.bottomText}>Оллвин Груп © 2006 – 2019</Text>

      {/* <View style={{ height: "10%", width: "100%" }} /> */}
    </View>
    {/* </View> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  bottomContainer: {
    //flexDirection: "column",
    //justifyContent: "flex-end",
    //alignItems: "center",
    //width: "90%",
    //height: "25%"
    // backgroundColor: green300
  },
  bottomText: {
    textAlign: "center",
    color: "gray",
    fontSize: 12
  }
});
