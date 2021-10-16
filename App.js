import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen'
import { createStackNavigator } from '@react-navigation/stack'
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen'
import AddChatScreen from './screens/AddChatScreen'
import ChatScreen from './screens/ChatScreen'

const Stack = createStackNavigator()

const globalScreenOptions = {
    headerStyle: {backgroundColor: '#2C6BED'},
    headerTitleStyle: {color: 'white'},
    headerTintColor: 'white',
}

export default function App() {
// 디버거 없애기
// LogBox.ignoreLogs(['Remote debugger'])
  return (
    <NavigationContainer style={styles.container}>
      {/* Stack.Screen name 중 가장 처음으로 나타날 화면!!!! */}
        <Stack.Navigator initialRouteName='Home' screenOptions={globalScreenOptions} >
          {/* component에 페이지 저장 -> button onPress할 때 navigate('name')으로 이동함 */}
          <Stack.Screen name='Login' component = {LoginScreen} />
          <Stack.Screen name='Register' component = {RegisterScreen} />
          <Stack.Screen name='Home' component = {HomeScreen} />
          <Stack.Screen name='AddChat' component = {AddChatScreen} />
          <Stack.Screen name='Chat' component = {ChatScreen} />
        </Stack.Navigator>
      {/* <View style={styles.container}>
        <Text>Let's build signal!!!!</Text>
        <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
  );
}

//Style camel로 적기!
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
});
