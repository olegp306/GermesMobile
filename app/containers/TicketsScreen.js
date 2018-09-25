import React, { Component } from 'react'
import { View, Alert, TouchableOpacity, Keyboard } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'

import TicketsList from '../components/TicketsList'
import { Metrics } from '../theme'
import { fetch } from '../middleware/redux/actions/Tickets'
import { update, dismiss } from '../middleware/redux/actions/Ticket'
import { getTickets, getTicket } from '../middleware/redux/selectors'
import Loader from '../components/Loader'

const headerButtonsHandler = { 
    refresh: () => null,
    search: () => null
}
const CAME_STATUS_ID = '421575460000'
const WENT_STATUS_ID = '421575453000'

@connect(
    store => ({
        tickets: getTickets(store),
        ticket: getTicket(store)
    }),
    { fetch, update, dismiss }
)
export default class TicketsScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return ({ 
            title: 'Заявки',
            headerRight: (
                <View style={{flexDirection: 'row', paddingRight: 7}}>
                    <TouchableOpacity onPress={() => headerButtonsHandler.refresh()}>
                        <MaterialIcons name='autorenew' size={28} color='#53565A' />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 14, marginRight: 10}} onPress={() => headerButtonsHandler.search()}>
                        <MaterialIcons name='search' size={28} color='#53565A' />
                    </TouchableOpacity>
                </View>
            )
        })
    }

    state = {
        items: [],
        filter: null,
        searchBarIsShown: false
    }

    componentDidMount () {
        headerButtonsHandler.search = this._handleShowSearchBarClick
        headerButtonsHandler.refresh = this._handleRefreshClick
        this.props.fetch()
    }

    componentWillReceiveProps (nextProps) {
        const { items } = nextProps.tickets
        this.setState({ items: items.slice(0, 500) })

        const { updated } = nextProps.ticket
        if (updated) {
            Alert.alert( 'Внимание', 'Статус заявки успешно изменен', [ 
                {text: 'Закрыть', onPress: () => { 
                    this.props.dismiss() 
                    this.props.fetch()
                }} 
            ])
        }
    }

    _handleRefreshClick = () => {
        this._handleHideSearchBarClick()
        this.props.fetch()
    }

    _handleShowSearchBarClick = () => {
        const { searchBarIsShown } = this.state
        if (!searchBarIsShown)
          this.setState({searchBarIsShown: true})
    }
    
    _handleHideSearchBarClick = () => {
        this.setState({searchBarIsShown: false})
        Keyboard.dismiss()    
    }
    
    _handleSearchTextChanged = (text) => {
        const filter = text.toLowerCase()
        this.setState({filter})
    }

    handleChangeStatus = (item) => {
        if (item.status.id === '421575460000')
            item.status = { id: WENT_STATUS_ID }
        else item.status = { id: CAME_STATUS_ID }

        this.props.update(item)
    }

    render() {
        const { items, searchBarIsShown, filter } = this.state
        const { isFetching, fetched } = this.props.tickets

        const filtered = filter ? 
            items.filter((item) => {
                return 
                    item.carNumber && item.carNumber.toLowerCase().includes(filter) ||
                    item.carModelText && item.carModelText.toLowerCase().includes(filter) ||
                    item.visitorFullName && item.visitorFullName.toLowerCase().includes(filter)
            })
            : items

        return (
            <View style={{flex: 1}}>
                {
                    searchBarIsShown && 
                    <SearchBar
                        lightTheme
                        clearIcon={{color: '#53565A', name: 'close'}}
                        inputStyle={{backgroundColor: 'white', fontSize: 20}}
                        containerStyle={{backgroundColor: '#C9C8C7', height: Metrics.navBarHeight, width: '100%', marginTop: -1}}
                        onChangeText={this._handleSearchTextChanged}
                        onClearText={this._handleHideSearchBarClick}
                        placeholder='Поиск...' />
                }
            
                <Loader message='Обновление заявок' isLoading={isFetching}>
                    <TicketsList 
                        shouldRefreshList={fetched}
                        items={filtered}
                        handleSwipeoutAction={this.handleChangeStatus} />
                </Loader>
            </View>
        )
    }
}