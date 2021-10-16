import React,{useState, useLayoutEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView,  TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image } from 'react-native-elements'
import {auth} from '../firebase'

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setimageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login',
        })
    }, [navigation])
    // || 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png'
    
    const register =()=>{
        auth.createUserWithEmailAndPassword(email.trim(), password)
            .then(authUser => {
                //유저 업데이트!
                 authUser.user.updateProfile({
                     displayName: name,
                     photoURL: imageUrl || '../assets/profile_hj.jpg'
                 })
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container} >
            {/* <SafeAreaView> */}
            {/* <ScrollView style={styles.scrollContainer}> */}
                <StatusBar style='light'/>
                <Text h1 style={styles.textStyle}>
                    Create a Signal account
                </Text>
                <View style={styles.inputContainer}>
                    {/* react native element 왜 안 되는지 모름 onChangeText로 바꿔보기; */}
                    <Input placeholder='Full Name' autoFocus type='text' value={name} onChangeText={text => setName(text)} />
                    <Input placeholder='Email' autoFocus type='email' value={email} onChangeText={text => setEmail(text)} />
                    <Input placeholder='Password' secureTextEntry={true} autoFocus type='password' secureTextEntry value={password} onChangeText={text => setPassword(text)} />
                    {/* <TextInput  placeholder='Full Name' autoFocus textContentType={'name'} value={name} onChangeText={text => setName(text)} />
                    <TextInput  placeholder='Email' autoFocus textContentType={'emailAddress'} value={email} onChangeText={text => setEmail(text)} />
                    <TextInput secureTextEntry={true} textContentType={'password'} placeholder='Password' autoFocus value={password} onChangeText={text => setPassword(text)} /> */}
                    <Input placeholder='Profile Picture URL (optional)' autoFocus type='text' value={imageUrl} onChangeText={text => setimageUrl(text)} onSubmitEditing={register}/>
                </View>
                <Button title='register' onPress={register} raised containerStyle={styles.button}/>
            {/* </ScrollView> */}
            {/* </SafeAreaView> */}

        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    scrollContainer:{
        // flex: 1,
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginVertical: 0,
        // marginHorizontal: 'auto'
    },
    textStyle:{ 
        marginBottom: 50,
        fontSize: 20
    },
    inputContainer:{
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})
