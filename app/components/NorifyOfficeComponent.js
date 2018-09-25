import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import { Colors, Images, Metrics } from '../theme';
import RequestListComponent from './RequestListComponent.js';

export default class NorifyOfficeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.screenContainer}>
      
        <Text> NorifyOfficeComponent </Text>

        <RequestListComponent/>
        <View style={styles.enterContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss();
                                this.props.logIn();
                            }}
                            >
                            <View style={styles.enterButton}>
                                <Text style={styles.enterText}>Отправит данные о полученных документах</Text>
                            </View>
                        </TouchableOpacity>                        
                    </View>

       
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
  logoContainer: {
      width: '100%',
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center'
  },
  logo: {
      width: 250
  },
  contentContainer: {
      height: '45%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch'
  },
  inputsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      width: Metrics.screenWidth
  },
  inputFieldContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '94%',
      height: 50,
      backgroundColor: 'white',
      borderRadius: 7
  },
  iconContainer: {
      width: 45,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
  },
  verticalDivider: {
      width: 1,
      height: '100%',
      backgroundColor: '#f6f6f6'
  },
  input: {
      width: Metrics.screenWidth - 80,
      height: 50,
      marginLeft: 7,
      marginTop: 1,
      textAlignVertical: 'center',
      fontSize: 17,
      color: 'gray'
  },
  horizontalDivider: {
      height: 5
  },
  forgotContainer: {
      alignSelf: 'flex-end'
  },
  forgotText: {
      fontSize: 12,
      fontStyle: 'italic',
      textAlign: 'right',
      paddingRight: 15,
      color: 'gray'
  },
  enterContainer: {
      alignItems: 'center'        

  },
  enterButton: {
      justifyContent: 'center',
      backgroundColor: '#53565A',
      minWidth: 245,
      minHeight: 45,
      borderRadius: 30,
      
  
  },
  enterText: {
      fontSize: 24,
      textAlign: 'center',
      color: 'white',
      margin: 5
  },
  checkboxContainer: {
      backgroundColor: 'transparent',
      borderWidth: 0
  },
  checkboxText: {
      fontSize: 14,
      fontWeight: 'normal'
  }
});
