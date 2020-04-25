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
import RazorpayCheckout from 'react-native-razorpay';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';

class LibraryScreen extends React.Component {
  constructor(props) {
    super(props)
     this.state={
       search:'',
       FlatListItems: [
    {"key": "#1",
     "add": "BEGINNER",
     "add2": "Pullover Technique Guide",
     "add3": require('./thmb1.png'),
     "image_type": 1,
     "add4": require('./memlock.png'),
    },
    {"key": "#2",
     "add": "BEGINNER",
     "add2": "Handstand Technique Guide",
     "add3": require('./thmb2.png'),
     "image_type": 0,

    },
    {"key": "#3",
     "add": "INTERMEDIATE",
     "add2": "Muscle Up Technique Guide",
     "add3": require('./thmb3.png'),
     "image_type": 1,
     "add4": require('./memlock.png'),
    },
    {"key": "#4",
     "add": "INTERMEDIATE",
     "add2": "Handstand Press",
     "add3": require('./thmb4.png'),
     "image_type": 0,

    },



  ],
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

  navigates=(no_of_week, id,item)=> {
    GLOBAL.weeks = no_of_week
    GLOBAL.package_id = id
    GLOBAL.getPack = item
    this.props.navigation.navigate('NewSubscription')


  }
  renderItem2=({item}) => {
  return(

  <>

  <TouchableOpacity
  onPress={()=>this.navigates(item.no_of_week,item.id,item)}>
   <ImageBackground source={{uri:item.image,}}
    style={{width:'94%',height:220,marginLeft:'5%',resizeMode:'stretch'}}>

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
  renderItem=({item}) => {
return(
  <TouchableOpacity style={{width:'90%',marginTop:20,marginLeft:'5%'}}
  onPress={()=>this.props.navigation.navigate('ExerciseScreen')}>

    {item.image_type==1 && (
     <ImageBackground source={item.add3}
      style={{width:'100%',height:150,borderRadius:10}}>


      <View style={{flexDirection:'row',width:'90%',marginLeft:'5%',marginTop:20,alignItems:'center',justifyContent:'space-between'}}>

      <Button
        style={{fontSize: 10, color: '#242B37',fontFamily:'Exo2-Medium'}}
        containerStyle={{width:78,height:24,borderRadius:3,backgroundColor:'white',justifyContent:'center'}}>
        {item.add}
      </Button>

      <Image source={ item.add4}
       style={{width:19,height:25}}/>
      </View>

      <Text style={{fontSize:22,fontFamily:'Exo2-Medium',color:'white',marginLeft:'5%',marginTop:40}}>{item.add2}</Text>

     </ImageBackground>

     )}

     {item.image_type==0 && (

       <ImageBackground source={item.add3}
        style={{width:'100%',height:150,borderRadius:10}}>



        <Button
          style={{fontSize: 10, color: '#242B37',fontFamily:'Exo2-Medium'}}
          containerStyle={{width:78,height:24,borderRadius:3,backgroundColor:'white',justifyContent:'center',marginLeft:'5%',marginTop:20}}>
          {item.add}
        </Button>




        <Text style={{fontSize:22,fontFamily:'Exo2-Medium',color:'white',marginLeft:'5%',marginTop:40}}>{item.add2}</Text>

       </ImageBackground>

     )}



  </TouchableOpacity>



 );
}

_keyExtractor=(item, index)=>item.key;

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

                          </Text>


                          <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10}}>

                          </Text>

                      </View>


         <View style = {{backgroundColor:'white'}} >

            <View style={{flexDirection:'row',width:'90%',marginLeft:'5%',marginTop:29,alignItems:'center',justifyContent:'space-between'}}>





           </View>

           <FlatList
            data={GLOBAL.packageall}

            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem2}
             />
            </View>
          </SafeAreaView>
    );
  }
}

export default LibraryScreen;
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
