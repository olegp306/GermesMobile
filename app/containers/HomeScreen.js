import React, { Component } from 'react';
import { View, Text, Button, StyleSheet,Image } from 'react-native';
import { Colors, Images, Metrics } from '../theme';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
  
    // static navigationOptions=({navigation})=>{
    //     let headerTitle='Main';
    //     let headerTitleStyle={color:'red'};

    //     return{headerTitle, headerTitleStyle};
    // }


  render() {
    return (
        
      <View style={styles.screenContainer}>
        <View style={styles.logoContainer}>
                    <Image
                        source={Images.logo}
                        resizeMode='contain'
                        style={styles.logo}
                    />
        </View>
        
        <View style={styles.contentContainer}>
            
            <View >            
                <Button style={styles.buttonContainer}
                title="Вход"
                onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>

         <View>
         {/* <Text>Список Заявок с фильтром</Text> */}
         <Button
           title="Список Заявок с фильтром"
           onPress={() => this.props.navigation.navigate('RequestList')}
         />
         </View>

        <View>
         {/* <Text>Комментарий по заявке</Text> */}
         <Button
           title="Комментарий по заявке"
           onPress={() => this.props.navigation.navigate('AddComment')}
         />
         </View>


         <View>
         {/* <Text>Сканер</Text> */}
         <Button
           title="Сканер"
           onPress={() => this.props.navigation.navigate('BarCodeScanner')}
         />
         </View>        


         {/* <Text> Уведомить офис о получении документов</Text> */}
         <Button
           title="Уведомить офис о получении документов "
           onPress={() => this.props.navigation.navigate('NorifyOffice')}
         />

         {/* <Text> Уведомить офис о получении документов</Text> */}
         <Button
           title="CheboxTest"
           onPress={() => this.props.navigation.navigate('CheckBoxExample')}
         />


        
         {/* <LoginComponent /> */}
         {/* <RequestListComponent /> */}
         {/* <NorifyOfficeComponent /> */}
         {/* <BarCodeScannerScreen /> */}
         {/* <AddCommentScreen /> */}
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

    buttonContainer:{
        height: 100,
        
        marginTop:15
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
