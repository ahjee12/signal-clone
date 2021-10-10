import React, {useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import firebase from 'firebase'
import { db, auth } from '../firebase'

const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState('')

    // 상단 레이아웃 react native이미 만들어져 있는 걸 씀 
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat', 
            // 뒤로 가기 부분
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={styles.container}>
                    <Avatar rounded source={{ uri: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png' }} /> 
                    <Text style={styles.textStyle}>{route.params.chatname}</Text>
                </View>
            ),
            headerLeft: () =>{
                <TouchableOpacity style={{marginLeft: 10}} onPress={navigation.goBack}>
                    <AntDesign name='arrowleft' size={24} color='white' />
                </TouchableOpacity>
            },
            headerRight: () =>{
                <View>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white' />
                    </TouchableOpacity>
                </View>
            }
        })
    }, [navigation])

    const sendMessage = () =>{
        Keyboard.dismiss()

        db.collection('chats').doc(route.params.id).collection('message').add({
            timestamp: firebase.firestore.fieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
         
        setInput('')  
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            {/* 시계 있는 부분 */}
            <StatusBar style='light'/>

            {/* <Text>{route.params.chatname}</Text> */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'height'} style={styles.keyboardContainer} keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    {/* Chat goes here */}
                </ScrollView> 
                <View style={styles.footer}>
                    {/* input에 onSubmitEditing ={sendXXX...} 추가하기! */}
                    {/* <TextInput placeholder='Signal Message' style={styles.textInput} value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={sendMessage}/> */}
                    {/* <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                        <Ionicons name='send' size={24} color='#2B68E6' />
                    </TouchableOpacity> */}
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView> 

        // <View>
        //     <Text>{route.params.chatName}</Text>
        // </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create(
    {
    // container: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // textStyle:{
    //     color: 'white',
    //     marginLeft: 10,
    //     fontWeight: '700'
    // },
    // safeContainer:{
    //     flex: 1, backgroundColor: 'white'
    // },
    // keyboardContainer:{
    //     flex: 1,
    // },
    // footer:{
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     width: '100%',
    //     padding: 15,
    // },
    // textInput:{
    //     bottom: 0,
    //     height: 40,
    //     flex: 1,
    //     marginRight: 15,
    //     backgroundColor: '#ECECEC',
    //     padding: 10,
    //     color: 'grey',
    //     borderRadius: 30,
    // }
}
)
