import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    Image,
    Button,
    TouchableOpacity,
    Keyboard,
    CheckBox,
    KeyboardAvoidingView
} from 'react-native';

//import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors, Images, Metrics } from '../theme';


export default class LoginComponent extends Component {
    state = { user: '', password: '', remember: false}

    render = () => {
        //const { user, password, remember } = this.state
        //const { isLogging } = this.props.session

        return (
            <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={-65}
      >
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
                        <View style={styles.inputFieldContainer}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name='person' size={28} color='#53565A' />
                            </View>

                            <View style={styles.verticalDivider} />

                            <TextInput
                                style={styles.input}
                                // onChange={e => this.props.changeUser(e.nativeEvent.text)}
                                autoCapitalize='none'
                                placeholder='Введите имя пользователя'
                                value={this.props.user}
                                disabled={this.props.disabled}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                            />
                        </View>

                        <View style={styles.horizontalDivider} />

                        <View style={styles.inputFieldContainer}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name='lock' size={26} color='#53565A' />
                            </View>

                            <View style={styles.verticalDivider} />

                            <TextInput
                                style={styles.input}
                                // onChange={e => this.props.changePassword(e.nativeEvent.text)}
                                autoCapitalize='none'
                                placeholder='Введите пароль '
                                autoCorrect={false}
                                value={this.props.password}
                                disabled={this.props.disabled}
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                            />
                        </View>

                        <TouchableOpacity style={styles.forgotContainer}>
                            <Text style={styles.forgotText}>Забыли пароль?</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        this.props.disabled ?
                        (
                            <View style={{ alignSelf: 'center' }}>
                                <ActivityIndicator size='large' color='#627ab4' />
                            </View>
                        ) : null
                    }

                    <View style={styles.enterContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                Keyboard.dismiss();
                                // this.props.logIn();
                            }}
                            >
                            <View style={styles.enterButton}>
                                <Text style={styles.enterText}>Войти</Text>
                            </View>
                        </TouchableOpacity>
                        <Text>Здесь чекбокс</Text>
                        <CheckBox
                            title='Запомнить меня'
                            onPress={this.props.changeRemember}
                            containerStyle={styles.checkboxContainer}
                            textStyle={styles.checkboxText}
                            checkedColor='black'
                            checked={this.props.remember}
                        />
                    </View>
                </View>
            


            </View>
            </KeyboardAvoidingView>
        )
    }   

};
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
