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

class NoteScreen extends React.Component {
  constructor(props) {
    super(props);
     this.state={

       button_one:0,
       button_two:0,
       button_three:0,
       showimage: true,
     }
  }


  onChangeButton1=()=> {
    this.setState({ button_one:1 });
    this.setState({ button_two:0 });
    this.setState({ button_three:0 });

  }

  onChangeButton2=()=> {

    this.setState({ button_one:0 });
    this.setState({ button_two:1 });
    this.setState({ button_three:0 });

  }

  onChangeButton3=()=> {

    this.setState({ button_one:0 });
    this.setState({ button_two:0 });
    this.setState({ button_three:1 });


  }

  render(){
    return(
        <SafeAreaProvider>
          <View style={{flex:1,backgroundColor:'white'}}>

             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:20,width:'90%',marginLeft:'5%'}}>

               <Text style={{fontSize:17, fontFamily:'Exo2-SemiBold', color:'#242B37'}}>Instructions:</Text>

               <TouchableOpacity style={{marginRight:5}}>
               <Image source={require('./note1.png')}
                style={{height:22,width:22,resizeMode:'contain'}} />
               </TouchableOpacity>

             </View>

             <Text style={{fontSize:16,fontFamily:'Exo2-Medium',color:'#242B3780',marginTop:10,marginLeft:'5%',width:'90%',textAlign:'left'}}>My note: Preparation set the weight, sit down, grab the handles and make sure your feet are solid on the floor.</Text>
             <Text style={{fontSize:16,fontFamily:'Exo2-Medium',color:'#242B3780',marginTop:10,marginLeft:'5%',width:'90%',textAlign:'left'}}>Set the weight, sit down, grab the handles and make sure your feet are solid on the floor.</Text>
             <Text style={{fontSize:16,fontFamily:'Exo2-Medium',color:'#242B3780',marginTop:10,marginLeft:'5%',width:'90%',textAlign:'left'}}>Execution exhale and press the handles up until your arms are extened. Lower, while keeping the weight stack in the air for resitance throughout the entire exercise, and repeat.</Text>


             <View style={{flexDirection:'row',marginLeft:'5%',width:'90%',alignItems:'center',justifyContent:'space-between',marginTop:26}}>


              { this.state.button_one == 0 && (

              <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#16171866',alignItems:'center',borderRadius:6}}
              onPress={()=>this.onChangeButton1()}>

                 <Image source={require('./gallery.png')}
                  style={{height:16,width:16,resizeMode:'contain',marginLeft:8}} />

                  <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>IMAGE</Text>
              </TouchableOpacity>

              )}


              { this.state.button_one == 1 && (

                <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#161718',alignItems:'center',borderRadius:6}}>

                   <Image source={require('./gallery.png')}
                    style={{height:16,width:16,resizeMode:'contain',marginLeft:8}} />

                    <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>IMAGE</Text>
                </TouchableOpacity>

              )}





              { this.state.button_two == 0 && (

              <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#16171866',alignItems:'center',borderRadius:6}}
              onPress={()=>this.onChangeButton2()}>

              <Image source={require('./youtube2.png')}
               style={{height:22,width:16,resizeMode:'contain',marginLeft:8}} />

               <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>VIDEO</Text>

              </TouchableOpacity>

              )}

              { this.state.button_two == 1 && (
                <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#161718',alignItems:'center',borderRadius:6}}>

                <Image source={require('./youtube2.png')}
                 style={{height:22,width:16,resizeMode:'contain',marginLeft:8}} />

                 <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>VIDEO</Text>

                </TouchableOpacity>
              )}





              { this.state.button_three == 0 && (
              <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#16171866',alignItems:'center',borderRadius:6}}
              onPress={()=>{ this.onChangeButton3(); this.props.navigation.navigate('NoteScreen'); }}>

              <Image source={require('./note.png')}
               style={{height:17,width:16,resizeMode:'contain',marginLeft:8}} />

               <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>NOTE</Text>

               </TouchableOpacity>

               )}

               { this.state.button_three == 1 && (

                 <TouchableOpacity style={{flexDirection:'row',height:34,width:'31.5%',backgroundColor:'#161718',alignItems:'center',borderRadius:6}}>

                 <Image source={require('./note.png')}
                  style={{height:17,width:16,resizeMode:'contain',marginLeft:8}} />

                  <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#FFFFFF',marginLeft:18}}>NOTE</Text>

                  </TouchableOpacity>

               )}

               </View>










          </View>
        </SafeAreaProvider>
    );
  }
}

export default NoteScreen;
