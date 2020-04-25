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
    import Internet from './Internet.js';
    import NetInfo from "@react-native-community/netinfo";
  import Loader from './Loader.js';
import RazorpayCheckout from 'react-native-razorpay';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Header from 'react-native-custom-headers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class ProgramScreen extends React.Component {
  constructor(props) {
    super(props)
     this.state={

       FlatListItems: [],
       loading:'',
       image:'',
       connected:true,


}
  }

    showLoading() {
    this.setState({loading: true})
   }

    hideLoading() {
    this.setState({loading: false})
   }


  renderItem=({item}) => {
return(
<>

    <View>

         <View style={{flexDirection:'row',width:'90%',marginTop:12,marginLeft:'5%',alignItems:'center',justifyContent:'space-between'}}>

            <Text style={{fontSize:18,fontFamily:'Exo2-Regular',color:'#161718'}}>{item.title}</Text>

            <Button
             style={{fontSize: 12, color: '#161718',fontFamily:'Exo2-Medium'}}
             onPress={()=>this.navigate2(item.title, item.all_package)}>
             View All
           </Button>

            </View>





            <View style={{marginLeft:10,marginTop:5}}>
             <FlatList
              data={item.all_package}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={this._keyExtractor2}
              renderItem={this.renderItem2}
              />
             </View>
   </View>
</>

 )
}


navigate2=(title, all_package)=> {
  //alert(JSON.stringify(all_package))

   GLOBAL.maintitle = title
   GLOBAL.packageall = all_package
   this.props.navigation.navigate('LibraryScreen')

   }

_keyExtractor=(item, index)=>item.key;
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
navigate=(no_of_week, id,item)=> {


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
}else{

  GLOBAL.weeks = no_of_week
  GLOBAL.package_id = id
  GLOBAL.getPack = item
  this.props.navigation.navigate('NewSubscription')
}

}

access = (item) =>{
//  alert(JSON.stringify(item))

var amount = parseInt(item.amount) * 100

var d = `Order_Package_${GLOBAL.user_id}_${item.id}`

  var options = {
      description: d,
image: item.image,
      currency: 'INR',
      key: 'rzp_test_9FNVaaXL2WKZMI',
      amount:amount,


      name: 'varun',
      prefill: {
          email: 'varun.singhal78@gmail.com',
          contact: '9896904632',
          name: 'varun'
      },
      theme: {color: 'black'}
  }

  RazorpayCheckout.open(options).then((data) => {
      var a = data.razorpay_payment_id
      this.props.navigation.navigate('Thankyou')
    //  this.capture(a,b,id);



  }).catch((error) => {
      // handle failure
     // this.myPayments(s,error.description,'')

  });
  RazorpayCheckout.onExternalWalletSelection(data => {



  });


}
renderItem2=({item}) => {
return(

<>

<TouchableOpacity
onPress={()=>this.navigate(item.no_of_week,item.id,item)}>
 <ImageBackground source={{uri:item.image}}
 imageStyle={{ borderRadius: 12 }}
  style={{width:220,height:120}}>

  <View style={{flexDirection:'row',width:'82%',marginLeft:'9%',marginTop:17,alignItems:'center',justifyContent:'space-between'}}>

  <Button
    style={{fontSize: 10, color: '#242B37',fontFamily:'Exo2-Medium'}}
    containerStyle={{width:76,height:23,borderRadius:3,backgroundColor:'white',justifyContent:'center'}}>
    {item.package_type}
  </Button>



  </View>

  <Text style={{fontFamily:17,fontFamily:'Exo2-Medium',color:'white',marginTop:26,marginLeft:'9%',width:'75%'}}>{item.package_name}</Text>
 </ImageBackground>

</TouchableOpacity>




 </>

)
}
componentDidMount() {





     this._unsubscribe = this.props.navigation.addListener('focus', () => {


       NetInfo.fetch().then(state => {
         this.setState({connected:state.isConnected})
         console.log(state.isConnected)

         if (state.isConnected == true){
    this.showLoading()
       fetch('http://pumpfit.in/admin/webservices/getpackage', {
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

              //   alert(JSON.stringify(responseJson))
              this.hideLoading()
            if (responseJson.status == true) {
                this.setState({FlatListItems: responseJson.workout })
                this.setState({image:responseJson.image})

            }
            else{
              //  alert('Invalid Credentials!')
            }
        })
        .catch((error) => {
            console.error(error);
        });
      }});
      }
    )
}

  _keyExtractor2=(item, index)=>item.key;

// renderItem3=({item}) => {
// return(

// <TouchableOpacity>
//  <ImageBackground source={item.add3}
//   style={{width:220,height:120}}>

//   <View style={{flexDirection:'row',width:'82%',marginLeft:'9%',marginTop:17,alignItems:'center',justifyContent:'space-between'}}>

//   <Button
//     style={{fontSize: 10, color: '#242B37',fontFamily:'Exo2-Medium'}}
//     containerStyle={{width:75,height:23,borderRadius:3,backgroundColor:'white',justifyContent:'center'}}>
//     {item.add}
//   </Button>

//   <Image source={ item.add4}
//    style={{width:16,height:20}}/>
//   </View>

//   <Text style={{fontFamily:17,fontFamily:'Exo2-Medium',color:'white',marginTop:26,marginLeft:'9%',width:'75%'}}>No Equipment Home Beginner</Text>
//  </ImageBackground>

// </TouchableOpacity>


// )
// }

// _keyExtractor3=(item, index)=>item.key;

// renderItem4=({item}) => {
// return(

// <TouchableOpacity>
//  <ImageBackground source={item.add3}
//   style={{width:220,height:120}}>

//   <View style={{flexDirection:'row',width:'82%',marginLeft:'9%',marginTop:17,alignItems:'center',justifyContent:'space-between'}}>

//   <Button
//     style={{fontSize: 10, color: '#242B37',fontFamily:'Exo2-Medium'}}
//     containerStyle={{width:75,height:23,borderRadius:3,backgroundColor:'white',justifyContent:'center'}}>
//     {item.add}
//   </Button>

//   <Image source={ item.add4}
//    style={{width:16,height:20}}/>
//   </View>

//   <Text style={{fontFamily:17,fontFamily:'Exo2-Medium',color:'white',marginTop:26,marginLeft:'9%',width:'75%'}}>No Equipment Home Beginner</Text>
//  </ImageBackground>

// </TouchableOpacity>


// )
// }

// _keyExtractor4=(item, index)=>item.key;

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




           <KeyboardAwareScrollView style={{backgroundColor:'white'}}>

           <Image
                 source={{uri:this.state.image}}
               style={{width: '100%', height: 200,marginTop:5,resizeMode:'contain'}}


           />
            <FlatList
             data={this.state.FlatListItems}
             horizontal={false}
             showsHorizontalScrollIndicator={false}
             keyExtractor={this._keyExtractor}
             renderItem={this.renderItem}
             />







<Text style = {{height:10}}>
</Text>

           </KeyboardAwareScrollView>
         </SafeAreaView>
    );
  }
}

export default ProgramScreen;
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
