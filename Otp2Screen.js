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




  } from 'react-native';
  import NetInfo from "@react-native-community/netinfo";
    import Loader from './Loader.js';
import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
const GLOBAL = require('./Global');

class Otp2Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      otp2:'',
    }
  }


  showLoading() {
  this.setState({loading: true})
 }

  hideLoading() {
  this.setState({loading: false})
 }

  buttonclickotp=()=>{

if (this.state.otp2 == '') {
     alert('Please Enter OTP')
}
else if(this.state.otp2 == GLOBAL.otp2) {

       this.props.navigation.navigate('ChangePassword')
      alert('OTP verified')
} else {
  alert('Invalid OTP')
}
}




   buttonClickListener = () => {
     NetInfo.fetch().then(state => {
  if (state.isConnected == false){
    alert('Please connect to internet')
    return
  }
     })

     this.showLoading()
 fetch('http://pumpfit.in/admin/webservices/forgot_otp', {
method: 'POST',
headers: {
'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
'Content-Type': 'application/json',
},
body: JSON.stringify({

     mobile: GLOBAL.mobile2,


}),
}).then((response) => response.json())
.then((responseJson) => {



  this.hideLoading()
  if (responseJson.status == true ) {



      GLOBAL.otp2 = responseJson.otp



     alert('OTP has been sent to your registered Mobile number')
   // this.props.navigation.navigate('LoginScreen')
  }else {
      alert('Something went wrong')
  }
})
.catch((error) => {
 console.error(error);
});
   }

  render() {
    if(this.state.loading){
            return(
                <Loader>

                </Loader>

            )
        }
    return(
      <View style={{flex:1}}>
      <ImageBackground style={{resizeMode:'contain',height:'100%',width:'100%'}} source={require('./otp.png')}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">

      <Text style={{fontSize:41,fontFamily:'Exo2-Medium',color:'white',width:'65%',alignSelf:'center',textAlign:'center',marginTop:'52%'}}>Verify your</Text>
      <Text style={{fontSize:41,fontFamily:'Exo2-Medium',color:'white',width:'75%',alignSelf:'center',marginTop:-5,textAlign:'center'}}>Mobile Number</Text>

      <View style={{backgroundColor: 'rgba(0,0,0,0.3)',marginLeft:'5%',width:'90%',height:46,borderRadius:10,marginTop:40}}>
            <TextInput
              style={{fontSize:17,fontFamily:'Exo2-Medium',color:'rgba(255, 255, 255, 0.6)',width:'94%',height:46,marginLeft:'3%'}}
              placeholder="Enter Otp"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={(text) => this.setState({otp2: text})}
              value={this.state.otp2}
              />
      </View>

      <Button
        style={{fontSize: 17, color: 'rgba(255, 255, 255, 0.8)',fontFamily:'Exo2-SemiBold'}}
        containerStyle={{alignSelf:'flex-end',marginRight:'5%',marginTop:18}}
        onPress={()=> this.buttonClickListener()}>
        Resend Otp
     </Button>

     <Button
       style={{fontSize: 18, color: '#161718',fontFamily:'Exo2-SemiBold'}}
       containerStyle={{height:50,width:'90%',alignSelf:'center',marginTop:48,borderRadius:10,backgroundColor:'white',justifyContent:'center'}}
       onPress={()=> this.buttonclickotp()}>
       SUBMIT
     </Button>


      </KeyboardAwareScrollView>

     </ImageBackground>
      </View>
    );
  }
}

export default Otp2Screen;
