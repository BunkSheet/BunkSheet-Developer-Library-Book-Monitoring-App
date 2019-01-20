import React, { Component } from 'react';
import { Keyboard, Text, View, TextInput, Alert, TouchableWithoutFeedback, Image, KeyboardAvoidingView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class CountScreen extends Component {

    static navigationOptions = {
        title: 'Books Count',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="check" type="font-awesome" size={25} color={tintColor} />;
        }
    }

    constructor(props) {
        super(props);
    
        this.state = {
            errorMessage: '',
            count: 0,
            isAuthenticating: false
        }
    }

    componentDidMount() {
        this.onRefreshPress();
    }

    onRefreshPress = () => {
        const url = `https://mighty-hollows-23016.herokuapp.com/cc/getAllBooksCount`;
        this.setState({ isAuthenticating: true });

      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.setState({
            //data: res.results,
            count: res.count,
            error: res.error || null,
            isAuthenticating: false,
          });
      //this.arrayHolder = res.results;
        })
      .catch(error => {
      this.setState({ error, isAuthenticating: false });
      });
    };

    render() {
        return (
          <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <StatusBar barStyle = "dark-content" hidden = {true} translucent = {true}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerView}>
                    <View style={styles.loginFormView}>
                        <View style={styles.logoImageView}>
                            <Text style={{fontSize:80}}>{this.state.count}</Text>
                        </View>
                        <Text style={styles.infoText}>Books Uploaded Count</Text>
                        <Text style={styles.logoText}>BunkSheet</Text>
                        <ActivityIndicator animating={this.state.isAuthenticating} />
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                        <Button
                            buttonStyle={styles.loginButton}
                            onPress={() => this.onRefreshPress()}
                            title="Refresh Count"
                            ViewComponent={require('expo').LinearGradient}
                            linearGradientProps={{
                                colors: ['#FF6F00', '#FFA000'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        );
    }
}
const styles = {
    containerView: {
        flex: 1,
    },
    logoImageView: { 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        margin: 80,
        marginBottom: 10,
        borderColor: '#F98000'
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginBottom: 30,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 20,
        fontWeight: "200",
        marginBottom: 30,
        textAlign: 'center',
        color:'#F88000'
    },
    logoImage: {
        marginTop: 10,
    },
    loginFormView: {
        justifyContent: 'center',
        flex: 1,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#777777',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
      
    },
    errorMessage: {
        color: 'red',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: '#FF6D00',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15
    },
    signUpButton: {
        backgroundColor: '#FFAB00',
        borderRadius: 5,
        height: 45,
        marginLeft: 15,
        marginRight: 15,
    },
    rectangle: {
        width: 'auto',
        height: 1,
        backgroundColor: 'blue',
        marginTop: 30,
        marginLeft: 120,
        marginRight: 120,
        marginBottom: 30
    }
    
  };

  export default CountScreen;
