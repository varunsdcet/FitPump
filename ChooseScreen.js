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
  import Loader from './Loader.js';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');

 class ChooseScreen extends React.Component {
   constructor(props){
     super(props);

       this.state={
           isSelected_male:0,
           isSelected_female:0,
           text:'',
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
//http://139.59.76.223/gym/webservices
//http://pumpfit.in/admin/webservices
      this.showLoading()
      fetch('http://pumpfit.in/admin/webservices/signUp', {
        method: 'POST',
       headers: {
           'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           name: GLOBAL.username,
           email: GLOBAL.email,
           mobile: GLOBAL.mobile,
           password: GLOBAL.password,
           gender: this.state.text,
           device_id: 'sdf',
           device_type: Platform.OS,
           device_token: 'dsfdsf',
           model_name: 'sdf',

       }),
   }).then((response) => response.json())
       .then((responseJson) => {


              this.hideLoading()
            if (responseJson.status == true) {




              GLOBAL.user_id = responseJson.user.toString()


               AsyncStorage.setItem('userID', responseJson.user.toString());

              // AsyncStorage.setItem('image', this.state.results.image);
              // AsyncStorage.setItem('name', this.state.results.name);
              // AsyncStorage.setItem('email', this.state.results.email);
              // AsyncStorage.setItem('mobile', this.state.results.mobile);
              this.props.navigation.navigate('Tab')
           }
           else{

               alert(responseJson.message)
           }
       })
       .catch((error) => {
           console.error(error);
       });




}


   firstChangeMale=()=> {
     this.setState({ isSelected_male: 1 })
     this.setState({ text: 'male' })
     this.setState({ isSelected_female: 0 })

   }

   secondChangeMale=()=> {
     this.setState({ isSelected_male: 0 })
   }

   firstChangeFemale=()=> {
     this.setState({ isSelected_female: 1 })
     this.setState({ text: 'female' })
     this.setState({ isSelected_male: 0 })
   }

   secondChangeFemale=()=> {
     this.setState({ isSelected_female: 0 })
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
       <ImageBackground style={{resizeMode:'contain',height:'100%',width:'100%'}} source={require('./choose.png')}>
           <View style={{flex:3}}>
           </View>
           <View style={{flex:4}}>
           <Text style={{fontSize:41,fontFamily:'Exo2-Medium',color:'white',alignSelf:'center',marginTop:3}}>Select Gender</Text>

           <View style={{flexDirection:'row',width:'58%',height:99,alignItems:'center',justifyContent:'space-between',alignSelf:'center',marginTop:65}}>

             {this.state.isSelected_male == 0 &&  (

              <TouchableOpacity style={{borderRadius:43.5,marginLeft:6}} onPress={()=>this.firstChangeMale()}>
                <View style={{height:87,width:87,borderRadius:43.5,alignItems:'center',backgroundColor:'#5836FF'}}>
                 <Image source={require('./male.png')}
                 style={{height:24,width:24,resizeMode:'contain',marginTop:15}}/>
                 <Text style={{fontSize:15,fontFamily:'Exo2-Regular',color:'rgba(255, 255, 255, 0.7)',marginTop:6}}>MALE</Text>
                </View>

              </TouchableOpacity>

             )}

             {this.state.isSelected_male == 1 &&  (


               <TouchableOpacity style={{borderRadius:49.5}} onPress={()=>this.secondChangeMale()}>
               <View style={{height:99,width:99,borderRadius:49.5,borderWidth:1,borderColor:'#5836FF80',justifyContent:'center',backgroundColor:'transparent'}}>
                 <View style={{height:87,width:87,borderRadius:43.5,alignItems:'center',backgroundColor:'#5836FF',alignSelf:'center'}}>
                  <Image source={require('./male.png')}
                  style={{height:24,width:24,resizeMode:'contain',marginTop:15}}/>
                  <Text style={{fontSize:15,fontFamily:'Exo2-Regular',color:'rgba(255, 255, 255, 0.7)',marginTop:6}}>MALE</Text>
                 </View>

                </View>
               </TouchableOpacity>
             )}


             {this.state.isSelected_female == 0 &&  (

              <TouchableOpacity style={{borderRadius:43.5,marginRight:6}} onPress={()=>this.firstChangeFemale()}>
                <View style={{height:87,width:87,borderRadius:43.5,alignItems:'center',backgroundColor:'#7E274A'}}>
                 <Image source={require('./female.png')}
                 style={{height:26,width:17,resizeMode:'contain',marginTop:15}}/>
                 <Text style={{fontSize:15,fontFamily:'Exo2-Regular',color:'rgba(255, 255, 255, 0.7)',marginTop:6}}>FEMALE</Text>
                </View>

              </TouchableOpacity>

             )}

             {this.state.isSelected_female == 1 &&  (


               <TouchableOpacity style={{borderRadius:49.5}} onPress={()=>this.secondChangeFemale()}>
               <View style={{height:99,width:99,borderRadius:49.5,borderWidth:1,borderColor:'#7E274A80',justifyContent:'center'}}>
                 <View style={{height:87,width:87,borderRadius:43.5,alignItems:'center',backgroundColor:'#7E274A',alignSelf:'center'}}>
                  <Image source={require('./female.png')}
                  style={{height:26,width:17,resizeMode:'contain',marginTop:15}}/>
                  <Text style={{fontSize:15,fontFamily:'Exo2-Regular',color:'rgba(255, 255, 255, 0.7)',marginTop:6}}>FEMALE</Text>
                 </View>

                </View>
               </TouchableOpacity>
             )}



           </View>
           </View>
          <View style={{flex:2}}>

          <Button
            style={{fontSize: 18, color: '#000000',fontFamily:'Exo2-SemiBold'}}
            containerStyle={{height:50,width:'90%',alignSelf:'center',marginTop:75,borderRadius:10,backgroundColor:'white',justifyContent:'center'}}
            onPress={()=>this.getRemoteData()}>
            SUBMIT
          </Button>

          </View>
      </ImageBackground>
       </View>
     );
   }
 }



 export default ChooseScreen;
