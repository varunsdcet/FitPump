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
    import NetInfo from "@react-native-community/netinfo";
import React, {Component} from 'react';
import Button from 'react-native-button';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
const GLOBAL = require('./Global');
const options = {
title: 'Select Avatar',

storageOptions: {
  skipBackup: true,
  path: 'images',
},
};
class EditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender:'',
      age:'',
      weight:'',
      height:'',
      avatarSource: '',
     imageget:0,
     loading:false,

    }

  }


   changeImage=()=> {



ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source.uri,
    });
    this.setState({
      imageget: 1,
    });

  }
});
}

  buttonClickListener = () =>{

   NetInfo.fetch().then(state => {
if (state.isConnected == false){
  alert('Please connect to internet')
  return
}
   })


  if (this.state.name=='') {
     alert('Enter Name')
  }

  else if (this.state.age=='') {
     alert('Enter Your Age')
  }
   else if (this.state.weight=='') {
     alert('Enter Your Weight')
  }
  else if (this.state.height=='') {
     alert('Enter Your Height')
  }


  else {
this.showLoading()
    const url = 'http://pumpfit.in/admin/webservices/edit_user_profile'
          const data = new FormData();
          data.append('user_id', GLOBAL.user_id);
          data.append('name', this.state.name);
          data.append('email_id', GLOBAL.email);
          data.append('height', this.state.height);
          data.append('weight', this.state.weight);
          data.append('age', this.state.age);
          data.append('flag', this.state.imageget);



          data.append('image', {
              uri: this.state.avatarSource,
              type: 'image/jpeg', // or photo.type
              name: 'image.png'
          });

          console.log(JSON.stringify(data))
          fetch(url, {
              method: 'post',
              body: data,
              headers: {
                  'x-api-key':'c3a3cf7c211b7c07b2495d8aef9761fc',
                     'Content-Type': 'multipart/form-data',
              }

          }).then((response) => response.json())
              .then((responseJson) => {
                         this.hideLoading()


                   this.props.navigation.goBack()


               //   alert('Status successfully Uploaded')



              });
      }
  }

componentDidMount(){
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



       if (responseJson.status == true) {

             // GLOBAL.userdet = responseJson.user
          var b = responseJson.user[0]
             this.setState({avatarSource:b.profile_pic})
                this.setState({name:b.name})
                   this.setState({gender:b.gender})
                      this.setState({age:b.age})
                          this.setState({weight:b.weight})
                              this.setState({height:b.height})
                         this.setState({avatarSource:b.profile_pic})


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
showLoading() {
this.setState({loading: true})
}

hideLoading() {
this.setState({loading: false})
}
  render() {
    if(this.state.loading){
            return(
                <Loader>

                </Loader>

            )
        }
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
                          Edit  Profile
                          </Text>

                          <View>

                          </View>


                      </View>
                      <KeyboardAwareScrollView
                       keyboardShouldPersistTaps = 'always'

                       style={{ backgroundColor: 'white',marginTop:0,height:'98%' }} >

                       <TouchableOpacity onPress={()=> this.changeImage()}>
                      {this.state.avatarSource=='' && (
                      <Image  style = {{width:120, height:120,borderRadius:60 ,alignSelf:'center', marginTop:'5%',}}
                      source={require('./Avatar.png')}/>
                        )}
                      {this.state.avatarSource!='' && (
                      <Image  style = {{width:120, height:120,borderRadius:60, alignSelf:'center', marginTop:'5%', }}
                      source={{uri: this.state.avatarSource}}/>
                        )}
                      </TouchableOpacity>

       <Text style={{fontSize:20,fontFamily:'Exo2-Regular',color:'#161718',alignSelf:'center',marginTop:13}}>Change Photo</Text>

       <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#00000050',marginTop:48,marginLeft:'8%'}}>Name</Text>

       <TextInput
         style={{fontSize:21,fontFamily:'Exo2-Regular',color:'#000000',width:'86%',height:46,marginLeft:'7.2%',marginTop:3}}
         placeholder="name"
         placeholderTextColor="#000000"
         maxLength={50}
         onChangeText={(text) => this.setState({name: text})}
         value={this.state.name}
         />



           <View style={{height:2,width:'88%',alignSelf:'center',backgroundColor:'#0000001A'}}>
           </View>


           <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#00000050',marginTop:20,marginLeft:'8%'}}>Age</Text>

           <TextInput
             style={{fontSize:21,fontFamily:'Exo2-Regular',color:'#000000',width:'86%',height:46,marginLeft:'7.2%',marginTop:3}}
             placeholder="years"
             placeholderTextColor="#000000"
             maxLength={50}
             onChangeText={(text) => this.setState({age: text})}
             value={this.state.age}
             />

             <View style={{height:2,width:'88%',alignSelf:'center',backgroundColor:'#0000001A'}}>
             </View>

             <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#00000050',marginTop:20,marginLeft:'8%'}}>Weight</Text>

             <TextInput
               style={{fontSize:21,fontFamily:'Exo2-Regular',color:'#000000',width:'86%',height:46,marginLeft:'7.2%',marginTop:3}}
               placeholder="kgs"
               placeholderTextColor="#000000"
               maxLength={50}
               onChangeText={(text) => this.setState({weight: text})}
               value={this.state.weight}
               />

               <View style={{height:2,width:'88%',alignSelf:'center',backgroundColor:'#0000001A'}}>
               </View>


               <Text style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#00000050',marginTop:20,marginLeft:'8%'}}>Height</Text>

               <TextInput
                 style={{fontSize:21,fontFamily:'Exo2-Regular',color:'#000000',width:'86%',height:46,marginLeft:'7.2%',marginTop:3}}
                 placeholder="cm"
                 placeholderTextColor="#000000"
                 maxLength={50}
                 onChangeText={(text) => this.setState({height: text})}
                 value={this.state.height}
                 />

                 <View style={{height:2,width:'88%',alignSelf:'center',backgroundColor:'#0000001A'}}>
                 </View>


                 <Button
                   style={{fontSize: 18, color: 'white',fontFamily:'Exo2-Medium'}}
                   containerStyle={{height:50,width:'88%',alignSelf:'center',marginTop:10,borderRadius:6,backgroundColor:'#161718',justifyContent:'center'}}
                   onPress={this.buttonClickListener}>
                   Save
                 </Button>



<Text style = {{height:100}}>

</Text>

      </KeyboardAwareScrollView>
      </SafeAreaView>

    );
  }
}

export default EditScreen;
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
