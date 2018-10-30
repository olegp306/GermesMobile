import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, StackActions  } from 'react-navigation'
//import OneSignal from 'react-native-onesignal'

import { login } from '../middleware/redux/actions/Session'
import { getSession } from '../middleware/redux/selectors'
import { storeCredentials, loadCredentials } from '../middleware/utils/AsyncStorage'

import LoginComponent from '../components/LoginComponent'


const mapStateToProps = store => {   
    return {
        session: store.session.toJS(),                
  }
}

 const mapDispatchToProps = dispatch =>{
     return {
         loginAction: (user, password) => dispatch(login(user, password))
        }
 } 
@connect( mapStateToProps, mapDispatchToProps )
export default class LoginScreen extends Component {
    state = { user: '', password: '', remember: false}

    componentDidMount = async () => {
        console.log('LoginScreen componentDidMount');
        const { remember, user, password } = await loadCredentials()
        if (remember && user && password)
            this.setState({remember, user, password})
    }

    componentWillReceiveProps = async (nextProps) => {
        console.log('LoginScreen componentWillReceiveProps');
        const { logged, error, userId, roles } = nextProps.session
        const { dispatch } = this.props.navigation
    
        if (logged) {
            console.log('LoginScreen componentWillReceiveProps logged=' + logged);
            const { remember, user, password } = this.state
            
            if (remember)
                await storeCredentials(user, password)      
        
            //OneSignal.configure({})
            //OneSignal.sendTag('userId', userId)
            
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'RequestList'})
                ],
                key: null
            })
            dispatch(resetAction)
        }

        if (error) {
            Alert.alert( 'Ошибка', error, [ {text: 'Закрыть', onPress: () => { }} ])
        }
    }

    _handleUserChange = (user) => this.setState({user})

    _handlePasswordChange = (password) => this.setState({password})

    _handleRememberChange = () => {
        const { remember } = this.state
        this.setState({remember: !remember})
    }

    _handleLogInClick = () => {
        console.log("_handleLogInClick");
        const { user, password } = this.state
        if (!user || !password)
            Alert.alert( 'Ошибка', 'Необходимо заполнить имя пользователя и пароль', [ {text: 'Закрыть', onPress: () => { }} ])
        else this.props.loginAction(user, password);
    }

    _quickLogIn=()=>{
        this.props.loginAction('psnapi', 'iRo0e0CCFkxjVLQ');
    }

    render = () => {
        const { user, password, remember } = this.state
        const { isLogging } = this.props.session

        return (
            <LoginComponent
                user={user}
                password={password}
                disabled={isLogging}
                remember={remember}
                changeUser={this._handleUserChange}
                changePassword={this._handlePasswordChange}
                changeRemember={this._handleRememberChange}
                logIn={this._handleLogInClick}
                quickLogIn={this._quickLogIn}
            />
        )
    }
}