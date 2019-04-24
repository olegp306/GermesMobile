import { DrawerItems } from "react-navigation";

import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import CustomerInfoCardContainer from "../customer/customerInfo/CustomerInfoCardContainer";
import { blue100 } from "../../theme/paperUicolors";

export const CustomerDrawerContentComponent = props => (
  <View style={{ flex: 1 , justifyContent:"space-between"}}>
    {/* <SafeAreaView style={{ flex: 1 ,backgroundColor:blue100}}> */}

    {/* </SafeAreaView> */}
    <Text>боковое меню</Text>
    
    <CustomerInfoCardContainer />
    {/* <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
      }}
    > */}
     
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
