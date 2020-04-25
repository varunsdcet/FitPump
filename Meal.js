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
    const screenWidth = Math.round(Dimensions.get('window').width);
    import Internet from './Internet.js';
    import NetInfo from "@react-native-community/netinfo";
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Header from 'react-native-custom-headers';

class Meal extends React.Component {
  constructor(props) {
    super(props);

     this.state={
       FlatListItems: [],
       loading:false,
        connected:true,
}
  }



  transfer=(add)=> {

    //  GLOBAL.week = add
      this.props.navigation.navigate('MealType',{name:add})
   }



componentDidMount(){
  this._unsubscribe = this.props.navigation.addListener('focus', () => {


    NetInfo.fetch().then(state => {
      this.setState({connected:state.isConnected})
      console.log(state.isConnected)

      if (state.isConnected == true){
    this.showLoading()
    fetch('http://pumpfit.in/admin/webservices/get_meal_category', {
      method: 'POST',
     headers: {
         'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
         'Content-Type': 'application/json'
     },
     body: JSON.stringify({

         user_id:GLOBAL.user_id


     }),
   }).then((response) => response.json())
     .then((responseJson) => {

this.hideLoading()

         if (responseJson.status == true) {
              this.setState({FlatListItems: responseJson.meal_category })



         }
         else{
            this.setState({FlatListItems: [] })
         }
     })
     .catch((error) => {
         console.error(error);
     });
   }});
      });
}


  renderItem=({item,index}) => {
//alert(index);




return(

<View>

   <TouchableOpacity
    onPress={()=>this.transfer(item.title)}>

     <View style={{width:screenWidth/2}}>


        <Image style={{width:'90%',height:150,resizeMode:'cover',borderRadius:6,margin:'5%'}}
         source={{uri:item.image}}/>


<View style = {{position:'absolute', top :40,alignSelf:'center',height:30,width:100,backgroundColor:'black',borderRadius:4}}>
        <Text style={{textAlign:'center',fontSize: 12, color: '#161718',fontFamily:'Exo2-Medium',color:'white',marginTop:6}}>{item.title}</Text>
</View>



     </View>




  </TouchableOpacity>


  </View>



 );
}


showLoading() {
this.setState({loading: true})
}

hideLoading() {
this.setState({loading: false})
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
                             Daily Meal
                        </Text>


                        <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10}}>

                        </Text>

                    </View>


       <View style = {{backgroundColor:'white'}} >


            <FlatList style = {{height:'95%'}}
             data={this.state.FlatListItems}
             numColumns={2}

             keyExtractor={this._keyExtractor}
             renderItem={this.renderItem}
      />



            </View>
          </SafeAreaView>
      );
    }
  }

  export default Meal;
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
