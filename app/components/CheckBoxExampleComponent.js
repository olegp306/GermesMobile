import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class CheckBoxExampleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
          <CheckBox
            title='Click Here'
            checked={this.state.checked}
            />

            <CheckBox
            center
            title='Click Here'
            checked={this.state.checked}
            />

            <CheckBox
            center
            title='Click Here'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.checked}
            />

            <CheckBox
            center
            title='Click Here to Remove This Item'
            iconRight
            iconType='material'
            checkedIcon='clear'
            uncheckedIcon='add'
            checkedColor='red'
            checked={this.state.checked}
            />

            {/* <CheckBox
            checkedIcon={<Image source={require('../checked.png') />}
            uncheckedIcon={<Image source={require('../unchecked.png') />}
            checked={this.state.checked}
            onPress={() => this.setState({checked: !this.state.checked})}
            /> */}
      </View>
    );
  }
}
