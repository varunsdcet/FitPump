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
import {
NavigationContainer,
CommonActions,
} from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
  import Loader from './Loader.js';
    import Internet from './Internet.js';
import RazorpayCheckout from 'react-native-razorpay';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Stars from 'react-native-stars';
import Header from 'react-native-custom-headers';
var arrayholder = [];
class PartScreen extends React.Component {
   constructor(props) {
     super(props);

     this.state={
         search:'',
         img1:require('./fav.png'),
loading:false,
connected:true,
         FlatListItems: [



 ],
     }
   }

   _handleStateChange = (state) => {
     alert('hi')


    }
   componentDidMount(){




     this._unsubscribe = this.props.navigation.addListener('focus', () => {


       NetInfo.fetch().then(state => {
         this.setState({connected:state.isConnected})
         console.log(state.isConnected)

         if (state.isConnected == true){


         this.showLoading()
         fetch('http://pumpfit.in/admin/webservices/category', {
           method: 'POST',
          headers: {
              'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              category_id: GLOBAL.category,
              user_id:GLOBAL.user_id,
              search:'',


          }),
        }).then((response) => response.json())
          .then((responseJson) => {
      this.hideLoading()


              if (responseJson.status == true) {
                   this.setState({FlatListItems: responseJson.category })
                  arrayholder =   responseJson.category


              }
              else{
                 this.setState({FlatListItems: [] })
              }
          })
          .catch((error) => {
              console.error(error);
          });
        }

       });

         });



   }

   _YesLogout=()=>{


     this.props.navigation.dispatch(
           CommonActions.reset({
             index: 1,
             routes: [
               {
                 name: 'LoginScreen',
                 params: { user: 'jane', key: this.props.route.key },
               },
              
             ],
           })
         )

     // this.props.navigation.dispatch(
     //          StackActions.push('LoginScreen')
     //        )
   //  this.props.navigation.dispatch(StackActions.popToTop())
   //  StackActions.replace('LoginScreen')

     // this.props
     //       .navigation
     //       .dispatch(StackActions.reset({
     //
     //           index: 0,
     //           actions: [
     //               NavigationActions.navigate({
     //                   routeName: 'LoginScreen',
     //                   params: { someParams: 'parameters goes here...' },
     //               }),
     //           ],
     //       }))
   }

like = (type,id) =>{
  if (GLOBAL.user_id == "0"){

     Alert.alert('PUMP','You seem to be an unregistered User.kindly Register First',
         [{text:"Cancel"},
             {text:"Yes", onPress:()=>this._YesLogout()
             },
         ],
         {cancelable:false}
       )
   //  alert('You seem to be an unregistered User. To Book  service with us,kindly Register First')
     return
   }else

  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);

    if (state.isConnected == false){
      alert('No internet Connection')
      return
    }
  });
  fetch('http://pumpfit.in/admin/webservices/exerciseLike', {
    method: 'POST',
   headers: {
       'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
       category_id: id,
       user_id:GLOBAL.user_id,
       like:type


   }),
}).then((response) => response.json())
   .then((responseJson) => {



       if (responseJson.status == true) {



       }
       else{

       }
   })
   .catch((error) => {
       console.error(error);
   });
}

   onChange=(item,index)=> {
     //
     // alert(JSON.stringify(item))
     var a = this.state.FlatListItems[index]
     if (item.like == 0){
       a.like = 1
      this.like('1',item.id)
     }else{
            a.like = 0
            this.like('0',item.id)
     }
     this.state.FlatListItems[index] = a
     this.setState({FlatListItems:this.state.FlatListItems})
    //  this.setState({ img1: require('./redheart.png')})
   }
   naviga = (video,image,description,body_parts,you_need,item) => {
console.log(video)



GLOBAL.video = video
//GLOBAL.video = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
GLOBAL.image = image
GLOBAL.description = description
GLOBAL.parts = body_parts
GLOBAL.needs = you_need
this.props.navigation.navigate('VideoScreen')
}


   renderItem =({item,index})=> {


     return (
<View>
<View style = {{position:'absolute',top:2,right:10}}>
                      <TouchableOpacity style={{marginLeft:70,marginTop:5}}
                       onPress={()=>this.onChange(item,index)}>
                       {item.like == 0 && (
                         <Image source={this.state.img1}
                          style={{height:13,width:14,resizeMode:'contain'}} />
                       )}


                      </TouchableOpacity>


                      <TouchableOpacity style={{marginLeft:70,marginTop:0}}
                       onPress={()=>this.onChange(item,index)}>
                       {item.like == 1 && (
                         <Image source={require('./redheart.png')}
                          style={{height:13,width:14,resizeMode:'contain'}} />
                       )}


                      </TouchableOpacity>
                      </View>

        <TouchableOpacity style={{flexDirection:'row',marginTop:20}}
          onPress={()=> this.naviga(item.video,item.image,item.description,item.body_parts,item.you_need,item)}>




          <View style = {{backgroundColor:'white',flexDirection:'row',borderBottomWidth: 1,
  borderBottomColor: "#D3D3D3",justifyContent:'space-between'}}>
          <Image style={{height:49,width:49,borderRadius:8,marginBottom:10}}
           source={{uri:item.image}}>

           </Image>
           <View style={{flexDirection:'column',width:'98%'}}>
            <Text style={{fontSize:18,fontFamily:'Exo2-Regular',color:'#161718',marginLeft:12}}>{item.title}</Text>

            <View style={{flexDirection:'row',marginTop:6,marginLeft:13,justifyContent:'space-between',width:'60%'}}>

             <Text style={{fontSize:12,fontFamily:'Exo2-Regular',color:'#00000066'}}>{item.body_parts}</Text>
             <View style = {{flexDirection:'row',width:'42%',alignItems:'center'}}>
             <Text style={{fontSize:12,fontFamily:'Exo2-Regular',color:'#00000066'}}>Level</Text>

             <View style={{margin:5}}>
             <Stars
               default={item.lavel}
               count={5}
               starSize={8}
               spacing={2}
               fullStar={require('./blackcircle.png')}
               emptyStar={require('./greycircle.png')}
                />
             </View>

            </View>
         </View>


           </View>


</View>





        </TouchableOpacity>
        </View>

     )
   }

   showLoading() {
   this.setState({loading: true})
  }

   hideLoading() {
   this.setState({loading: false})
  }
  call = () =>{
    this.setState({search:''})
    this.showLoading()
    fetch('http://pumpfit.in/admin/webservices/category', {
      method: 'POST',
     headers: {
         'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
         'Content-Type': 'application/json'
     },
     body: JSON.stringify({
         category_id: GLOBAL.category,
         user_id:GLOBAL.user_id


     }),
   }).then((response) => response.json())
     .then((responseJson) => {
this.hideLoading()


         if (responseJson.status == true) {
              this.setState({FlatListItems: responseJson.category })
             arrayholder =   responseJson.category


         }
         else{
            this.setState({FlatListItems: [] })
         }
     })
     .catch((error) => {
         console.error(error);
     });





  }


   SearchFilterFunction(text){

this.setState({search:text})
     fetch('http://pumpfit.in/admin/webservices/category', {
       method: 'POST',
      headers: {
          'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          category_id: GLOBAL.category,
          user_id:GLOBAL.user_id,
          search:text,


      }),
    }).then((response) => response.json())
      .then((responseJson) => {



          if (responseJson.status == true) {
               this.setState({FlatListItems: responseJson.category })
              arrayholder =   responseJson.category


          }
          else{
             this.setState({FlatListItems: [] })
          }
      })
      .catch((error) => {
          console.error(error);
      });
        // const newData = arrayholder.filter(function(item){
        //     const mergetwo= item.title
        //     const itemData = mergetwo.toUpperCase()
        //     const textData = text.toUpperCase()
        //     return itemData.indexOf(textData) > -1
        // })
        //
        //
        // this.setState({
        //     FlatListItems: newData,
        //     search: text
        //
        //
        // })

    }
   _keyExtractor=(item, index)=>item.key;





   render() {


     if(this.state.connected == false){
             return(
                 <Internet>

                 </Internet>

             )
         }

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
                          <View>
                          <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                              <Image
                                  source={require('./arrowlogo2.png')}
                                  style={{width: 18, height: 20,marginLeft:20,marginTop:25,resizeMode:'contain'}}


                              />
                          </TouchableOpacity>
                          </View>


                          <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:'Exo2-Bold',fontSize: 18,paddingRight:30}}>
                              {GLOBAL.category}
                          </Text>


                          <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10}}>

                          </Text>

                      </View>


         <View style = {{backgroundColor:'white'}} >




           <View style={{flexDirection:'row',width:'90%',marginLeft:'5%',marginTop:15,alignItems:'center',justifyContent:'space-between'}}>

                <View style={{flexDirection:'row',width:'83%',backgroundColor:'#8E8E931F',borderRadius:10,alignItems:'center',height:36}}>

                      <Image style={{height:15,width:15,resizeMode:'contain',marginLeft:9}}
                       source={require('./search.png')} />

                       <TextInput
                         style={{fontSize:17,fontFamily:'Exo2-Regular',color:'#23222280',width:'84%',height:36,marginLeft:2,marginTop:4,height:40}}
                         placeholder="Search"
                         placeholderTextColor="#23222280"

                         maxLength={100}
                          onChangeText={(text) => this.SearchFilterFunction(text)}
                         value={this.state.search}
                         />


                        <TouchableOpacity

     onPress={()=>this.call()}
                        style={{marginLeft:-2}}>
                        <Image style={{height:17,width:17,resizeMode:'contain'}}
                         source={require('./cross.png')} />
                        </TouchableOpacity>

                </View>

                <Button
                       onPress={()=>this.call()}
                  style={{fontSize: 17, color: '#161718',fontFamily:'Exo2-Regular'}}>
                  Cancel
                </Button>

           </View>

              <View style={{height:'auto',width:'90%',alignSelf:'center'}}>
              {this.state.FlatListItems.length != 0 && (
                <FlatList style= {{ height:'auto', flexGrow:0,borderTopColor:'#c0c0c0',width:'100%',height:'90%',backgroundColor:'white'}}
                data={this.state.FlatListItems}
                numColumns={1}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderItem}
                />
              )}
              {this.state.FlatListItems.length == 0 && (
                <Image style={{height:'80%',width:'100%',marginTop:0,resizeMode:'contain',borderRadius:20}}
                 source={require('./download.png')} />
              )}
              </View>







         </View>
       </SafeAreaView>
    );
  }
}

export default PartScreen;
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
