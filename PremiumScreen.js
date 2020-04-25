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

import React, {Component} from 'react';
const GLOBAL = require('./Global');
import RazorpayCheckout from 'react-native-razorpay';
class PremiumScreen extends React.Component {
  constructor(props) {
     super(props);
      this.state = {
        loading:'',
        FlatListItems: []
      }
   }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }
       access = (item,t) =>{
         alert(JSON.stringify(item))
         if (t == ''){
           return
         }
       //  alert(JSON.stringify(item))

       var amount = parseInt(t) * 100

       var d = `Order_Subscription_${GLOBAL.user_id}_${item.id}`

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
  componentDidMount() {

    this.showLoading()

     this._unsubscribe = this.props.navigation.addListener('focus', () => {
   fetch('http://pumpfit.in/admin/webservices/getsubscription', {
method: 'POST',
headers: {
  'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
  'Content-Type': 'application/json',
},
body: JSON.stringify({

       user_id: GLOBAL.user_id


}),
}).then((response) => response.json())
 .then((responseJson) => {



    this.hideLoading()
    if (responseJson.status == true ) {


    this.setState({FlatListItems: responseJson.subscription})
    // alert(JSON.stringify(this.state.FlatListItems))


    }else {
        alert('Something Went wrong')
    }
 })
 .catch((error) => {
   console.error(error);
 });
})

}

   renderItem =({item,index})=> {
   var sum= parseInt(item.price) + parseInt(item.discount)
     if (sum==0) {
       item.price = 'Free'
     }
    alert(sum)
var t = ""
if (isNaN(sum)) {
  t = ""
}else{
  t = sum
}

   var con= `${item.name} ${item.type}`
     return (

<View>
       {item.active_status == "0" && (
         <TouchableOpacity  onPress={()=>this.access(item,t)} style={{flexDirection:'row',height:54,width:'90%',borderRadius:7,borderWidth:1.5,borderColor:'#616161',marginTop:10,alignSelf:'center',alignItems:'center',justifyContent:'space-between'}}>

             <Text style={{fontSize:16,fontFamily:'Exo2-Regular',color:'white',marginLeft:22}}>{con}</Text>
             {t != ''  && (
                       <Text style={{fontSize:16,fontFamily:'Exo2-Regular',color:'white',marginLeft:'24%',textDecorationLine: 'line-through'}}>₹{t}</Text>
             )}

             <Text style={{fontSize:16,fontFamily:'Exo2-Regular',color:'white',marginRight:17}}>₹{item.price}</Text>

            </TouchableOpacity>
       )}
       {item.active_status == "1" && (
         <TouchableOpacity  onPress={()=>this.access(item,t)} style={{flexDirection:'row',height:54,width:'90%',borderRadius:7,borderWidth:1.5,borderColor:'#616161',marginTop:10,alignSelf:'center',backgroundColor:'green',alignItems:'center',justifyContent:'space-between'}}>

             <Text style={{fontSize:16,fontFamily:'Exo2-Regular',color:'white',marginLeft:22}}>{con}</Text>
             {t != ''  && (
                       <Text style={{fontSize:16,fontFamily:'Exo2-Regular',color:'white',marginLeft:'24%',textDecorationLine: 'line-through'}}>₹{t}</Text>
             )}

             <Text style={{fontSize:16,fontFamily:'Exo2-Regular',color:'white',marginRight:17}}>₹{item.price}</Text>

            </TouchableOpacity>
       )}

       {item.active_status == "2" && (
         <TouchableOpacity  onPress={()=>this.access(item,t)} style={{flexDirection:'row',height:54,width:'90%',borderRadius:7,borderWidth:1.5,borderColor:'#616161',marginTop:10,alignSelf:'center',backgroundColor:'red',alignItems:'center',justifyContent:'space-between'}}>

             <Text style={{fontSize:16,fontFamily:'Exo2-Regular',color:'white',marginLeft:22}}>{con}</Text>
             {t != ''  && (
                       <Text style={{fontSize:16,fontFamily:'Exo2-Regular',color:'white',marginLeft:'24%',textDecorationLine: 'line-through'}}>₹{t}</Text>
             )}

             <Text style={{fontSize:16,fontFamily:'Exo2-Regular',color:'white',marginRight:17}}>₹{item.price}</Text>

            </TouchableOpacity>
       )}

</View>

    )}

    render() {
    return(
          <View style={{flex:1}}>
          <ImageBackground style={{resizeMode:'contain',height:'100%',width:'100%'}} source={require('./premium.png')}>

          <View style={{flex:4}}>

          <TouchableOpacity style={{alignSelf:'flex-end',marginTop:'9.5%',marginRight:'5%'}}
          onPress={()=> this.props.navigation.goBack()}>
          <Image style={{height:17,width:17}}
             source={require('./close.png')}/>
          </TouchableOpacity>


             <Text style={{fontSize:33,fontFamily:'Exo2-Medium',color:'white',width:'76%',alignSelf:'center',textAlign:'center',marginTop:'21.5%'}}>Commit to Yourself</Text>
             <Text style={{fontSize:13,fontFamily:'Exo2-Medium',color:'#8F92A1',width:'55%',alignSelf:'center',textAlign:'center',marginTop:10}}>dedication leads to success choose a plan commit to your goals .</Text>

          </View>

          <View style={{flex:3.4}} >

          <Text style={{fontSize:13,fontFamily:'Exo2-Medium',color:'#8F92A1',alignSelf:'center',textAlign:'center',marginTop:-20}}>Get your personal trainer & unlock all workouts.</Text>

          <View style={{height:'auto',width:'100%',alignSelf:'center',marginTop:15}}>
                 <FlatList style= {{ height:'auto', flexGrow:0,borderTopColor:'#c0c0c0',width:'100%'}}
                 data={this.state.FlatListItems}
                 numColumns={1}
                 keyExtractor={this._keyExtractor}
                 renderItem={this.renderItem}
                 />
              </View>



          </View>

          </ImageBackground>
          </View>
    );
  }
}

 export default PremiumScreen;
