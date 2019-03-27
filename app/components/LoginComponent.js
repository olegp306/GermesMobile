import React, { Component } from 'react';
import {
   
    TextInput,    
    Button,
    Checkbox,
    Paragraph,
    TouchableRipple,
    Text
    
} from 'react-native-paper';

import {
    StyleSheet,
    // Text,
    View,
    // TextInput,
    ActivityIndicator,
    Image,
    // Button,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import { withTheme } from 'react-native-paper';

// import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors, Images, Metrics } from '../theme';

class LoginComponent extends Component {
    render() {
        return (
            <KeyboardAvoidingView
                behavior='padding'>
                <View style={styles.screenContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={Images.logo}
                            resizeMode='contain'
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.inputsContainer}>
                            <TextInput
                                style={styles.input}
                                //mode= 'outlined'
                                onChange={e => this.props.changeUser(e.nativeEvent.text)}
                                autoCapitalize='none'
                                label='Имя пользователя'
                                value={this.props.user}
                                disabled={this.props.disabled}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                            />
                            
                            <TextInput
                                style={styles.input}                            
                                onChange={e => this.props.changePassword(e.nativeEvent.text)}
                                autoCapitalize='none'
                                label='Пароль'
                                autoCorrect={false}
                                value={this.props.password}
                                disabled={this.props.disabled}
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                            />
                            
                        </View>
                        {
                            this.props.disabled ?
                            (
                                <View style={{ alignSelf: 'center' }}>
                                    <ActivityIndicator size='large' color='#627ab4' />
                                </View>
                            ) : null
                        }
                    
                    <View style={{height:'5%'}}></View>
                    <View style={styles.enterContainer}>
                        <TouchableRipple  
                            style={{width:'100%'}}  
                            onPress={() => {
                                        Keyboard.dismiss();
                                        this.props.logIn();
                                    }} >
                            <Button 
                                style={{width:'100%'}}                        
                                mode="contained" 
                                onPress={() => {
                                        Keyboard.dismiss();
                                        this.props.logIn();
                                    }}>
                                Войти
                            </Button>
                        </TouchableRipple>                      

                        <TouchableRipple
                                onPress={this.props.changeRemember}
                                >
                                <View style={styles.row}>
                                    
                                    <View pointerEvents="none">
                                        <Checkbox
                                            status= { this.props.remember ? 'checked' : 'unchecked' }
                                            onPress={this.props.changeRemember}
                                        />
                                    </View>
                                    <Text style={styles.rememberMeLabelStyle}>Запомнить меня</Text>
                                </View>
                        </TouchableRipple>

                    </View>
                    </View>
                 </View>
            </KeyboardAvoidingView>
        );
    }
}

export default withTheme (LoginComponent);

const styles = StyleSheet.create({
    screenContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.baseBackgroundColor
    },
    logoContainer: {
        width: '100%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 250
    },
    contentContainer: {
        width:'85%',
        height: '75%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    
    inputsContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',       
    },
    
    input: {
        width: '100%',
        backgroundColor: "white"
    },
    
    enterContainer: {      
        alignItems: 'center', 
    }, 
   
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',      
      },
      rememberMeLabel:{
        color:'gray'        
      }
});
