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
      import NetInfo from "@react-native-community/netinfo";
  import Loader from './Loader.js';
import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const GLOBAL = require('./Global');


class ForgetScreen extends React.Component {
  constructor() {
    super();
     this.state={
        mobile:'',

        loading:'',

       }
     }

     showLoading() {
    this.setState({loading: true})
   }

    hideLoading() {
    this.setState({loading: false})
   }








     getRemoteData = () => {


             NetInfo.fetch().then(state => {
          if (state.isConnected == false){
            alert('Please connect to internet')
            return
          }
             })


       GLOBAL.mobile2 = this.state.mobile

       // alert(GLOBAL.mobile2)


       if (this.state.mobile == '') {
         alert('Please Enter Mobile No.')
       }
       else {

         this.showLoading()
       fetch('http://pumpfit.in/admin/webservices/forgot_otp', {
         method: 'POST',
        headers: {
            'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mobile: GLOBAL.mobile2,

        }),
    }).then((response) => response.json())
        .then((responseJson) => {

                 // alert(JSON.stringify(responseJson))
              this.hideLoading()
            if (responseJson.status == true) {
                 // this.setState({result: responseJson.user_detail })

                 GLOBAL.otp2 = responseJson.otp
                 GLOBAL.userID2 = responseJson.user_id

                //  AsyncStorage.setItem('userID', responseJson.user_id);

                // // AsyncStorage.setItem('image', this.state.results.image);
                // // AsyncStorage.setItem('name', this.state.results.name);
                // // AsyncStorage.setItem('email', this.state.results.email);
                // // AsyncStorage.setItem('mobile', this.state.results.mobile);
                  this.props.navigation.navigate('Otp2Screen')
            }
            else{
                alert('Not a Registered Mobile no.!')
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

          <SafeAreaProvider>

           <View style={{flex:1,backgroundColor:'white'}}>

              <ImageBackground style={{resizeMode:'contain',height:'100%',width:'100%'}} source={require('./login.png')}>

           <KeyboardAwareScrollView keyboardShouldPersistTaps="always">

               <TouchableOpacity style={{alignSelf:'flex-end',marginTop:'15%',marginRight:'5%'}}
                onPress={()=> this.props.navigation.goBack()}>
               <Image style={{height:17,width:17}}
                source={require('./close.png')}/>
               </TouchableOpacity>

               <View style={{flexDirection:'column',alignItems:'center',alignSelf:'center',marginTop:'34%'}}>
               <Text style={{fontSize:42,fontFamily:'Exo2-Medium',color:'white',width:'65%',}}>Forget</Text>
               <Text style={{fontSize:42,fontFamily:'Exo2-Medium',color:'white',width:'65%',marginTop:-10}}>Password?</Text>
               </View>

               <Text style={{fontSize:14,fontFamily:'Exo2-Medium',color:'rgba(255, 255, 255, 0.6)',marginTop:'5%',alignSelf:'center'}}>Don't Worry Just Enter Your Mobile No, And We</Text>
              <Text style={{fontSize:14,fontFamily:'Exo2-Medium',color:'rgba(255, 255, 255, 0.6)',alignSelf:'center'}}>Will Send an OTP to Your Registered No.</Text>


          <View style={{backgroundColor: 'rgba(0,0,0,0.4)',marginLeft:'5%',width:'90%',height:46,borderRadius:10,marginTop:25}}>
           <TextInput
             style={{fontSize:17,fontFamily:'Exo2-Medium',color:'rgba(255, 255, 255, 0.6)',width:'80%',height:46,marginLeft:'3%'}}
             placeholder="Mobile No."
             keyboardType="numeric"
             maxLength={10}

             placeholderTextColor="rgba(255, 255, 255, 0.6)"
             onChangeText={(text) => this.setState({mobile: text})}
             value={this.state.mobile}
             />



           </View>

            <Button
               style={{fontSize: 18, color: '#161718',fontFamily:'Exo2-SemiBold'}}
               containerStyle={{height:50,width:'90%',alignSelf:'center',marginTop:24,borderRadius:10,backgroundColor:'white',justifyContent:'center'}}
               onPress={()=>this.getRemoteData()}>
               SUBMIT
             </Button>


           </KeyboardAwareScrollView>

              </ImageBackground>

           </View>
          </SafeAreaProvider>

      );
  }
}

export default ForgetScreen;
