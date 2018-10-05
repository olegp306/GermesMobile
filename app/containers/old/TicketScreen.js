import React, { Component } from 'react'
import { View,
  DatePickerAndroid,
  DatePickerIOS,
  Alert,
  TouchableOpacity
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import TicketEditor from '../components/TicketEditor'
import * as selectors from '../middleware/redux/selectors'
import { add, dismiss } from '../middleware/redux/actions/Ticket'

const NEW_TICKET_STATUS_ID = '4285215000';
const VISITOR_TICKET_TYPE = '393629542000';
const CAR_TICKET_TYPE = '393629546000';

const headerButtonsHandler = { save: () => null }


@connect(
    store => ({
        employeeId: selectors.getEmployeeId(store),
        companyId: selectors.getCompanyId(store),
        isAdding: selectors.getIsTicketAdding(store),
        added: selectors.getIsTicketAdded(store),
        error: selectors.getIsTicketAddingFailed(store),
        applicant: selectors.getIsApplicant(store),
        companies: selectors.getCompanies(store),
        employees: selectors.getEmployees(store)
    }),
    dispatch => ({
        addTicket: (ticket) => dispatch(add(ticket)),
        dismiss: () => dispatch(dismiss())
    })
)
export default class TicketScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return ({ 
            title: 'Новая заявка',
            headerRight: (
                <View style={{flexDirection: 'row', paddingRight: 7}}>
                    <TouchableOpacity onPress={() => headerButtonsHandler.save()}>
                        <MaterialIcons name='done' size={28} color='#53565A' />
                    </TouchableOpacity>
                </View>
            )
        })
    }

    state = { ticket: null, showCarFields: false }

    componentWillMount() {
        const { showCarFields } = this.props.navigation.state.params
        const { employeeId, companyId } = this.props

        const ticket = {
            visitorFullName: '',
            carModelText: '',
            carNumber: '',
            actualCreationDate: new Date(),
            visitDate: new Date(),
            author: employeeId,
            status: NEW_TICKET_STATUS_ID,
            type: showCarFields ? CAR_TICKET_TYPE : VISITOR_TICKET_TYPE,
            company: companyId
        }

        this.setState({ticket: ticket, showCarFields: showCarFields})
    }
    
    componentDidMount() {
        headerButtonsHandler.save = this.save
    }

    componentWillReceiveProps(newProps) {
        const { added, error } = newProps
        const { goBack } = this.props.navigation

        if (added){
            Alert.alert( '', 'Заявка добавлена успешно',
            [
                {text: 'Закрыть', onPress: () => { goBack() }}
            ])
            this.props.dismiss()
        }

        if (error) {
            Alert.alert( 'Ошибка', 'При сохранении заявки на сервер возникла ошибка.',
            [
                {text: 'Закрыть', onPress: () => { }}
            ])
        }
    }

    save = () => {
        const { ticket } = this.state
        console.log('ticket', ticket)
        this.props.addTicket(ticket)
    }

    updateVisitor = text => {
        const { ticket } = this.state
        ticket.visitorFullName = text
        this.setState({ticket})
    }

    updateCarModel = text => {
        const { ticket } = this.state
        ticket.carModelText = text
        this.setState({ticket})
    }

    updateCarNumber = text => {
        const { ticket } = this.state
        ticket.carNumber = text
        this.setState({ticket})
    }

    updateVisitDate = date => {
        const { ticket } = this.state
        ticket.visitDate = date
        this.setState({ticket})
    }

    updateCompany = company => {
        const { ticket } = this.state
        ticket.company = company.key
        this.setState({ticket}) 
    }

    updateEmployee = employee => {
        const { ticket } = this.state
        ticket.customer = employee.key
        ticket.whoMeets = employee.label
        this.setState({ticket}) 
    }

    render = () => {
        const { ticket, showCarFields } = this.state
        const { isAdding, applicant, employees, companies } = this.props

        return (
            <Loader message='Сохранение' isLoading={isAdding}>
                <TicketEditor
                    ticket={ticket}
                    updateVisitor={this.updateVisitor}
                    updateCarModel={this.updateCarModel}
                    updateCarNumber={this.updateCarNumber}
                    updateVisitDate={this.updateVisitDate}
                    showCarFields={showCarFields}
                    showPickers={applicant}
                    employees={employees.items}
                    companies={companies.items}
                    selectCompany={this.updateCompany}
                    selectEmployee={this.updateEmployee}
                />
            </Loader>
        )
    }
}
