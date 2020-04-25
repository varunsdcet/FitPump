import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,




  } from 'react-native';
  import {
  NavigationContainer,
  CommonActions,
} from '@react-navigation/native';
  import Loader from './Loader.js';
    import NetInfo from "@react-native-community/netinfo";
import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
const GLOBAL = require('./Global');

class ChangedPassword extends React.Component {
  constructor() {
    super();
     this.state={

        phone:'',
        hidePassword1: true,
        hidePassword3: true,
        password2:'',
        password3:'',
        loading:''
     }
  }

        showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

  managePasswordVisibility1 = () => {
     this.setState({ hidePassword1: !this.state.hidePassword1 });
      }




    managePasswordVisibility3 = () => {
     this.setState({ hidePassword3: !this.state.hidePassword3 });
      }

      buttonClickListener = () =>{


        NetInfo.fetch().then(state => {
     if (state.isConnected == false){
       alert('Please connect to internet')
       return
     }
        })
     if (this.state.password2 == ''){
       alert('Please Enter New Password')
     }

     else if (this.state.password3 == ''){
       alert('Confirm Your Password')
     }

     else if (this.state.password3 != this.state.password2){
       alert('Confirm Password should match New Password')
     }

     else {

       this.showLoading()
   fetch('http://pumpfit.in/admin/webservices/forgot', {
method: 'POST',
headers: {
  'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
  'Content-Type': 'application/json',
},
body: JSON.stringify({

       user_id: GLOBAL.userID2,

       new_password:  this.state.password2,
       confirm_password:  this.state.password3,

}),
}).then((response) => response.json())
 .then((responseJson) => {



    this.hideLoading()
    if (responseJson.status == true ) {


alert('Your Password Change Successfully')


    // alert('Password Successfully Changed')
     this.props.navigation.dispatch(
           CommonActions.reset({
             index: 1,
             routes: [
               {
                 name: 'LoginScreen',
                 params: { user: 'jane', key: this.props.route.key },
               },
               { name: 'LoginScreen' },
             ],
           })
         )
  //    this.props.navigation.navigate('LoginScreen')


    }else {
        alert('Details have already been Registered.')
    }
 })
 .catch((error) => {
   console.error(error);
 });
       }


      }


  render() {
    if(this.state.loading){
            return(
                <Loader>

                </Loader>

            )
        }
    return(
      <View style={{flex:1,backgroundColor:'transparent'}}>
      <ImageBackground style={{resizeMode:'contain',height:'100%',width:'100%'}} source={require('./signup.png')}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">


      <Text style={{fontSize:42,fontFamily:'Exo2-Medium',color:'white',width:'65%',alignSelf:'center',textAlign:'center',marginTop:'50%'}}>Change Your</Text>
      <Text style={{fontSize:42,fontFamily:'Exo2-Medium',color:'white',width:'65%',alignSelf:'center',textAlign:'center',marginTop:-8}}>Password</Text>

      <View style={{backgroundColor: 'rgba(0,0,0,0.3)',marginLeft:'5%',width:'90%',height:46,borderRadius:10,marginTop:26,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <TextInput
              style={{fontSize:17,fontFamily:'Exo2-Medium',color:'rgba(255, 255, 255, 0.6)',width:'80%',height:46,marginLeft:'3%'}}
              placeholder="New Password"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              secureTextEntry={this.state.hidePassword1}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({password2: text})}
              maxLength={50}
              value={this.state.password2}
              />

              <TouchableOpacity style={{marginRight:18}}
           onPress = { this.managePasswordVisibility1 }>
         <Image
           style={{height:23,width:23,resizeMode:'contain'}}
           source={(this.state.hidePassword1) ?   require('./hide1.png') : require('./show1.png') }
          />
          </TouchableOpacity>
      </View>





      <View style={{backgroundColor: 'rgba(0,0,0,0.3)',marginLeft:'5%',width:'90%',height:46,borderRadius:10,marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <TextInput
              style={{fontSize:17,fontFamily:'Exo2-Medium',color:'rgba(255, 255, 255, 0.6)',width:'80%',height:46,marginLeft:'3%'}}
              placeholder="Confirm Password"
              secureTextEntry={this.state.hidePassword3}
              keyboardType="numeric"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"

              maxLength={30}
              onChangeText={(text) => this.setState({password3: text})}
              value={this.state.password3}
              />

         <TouchableOpacity style={{marginRight:18}}
           onPress = { this.managePasswordVisibility3 }>
         <Image
           style={{height:23,width:23,resizeMode:'contain'}}
           source={(this.state.hidePassword3) ?   require('./hide1.png') : require('./show1.png') }
          />
          </TouchableOpacity>
      </View>



      <Button
        style={{fontSize: 18, color: '#161718',fontFamily:'Exo2-SemiBold'}}
        containerStyle={{height:50,width:'90%',alignSelf:'center',marginTop:32,borderRadius:10,backgroundColor:'white',justifyContent:'center'}}
        onPress={()=>this.buttonClickListener()}>
        CHANGE PASSWORD
      </Button>




      </KeyboardAwareScrollView>
      </ImageBackground>
      </View>
    );
  }
}

export default ChangedPassword;
