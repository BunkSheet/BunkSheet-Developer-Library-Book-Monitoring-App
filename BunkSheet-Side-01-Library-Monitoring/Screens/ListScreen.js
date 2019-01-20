import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, KeyboardAvoidingView, FlatList, Image, Keyboard, TextInput, StyleSheet, StatusBar, TouchableWithoutFeedback, ActivityIndicator, Modal, Text, ScrollView } from 'react-native';
import { Header, ListItem, Icon, Button } from 'react-native-elements';
import { LinearGradient, Notifications } from 'expo';

class ListScreen extends Component {

  static navigationOptions = {
    title: 'Books List',
    tabBarIcon: ({ tintColor }) => {
        return <Icon name="list-alt" type="font-awesome" size={25} color={tintColor} />;
    }
}

    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          searchLoad: false,
          searchBarText: '',
          searchBarTextTouched: false,
          data:[],
          error: '',
          modalVisible:false,
          bookSelected:[],
          noticeBadgeCount: 0,
          animation: null,
        }

        this.arrayHolder = [];
    }

    componentDidMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = `https://mighty-hollows-23016.herokuapp.com/cc/getAllBooks`;
        this.setState({ loading: true });
    
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              //data: res.results,
              data: res,
              error: res.error || null,
              loading: false,
            });
            this.arrayHolder = res;
            //this.arrayHolder = res.results;
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };

    onSearchTextChange(text) {
      //text=text.trim();
      this.setState({
        searchBarText: text,
        searchBarTextTouched: true,
        searchLoad: true
      });
      console.log("All Books Array Holder: " + this.arrayHolder);
      const newData = this.arrayHolder.filter(item => {
        const itemData = `${item.data.volumeInfo.authors[0].toUpperCase()} ${item.data.volumeInfo.publisher.toUpperCase()} ${item.data.volumeInfo.title.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        data: newData,
        searchLoad: false
      });
    }

    modifySearchBar = () => {
        return (
          <TextInput
            ref="searchBarInput"
            autoCapitalize = 'none'
            underlineColorAndroid="transparent" 
            placeholder="Find me a Book ..." 
            placeholderTextColor="#616161" 
            style={styles.searchBarTextInput}
            onChangeText={(text) => this.onSearchTextChange(text)}
            value={this.state.searchBarText}
          />
        );
    }

    clearSearchText() {
      Keyboard.dismiss();
      this.setState({
        searchBarText: '',
        searchBarTextTouched: false,
        searchLoad: false
      });
      this.onSearchTextChange("");
    }

    crossIconFunctionality = () => {
      if (this.state.searchBarTextTouched) {
        return (
          <View style={{marginRight: 5, alignContent:'center'}}>
            <Icon name='cross' type='entypo' color='#FF8F00' onPress={() => this.clearSearchText() } underlayColor={'#64b5f6'}/>
          </View>
        );
      }
    }
    
    focusTextInput() {
      this.refs.searchBarInput.focus();
    }

    searchIconFunctionality = () => {
      return (
        <View style={{marginLeft: 15, marginRight: 10, alignContent:'center'}}>
          <Icon name='magnifying-glass' type='entypo' color='#FF8F00' onPress={() => this.focusTextInput()} />
        </View>
      );
    }

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            backgroundColor: '#CED0CE',
            marginLeft: '3%',
            marginRight: '3%',
          }}
        />
      );
    };

  renderList = () => {
    return (
        <ScrollView>
          <FlatList
            keyboardShouldPersistTaps='always'
            data={this.state.data}
            renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.data.volumeInfo.title}
              titleStyle = {{fontWeight: "bold"}}
              subtitle={`${item.data.volumeInfo.authors}`}
              containerStyle={{ borderBottomWidth: 0 }}
              chevron
              chevronColor='#CED0CE'
              />
            )}
            keyExtractor={item => item._id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            //ListHeaderComponent={this.renderHeader}
          />

        </ScrollView>
    );
  }

  renderHeader = () => {
    return(
      <Header
        backgroundColor="#FF6D00"
        outerContainerStyles={{borderBottomWidth: 0.5, borderColor: '#000000'}}
        centerComponent={{ text: 'BunkSheet', style: { color: '#fff',fontSize: 26, fontWeight: 'bold', marginBottom: 0, marginTop: 10 } }}
        //rightComponent={this.renderRightComponent()}
        //leftComponent={{ icon: 'barcode', type: 'font-awesome', color: '#fff', onPress: () => this.toBarCodeScannerScreen(), size: 30, underlayColor:'#64b5f6' }}
      />
    );
  }
    render() {
        if (this.state.loading){
            return (
                <ActivityIndicator size='large' animating={this.state.loading}/>
            );
        }
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                        {this.renderHeader()}

                        <View style={styles.sectionStyle}>
                          {this.searchIconFunctionality()}
                          {this.modifySearchBar()}
                          {this.crossIconFunctionality()}
                        </View>
                        {this.renderList()}

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
      } 
  }


const styles = StyleSheet.create({
  container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    searchBarTextInput: {
      flex: 1
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F57C00',
    height: 35,
    borderRadius: 15,
    margin: 5
  },
  
  //Animation Styles
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },

  //Modals Styles
  popup: {
    backgroundColor: 'white',
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height:"80%",
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: 'row',
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent:'center'
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose:{
    flex: 0.5,
    backgroundColor:'#EF6C00',
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  modalInfo:{
    alignItems:'center',
    justifyContent:'center',
  },
  image:{
    width:120,
    height:120,
    borderRadius:40,
    marginTop: 10
  },
  name:{
    fontSize:22,
    flex:1,
    alignSelf:'center',
    textAlign: 'center',
    justifyContent: 'center',
    color:"#FF3D00",
    fontWeight:'bold',
    marginTop: 10,
  },
  author:{
    fontSize:16,
    flex:1,
    alignSelf:'center',
    color:"#696969",
    marginTop: 5
  },
  publisher:{
    fontSize:16,
    flex:1,
    alignSelf:'center',
    color:"#696969",
  },
  about:{
    marginHorizontal:10,
    marginTop: 10
  },
  pageCount: {
    marginTop:20,
    marginLeft: 10,
    flex: 1,
    color: '#311B92'
  },
  notAvailable: {
    marginTop:20,
    marginRight: 20,
    color: 'red',
    flex: 1,
    textAlign: 'right'
  },
  available: {
    marginTop:20,
    marginRight: 20,
    color: 'green',
    flex: 1,
    textAlign: 'right'
  },
  txtClose: {
    alignContent: 'center',
    justifyContent:'center',
    color: '#FFFFFF',
    fontSize: 18,
    padding: 0
  }

});

export default ListScreen;