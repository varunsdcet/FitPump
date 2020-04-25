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

import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Header from 'react-native-custom-headers';

class MainScreen extends React.Component {

  setValue =(type) =>{
     GLOBAL.libcat = type
      this.props.navigation.navigate('Allexercises')
     // console.log(GLOBAL.libcat)
   }

  render() {
  return(
    <SafeAreaView style={styles.AndroidSafeArea}>
                    <StatusBar backgroundColor="#639ced" barStyle="light-content" />

                    <View style = {{height:70,backgroundColor:'black',flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./arrowlogo2.png')}
                                style={{width: 18, height: 20,marginLeft:20,marginTop:25,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:'Exo2-Bold',fontSize: 18,paddingRight:30}}>
                          Exercise Library
                        </Text>


                        <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10}}>

                        </Text>

                    </View>

           <View style={{backgroundColor:'white'}}>

              <TouchableOpacity style={{marginTop:20,width:Dimensions.get('window').width-36,alignSelf:'center'}}
              onPress={()=>this.setValue('Gym')}>
              <ImageBackground source={require('./thmb9.png')}
                style={{height:148,width:Dimensions.get('window').width-36,justifyContent:'center',borderRadius:12}}>

                   <Text style={{fontSize:25,fontFamily:'Exo2-Medium',color:'#FFFFFF',alignSelf:'center'}}>Gym</Text>


              </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity style={{marginTop:18,width:Dimensions.get('window').width-36,alignSelf:'center'}}
               onPress={()=>this.setValue('Home')}>
              <ImageBackground source={require('./thmb7.png')}
                style={{height:148,width:Dimensions.get('window').width-36,justifyContent:'center',borderRadius:12}}>

                   <Text style={{fontSize:25,fontFamily:'Exo2-Medium',color:'#FFFFFF',alignSelf:'center'}}>Home</Text>


              </ImageBackground>
              </TouchableOpacity>


              <TouchableOpacity style={{marginTop:18,width:Dimensions.get('window').width-36,alignSelf:'center'}}
               onPress={()=>this.setValue('Travel')}>
              <ImageBackground source={require('./thmb8.png')}
                style={{height:148,width:Dimensions.get('window').width-36,justifyContent:'center',borderRadius:12}}>

                   <Text style={{fontSize:25,fontFamily:'Exo2-Medium',color:'#FFFFFF',alignSelf:'center'}}>Travel</Text>


              </ImageBackground>
              </TouchableOpacity>
           </View>
          </SafeAreaView>
    ) ;
  }
}

 export default MainScreen;
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
