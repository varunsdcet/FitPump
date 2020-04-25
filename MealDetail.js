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
  import HTML from 'react-native-render-html';
  const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, {Component} from 'react';
import Button from 'react-native-button';
import SegmentedControlTab from "react-native-segmented-control-tab";
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PulseIndicator } from 'react-native-indicators';
import Header from 'react-native-custom-headers';

class MealDetail extends React.Component {
  constructor(props) {
    super(props);

     this.state={
       FlatListItems: [],
       image:'',
       protein:'',
       fat:'',
       carbs:'',
       method:'',
       ingredients:'',
       selectedIndex: 0,
       mystaus:true,
}
  }



  transfer=(add)=> {
      GLOBAL.week = add
      this.props.navigation.navigate('WorkScreen')
   }



componentDidMount(){
  const { route } = this.props
const { item } = route.params
  console.log(this.props.route.params.name)
  //const {state} = props.navigation;
  //console.log(this.props.navigation.route.params?.user ?? 'defaultValue')
//console.log("PROPS " + state.params.user);
  // const {state} = this.props.navigation;
//   //  var name = state.params ? state.params.name : "<undefined>";
//   // alert(name)
//   this._unsubscribe = this.props.navigation.addListener('focus', () => {
//     fetch('http://pumpfit.in/admin/webservices/get_meal', {
//       method: 'POST',
//      headers: {
//          'x-api-key': 'c3a3cf7c211b7c07b2495d8aef9761fc',
//          'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({
//
//          user_id:GLOBAL.user_id,
//          category_name:this.props.route.params.name
//
//
//      }),
//    }).then((response) => response.json())
//      .then((responseJson) => {
//
//
//
//          if (responseJson.status == true) {
//
//           if (responseJson.meal.length != 0){
//             this.setState({mystaus:true})
// var k =  responseJson.meal[0]
//
// this.setState({image: responseJson.meal[0].image })
// this.setState({protein: responseJson.meal[0].protein })
// this.setState({fat: responseJson.meal[0].fat })
// this.setState({carbs: responseJson.meal[0].carbs })
// if (k.hasOwnProperty('method')){
// this.setState({method: responseJson.meal[0].method })
// this.setState({ingredients: responseJson.meal[0].ingredients })
// }
// }else{
//     this.setState({mystaus:false})
// }
//
//
//             //  this.setState({FlatListItems: responseJson.meal_category })
//
//             // image:'',
//             // protein:'',
//             // fat:'',
//             // carbs:'',
//             // method:'',
//             // ingredients:'',
//
//          }
//          else{
//             this.setState({FlatListItems: [] })
//          }
//      })
//      .catch((error) => {
//          console.error(error);
//      });
//       });
}


  renderItem=({item,index}) => {
//alert(index);




return(

<View>

   <TouchableOpacity
    onPress={()=>this.transfer(item.add)}>

     <View style={{width:'100%'}}>


        <Image style={{width:'90%',height:200,resizeMode:'cover',borderRadius:6,margin:'5%'}}
         source={{uri:item.image}}/>


<View style = {{position:'absolute', top :40,right:30,height:30,width:100,backgroundColor:'black',borderRadius:4}}>
        <Text style={{fontSize:18,textAlign:'center',fontFamily:'Exo2-SemiBold',color:'white'}}>{item.title}</Text>
</View>



     </View>




  </TouchableOpacity>


  </View>



 );
}

handleIndexChange = index => {

        this.setState({
            ...this.state,
            selectedIndex: index
        });
        if (index == 1){

        }else{

        }
    };


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
                              {this.props.route.params.name}
                        </Text>


                        <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontFamily:GLOBAL.heavy,fontSize: 18,paddingRight: 10}}>

                        </Text>

                    </View>


       <View style = {{backgroundColor:'white'}} >
{this.state.mystaus == true && (


       <KeyboardAwareScrollView>


       <Image style={{width:'90%',height:200,resizeMode:'cover',borderRadius:6,margin:'5%'}}
        source={{uri:GLOBAL.mealimage }}/>


        <View style ={{flexDirection:'row',margin:10,justifyContent:'space-between'}}>

               <View style = {{backgroundColor:'white',width:70,height:70,borderRadius:35,borderWidth:1,borderColor:'grey'}}>
               <Text style = {{color:'black',fontFamily:'Gilroy-Medium',fontSize: 18,alignSelf:'center',marginTop:12}}>
Fat
      </Text>
               <Text style = {{color:'grey',fontFamily:'Gilroy-Medium',fontSize: 18,alignSelf:'center',marginTop:1}}>
{GLOBAL.fat}
      </Text>
               </View>



               <View style = {{backgroundColor:'white',width:70,height:70,borderRadius:35,borderWidth:1,borderColor:'grey'}}>
               <Text style = {{color:'black',fontFamily:'Gilroy-Medium',fontSize: 18,alignSelf:'center',marginTop:12}}>
             Carb
               </Text>
               <Text style = {{color:'grey',fontFamily:'Gilroy-Medium',fontSize: 18,alignSelf:'center',marginTop:1}}>
             {GLOBAL.carbs }
               </Text>
                        </View>


               <View style = {{backgroundColor:'white',width:70,height:70,borderRadius:35,borderWidth:1,borderColor:'grey'}}>
               <Text style = {{color:'black',fontFamily:'Gilroy-Medium',fontSize: 18,alignSelf:'center',marginTop:12}}>
                      Protein
                        </Text>
               <Text style = {{color:'grey',fontFamily:'Gilroy-Medium',fontSize: 18,alignSelf:'center',marginTop:1}}>
                      {GLOBAL.protein}
                        </Text>
                                 </View>


        </View>

        <View style = {{width:360,alignSelf:'center',backgroundColor:'#f7f7f7',borderRadius:33,marginTop:20}}>
                  <SegmentedControlTab

                      activeTabStyle= {{borderWidth:0,borderTopLeftRadius:33,borderBottomLeftRadius:33,backgroundColor:'#cdf6fc',borderTopRightRadius:22,borderBottomRightRadius:22,borderRadius:22,borderColor:'#f7f7f7'}}
                      tabStyle = {{height:33,borderRadius:33,borderWidth:0,backgroundColor:'#f7f7f7',borderColor:'#f7f7f7'}}
                      tabTextStyle = {{color:'#acb1c0',fontFamily:'Gilroy-Medium',fontSize:15,paddingTop:4}}
                      activeTabTextStyle = {{color:'#43454a',fontFamily:'Gilroy-Medium',fontSize:15}}
                      firstTabStyle = {{borderBottomLeftRadius:33,borderTopLeftRadius:33}}
                      lastTabStyle={{borderTopRightRadius:33,borderBottomRightRadius:33}}
                      values={["Method", "Ingredients",]}
                      selectedIndex={this.state.selectedIndex}
                      onTabPress={this.handleIndexChange}
                  />
                  </View>
<View style = {{margin:5}}>
{this.state.selectedIndex == 0 && (

<HTML style = {{margin:10}} html={GLOBAL.mealMet} imagesMaxWidth={Dimensions.get('window').width} />

)}
</View>
<View style = {{margin:5}}>
{this.state.selectedIndex == 1 && (


<HTML html={GLOBAL.mealIng} imagesMaxWidth={Dimensions.get('window').width} />



)}

</View>
<Text style = {{height:270}}>
</Text>
       </KeyboardAwareScrollView>

)}

{this.state.mystaus == false && (
  <Image style={{height:'90%',width:'100%',marginTop:0,resizeMode:'contain',borderRadius:20}}
   source={require('./download.png')} />
)}
            </View>
          </SafeAreaView>
      );
    }
  }

  export default MealDetail;
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
