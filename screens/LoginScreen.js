//rnfe rfce
import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, TextInput} from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
// import signalLogo from '../assets/signalLogo.png'
import {auth} from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser){
                navigation.replace('Home')
            }
        })

        return unsubscribe
    },[])

    const signIn = () =>{
        auth.signInWithEmailAndPassword(email.trim(), password)
            .catch(error => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light'/>
            <Image source={require('../assets/signalLogo.png')} style={{width: 200, height: 200}} />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' autoFocus type='Email' value={email} onChangeText={(text => setEmail(text))} />
                <Input placeholder='Password' secureTextEntry type='password' value={password} onChangeText={(text => setPassword(text))} onSubmitEditing={signIn} />
                {/* <TextInput placeholder='Email' autoFocus textContentType={'emailAddress'} value={email} onChangeText={(text => setEmail(text))} />
                <TextInput placeholder='Password' secureTextEntry textContentType={'password'} value={password} onChangeText={(text => setPassword(text))} onSubmitEditing={signIn} /> */}
            </View>
            {/* 버튼 스타일 containerStyle로 시작함!! */}
            <Button title='Login' containerStyle={styles.button} onPress={signIn} />
            <Button type='outline' title='Register' containerStyle={styles.button} onPress={() => navigation.navigate('Register')} />
            {/* 비어있는 view만들기 */}
            {/* <View style={{height: 10}} /> */}
            {/* <View  /> */}
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer:{
        width: 300,
    },
    button:{
        width: 200,
        marginTop: 10,
    }
  });