import React, { Fragment } from "react";
import Icon from "./_laska_/Icon";
import { Image, View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  s28cd93f9: {
    width: 40,
    height: 40
  },
  scf3739e1: {
    fontSize: 20
  },
  sb4931c11: {
    color: `rgba(120, 120, 120, 1)`
  },
  s8dacd705: {
    width: `95%`,
    alignItems: `center`,
    backgroundColor: `rgba(250, 246, 246, 1)`,
    borderWidth: 0,
    borderRadius: 5,
    flexDirection: `row`,
    shadowOpacity: 1,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  s389e4eaf: {
    flex: 3,
    alignItems: `center`,
    justifyContent: `center`
  },
  s8f5f2cb3: {
    flex: 5,
    alignItems: `center`
  },
  s0cd33123: {
    justifyContent: `space-between`,
    flex: 1
  }
});

class HelloWorld extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <View style={styles.s0cd33123}>
          <View style={styles.s389e4eaf}>
            <View style={styles.s8dacd705}>
              <View>
                <Icon iconIdentifier={`Entypo/user`} style={styles.s28cd93f9} />
                <Image />
              </View>
              <View>
                <Text style={styles.scf3739e1}>Фортуна Марина Сергеевна</Text>
                <Text style={styles.sb4931c11}>Центр-Инвест</Text>
              </View>
            </View>
          </View>
          <View style={styles.s8f5f2cb3}>
            <Text>middle</Text>
          </View>
        </View>
      </Fragment>
    );
  }
}

HelloWorld.defaultProps = {};

export default HelloWorld;

export { styles };
