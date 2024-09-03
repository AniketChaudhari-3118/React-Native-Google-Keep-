
import React,{Component} from 'react';
import {
  Button,
  Text,
  TextInput,
  View
} from 'react-native';

class Student extends Component {
  render() {
    return (
      <View>
        <Text style = {{fontSize: 30, textAlign: 'center', color: 'green'}}>Student name is: {this.props.name}</Text>
      </View>
    )
  }
}


export default Student;