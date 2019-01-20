import React, { Component } from 'react';
import { View, Keyboard, Text, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

class CountScreen extends Component {

    static navigationOptions = {
      title: 'Books Count',
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="new" type="entypo" size={25} color={tintColor} />;
      }
  }

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                    <Text>HELLO</Text>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

styles={
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'transparent'
      },
}

export default CountScreen;
