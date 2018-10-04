import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Button} from 'react-native';
import { Colors, Images, Metrics } from '../theme';
import RequestListComponent from './RequestListComponent';

import testData from '../middleware/TestData.json';

export default class NorifyOfficeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.requestsContainer}>
            <Text> NorifyOfficeComponent </Text>
            <RequestListComponent requests={testData.requests} />
            </View>
            <Button
                    title=" Уведомить офис о полученных документах111 "
                    buttonStyle={{width: 300,height:145}} 
                    onPress={() => this.props.navigation.navigate('Home')}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: Colors.backgroundColor
  },
  requestsContainer: {
      width: '100%',
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center'
  }
  
});
