import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './SplashScreen.js';
import StyleScreen from './StyleScreen.js';
import LoginScreen from './LoginScreen.js';
import OtpScreen from './OtpScreen.js';
import SignupScreen from './SignupScreen.js';
import ChooseScreen from './ChooseScreen.js';
import PremiumScreen from './PremiumScreen.js';
import SettingScreen from './SettingScreen.js';
import HomeScreen from './HomeScreen.js';
import ProfileScreen from './ProfileScreen.js';
import EditScreen from './EditScreen.js';
import PartScreen from './PartScreen.js';
import VideoScreen from './VideoScreen.js';
import NoteScreen from './NoteScreen.js';
import WeekScreen from './WeekScreen.js';
import MealType from './MealType.js';
import WorkScreen from './WorkScreen.js';
import FullbodyScreen from './FullbodyScreen.js';
import ExerciseScreen from './ExerciseScreen.js';
import LibraryScreen from './LibraryScreen.js';
import ProgramScreen from './ProgramScreen.js';
import MainScreen from './MainScreen.js';
import SupportScreen from './SupportScreen.js';
import Allexercises from './Allexercises.js';
import Favourite from './Favourite.js';
import Thankyou from './Thankyou.js';
import NewSubscription from './NewSubscription.js';
import Meal from './Meal.js';
import MealDetail from './MealDetail.js';
import Notification from './Notification.js';
import ForgetScreen from './ForgetScreen.js';
import Otp2Screen from './Otp2Screen.js';
import Internet from './Internet.js';
import ChangePassword from './ChangePassword.js';
const Tab = createBottomTabNavigator();

function Tabs() {
  return (

      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'EXPLORE') {
              iconName = focused
              ? require('./explore.png')
              : require('./explore1.png')
            } else if(route.name === 'WORKOUT'){
              iconName = focused
              ? require('./gym.png')
              : require('./gym1.png')
            } else if(route.name === 'FAVOURITE'){
              iconName = focused
              ? require('./heart.png')
              : require('./heart1.png')
            }  else if(route.name === 'Meal'){
               iconName = focused
               ? require('./mealsss.png')
               : require('./mealsss.png')
             }
 else if(route.name === 'SETTINGS'){
              iconName = focused
              ? require('./settings.png')
              : require('./settings1.png')
            }



            // You can return any component that you like here!
            return<Image
                            source={iconName}
                            style={{height:20, width:20, resizeMode:'contain'}}
                        />;
          },
        })}
        tabBarOptions={{

          style: {
                     backgroundColor: 'black',



                 },

          backgroundColor:'red',
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          activeBackgroundColor :'black',
          inactiveBackgroundColor :'black'
        }}
      >
        <Tab.Screen name="EXPLORE" component={HomeScreen} />
        <Tab.Screen name="WORKOUT" component={ProgramScreen} />
          <Tab.Screen name="Meal" component={Meal} />
        <Tab.Screen name="FAVOURITE" component={Favourite} />
        <Tab.Screen name="SETTINGS" component={SettingScreen} />

      </Tab.Navigator>

  );
}



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,gestureEnabled:false, }}>
        <Stack.Screen
        name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="StyleScreen" component={StyleScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ChooseScreen" component={ChooseScreen} />
        <Stack.Screen name="PremiumScreen" component={PremiumScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
        <Stack.Screen name="PartScreen" component={PartScreen} />
          <Stack.Screen name="Favourite" component={Favourite} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
        <Stack.Screen name="WeekScreen" component={WeekScreen} />
        <Stack.Screen name="WorkScreen" component={WorkScreen} />
        <Stack.Screen name="FullbodyScreen" component={FullbodyScreen} />
        <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
        <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
        <Stack.Screen name="ProgramScreen" component={ProgramScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
            <Stack.Screen name="Allexercises" component={Allexercises} />
              <Stack.Screen name="Thankyou" component={Thankyou} />
<Stack.Screen name="NewSubscription" component={NewSubscription} />
<Stack.Screen name="Notification" component={Notification} />
<Stack.Screen name="MealDetail" component={MealDetail} />
<Stack.Screen name="ForgetScreen" component={ForgetScreen} />
<Stack.Screen name="Otp2Screen" component={Otp2Screen} />
        <Stack.Screen name="Tab" component={Tabs} />
<Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Internet" component={Internet} />
              <Stack.Screen name="MealType" component={MealType} />
      </Stack.Navigator>



    </NavigationContainer>
  );
}


export default App;
