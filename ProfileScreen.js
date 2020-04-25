
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
  TouchableHighlight,
  TextInput,
  Modal,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  AsyncStorage,
  Dimensions,




  } from 'react-native';
  import Loader from './Loader.js';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {Component} from 'react';
import Button from 'react-native-button';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const GLOBAL = require('./Global');

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
     this.state={
       loading:'',
       flag: 0,
       data:[],



     }

  }




  showLoading() {
this.setState({loading: true})
}

hideLoading() {
this.setState({loading: false})
}


  componentDidMount() {
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
     this.handleStateChange()
   })
}


  handleStateChange=()=> {

      this.showLoading()
  fetch('http://pumpfit.in/admin/webservices/getprofile', {
    method: 'POST',
   headers: {
       'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
       user_id: GLOBAL.user_id

   }),
}).then((response) => response.json())
   .then((responseJson) => {


         this.hideLoading()
       if (responseJson.status == true) {
             // GLOBAL.userdet = responseJson.user
             this.setState({data:responseJson.user[0]})


       //     GLOBAL.user_id = responseJson.user_id
       //
       //      AsyncStorage.setItem('userID', responseJson.user_id);
       //
       //     // AsyncStorage.setItem('image', this.state.results.image);
       //     // AsyncStorage.setItem('name', this.state.results.name);
       //     // AsyncStorage.setItem('email', this.state.results.email);
       //     // AsyncStorage.setItem('mobile', this.state.results.mobile);
       //     this.props.navigation.navigate('HomeScreen')

        }
       else{

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

//      alert(JSON.stringify(this.state.data[0].profile_pic))
  var yeah= this.state.data
    return(
      <SafeAreaView style={styles.AndroidSafeArea}>
                      <StatusBar backgroundColor="#639ced" barStyle="light-content" />

                      <View style = {{height:70,backgroundColor:'black',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>


                      <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                          <Image
                              source={require('./arrowlogo2.png')}
                              style={{width: 18, height: 20,marginLeft:20,marginTop:25,resizeMode:'contain'}}


                          />
                      </TouchableOpacity>


                          <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:'Exo2-Bold',fontSize: 18,paddingRight:20}}>
                            Profile
                          </Text>

                          <View>

                          </View>


                      </View>
                      <KeyboardAwareScrollView
                       keyboardShouldPersistTaps = 'always'

                       style={{ backgroundColor: 'white',marginTop:0,height:'98%' }} >





      <View style={{flexDirection:'row',marginTop:26}}>
       <Image source={{uri: yeah.profile_pic}}
        style={{height:100,width:100,resizeMode:'contain',marginLeft:38}}/>

        <TouchableOpacity style={{width:30,borderRadius:15,marginTop:60,height:30,marginLeft:-18}}
        onPress={()=>this.props.navigation.navigate('EditScreen')}>
        <Image source={require('./edit.png')}
         style={{height:30,width:30,resizeMode:'contain'}} />
        </TouchableOpacity>

      </View>

            <Text style={{fontSize:22,fontFamily:'Exo2-Regular',color:'black',marginLeft:18,marginTop:10}}>{yeah.email_id}</Text>
        <Text style={{fontSize:26,fontFamily:'Exo2-Regular',color:'black',marginLeft:38,marginTop:10}}>{yeah.name}</Text>

        <Text style={{fontSize:19,fontFamily:'Exo2-Regular',color:'black',marginLeft:38,marginTop:7}}>{yeah.mobile}</Text>

        <ImageBackground source={require('./box.png')}

          style={{width:'100%',height:150,resizeMode:'contain',marginTop:19,shadowColor: '#00000012',shadowOffset: { width: 2, height: 2 },elevation:1}}>

          <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#00000050',marginTop:40,marginLeft:38}}>Name</Text>
          <Text style={{fontSize:21,fontFamily:'Exo2-Regular',color:'#161718',marginTop:3,marginLeft:38}}>{yeah.name}</Text>

        </ImageBackground>



        <ImageBackground source={require('./box.png')}

          style={{width:'100%',height:150,resizeMode:'contain',marginTop:-40,shadowColor: '#00000012',shadowOffset: { width: 2, height: 2 },elevation:1}}>

          <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#00000050',marginTop:40,marginLeft:38}}>Age</Text>
          <Text style={{fontSize:21,fontFamily:'Exo2-Regular',color:'#161718',marginTop:3,marginLeft:38}}>{yeah.age}</Text>

        </ImageBackground>

        <ImageBackground source={require('./box.png')}

          style={{width:'100%',height:150,resizeMode:'contain',marginTop:-40,shadowColor: '#00000012',shadowOffset: { width: 2, height: 2 },elevation:1}}>

          <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#00000050',marginTop:40,marginLeft:38}}>Weight</Text>
          <Text style={{fontSize:21,fontFamily:'Exo2-Regular',color:'#161718',marginTop:3,marginLeft:38}}>{yeah.weight}</Text>

        </ImageBackground>

        <ImageBackground source={require('./box.png')}

          style={{width:'100%',height:150,resizeMode:'contain',marginTop:-40,shadowColor: '#00000012',shadowOffset: { width: 2, height: 2 },elevation:1}}>

          <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#00000050',marginTop:40,marginLeft:38}}>Height</Text>
          <Text style={{fontSize:21,fontFamily:'Exo2-Regular',color:'#161718',marginTop:3,marginLeft:38}}>{yeah.height}</Text>

        </ImageBackground>


      </KeyboardAwareScrollView>
      </SafeAreaView>

    );
  }
}

export default ProfileScreen;
const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor :'white',

    },
    containers: {

        backgroundColor :'white'
    },
    AndroidSafeArea: {
       flex: 0,
       backgroundColor:'black',
       paddingTop: Platform.OS === "android" ? 0 : 0
   },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

})
