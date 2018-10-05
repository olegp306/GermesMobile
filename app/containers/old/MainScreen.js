import React, { Component } from 'react'
import { View, Text, Alert, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import MainScreen from '../components/MainComponent'
import fetchCompanies from '../middleware/redux/actions/Companies'
import fetchEmployees from '../middleware/redux/actions/Employees'
import { getIsApplicant } from '../middleware/redux/selectors'


@connect(
    store => ({ applicant: getIsApplicant(store) }), 
    { fetchCompanies, fetchEmployees }
)
export default class MainScreenContainer extends Component {
    static navigationOptions = ({navigation}) => {
        return ({ 
            title: 'БЦ Жуков'
        })
    }

    componentDidMount() {
        this.props.fetchCompanies()
        this.props.fetchEmployees()
    }

    render = () => {
        const { navigate } = this.props.navigation

        return (
            <View>
                <StatusBar barStyle='dark-content' />
                <MainScreen
                    addVisitTicket={() => navigate('Ticket', { showCarFields: false })}
                    addCarTicket={() => navigate('Ticket', { showCarFields: true })}
                    openTickets={() => navigate('Tickets')}
                    openEvents={() => Alert.alert( 'Внимание', 'Функционал событий находится на стадии разработки', [ {text: 'Закрыть', onPress: () => { }} ])}
                    showOnlyAdds={this.props.applicant}
                />
            </View>
        )
    }
}