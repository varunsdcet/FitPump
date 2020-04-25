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
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Header from 'react-native-custom-headers';

class MealType extends React.Component {
  constructor(props) {
    super(props);

     this.state={
       FlatListItems: [],
       loading:false,
       packid:'',
}
  }



  transfer=(image, fat, carbs, protein, method, ingredients,add)=> {


     GLOBAL.mealimage = image
     GLOBAL.fat = fat
     GLOBAL.carbs = carbs
     GLOBAL.protein = protein
     GLOBAL.mealMet = method
     GLOBAL.mealIng = ingredients

     // alert(JSON.stringify(GLOBAL.mealimage))
       this.props.navigation.navigate('MealDetail',{name:add})

   }



componentDidMount(){



    this.showLoading()
    fetch('http://pumpfit.in/admin/webservices/get_meal', {
      method: 'POST',
     headers: {
         'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
         'Content-Type': 'application/json'
     },
     body: JSON.stringify({

         user_id:GLOBAL.user_id,
         category_name: this.props.route.params.name,


     }),
   }).then((response) => response.json())
     .then((responseJson) => {

this.hideLoading()



         if (responseJson.status == true) {


             this.setState({FlatListItems: responseJson.meal })
              this.setState({packid : responseJson.status })


         }
         else{
            this.setState({FlatListItems: [] })
         }
     })
     .catch((error) => {
         console.error(error);
     });

}


  renderItem=({item,index}) => {
//alert(index);

   // alert(JSON.stringify(item))


return(

<View>

   <TouchableOpacity
    onPress={()=>this.transfer(item.image, item.fat, item.carbs, item.protein ,item.method ,item.ingredients,item.meal_name)}>

     <View style={{width:screenWidth/2}}>


        <Image style={{width:'90%',height:150,resizeMode:'cover',borderRadius:6,margin:'5%'}}
         source={{uri:item.image}}/>


<View style = {{position:'absolute',bottom:40,left:40,height:50,width:'60%',backgroundColor:'black',borderRadius:4}}>
        <Text style={{textAlign:'center',fontSize: 12, color: '#161718',fontFamily:'Exo2-Medium',color:'white',marginTop:6}}>{item.meal_name}</Text>
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
                            {this.props.route.params.name}
                        </Text>


                        <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10}}>

                        </Text>

                    </View>



       <View style = {{backgroundColor:'white'}} >

       {this.state.packid == true && (


            <FlatList style = {{height:'90%'}}
             data={this.state.FlatListItems}
   numColumns={2}
             keyExtractor={this._keyExtractor}
             renderItem={this.renderItem}
      />

      )}

       {this.state.packid == false && (

         <View style={{backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
           <Image style={{height:100,width:100,resizeMode:'contain',borderRadius:8,alignSelf:'center'}}
             source={require('./download.png')} />

           <Text style={{fontSize:15,fontFamily:'Exo2-Medium',color:'black',marginTop:10}}>No Data Found</Text>

         </View>

        )}

            </View>
          </SafeAreaView>
      );
    }
  }

  export default MealType;
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
