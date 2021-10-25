import React, {useLayoutEffect, useState, useEffect} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, FontAwesome, FontAwesome5, Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import firebase from 'firebase'
import { db, auth } from '../firebase'

const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            // title: 'Chat', 
            headerTitleAlign: 'center',
            // 뒤로 가기 부분
            // headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={styles.headerTitle}>
                    {/* react-native-elements 또는 expo/vector-icons */}
                    {/* <Avatar rounded source={{ uri: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png' }} />  */}
                    {/* <Avatar rounded icon={{name: 'child',color: 'red', type: 'font-awesome'}} size="medium"/>  */}
                    <Avatar rounded source={{ uri: messages[0]?.data.photoURL,}} /> 
                    {/* <FontAwesome name='user' size={30} color='white' /> */}
                    <Text style={styles.textStyle}>{route.params.chatName}</Text>
                </View>
            ),

            headerLeft: () => (
                <TouchableOpacity style={{marginLeft: 10}} onPress={navigation.goBack}>
                    <Avatar rounded icon={{name: 'arrowleft', type: 'antdesign'}} size="medium"/> 
                    {/* <AntDesign name='arrowleft' size={24} color='white' /> */}
                </TouchableOpacity>
            ), 
          
            headerRight: () => (
               <View style={styles.headerRight}>
                    {/* justifyContent: 'center'설정만으로 세로 중심 맞추려면 size 같게 또는 alignItem: 'center' */}
                    <TouchableOpacity>
                        {/* 카메라 */}
                        {/* <Avatar rounded icon={{name: 'video-camera',color: 'red', type: 'font-awesome'}} size="medium"/>  */}
                        <FontAwesome name="video-camera" size={28} color="white" />  
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {/* 전화 */}
                        {/* <Avatar rounded icon={{name: 'phone',color: 'red', type: 'font-awesome'}} size="medium"/>  */}
                        <Ionicons name='call' size={24} color='red'></Ionicons>
                    </TouchableOpacity>
               </View>
            )
        })
    }, [navigation,messages])

    const sendMessage = () =>{
        Keyboard.dismiss();
        
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL, 
        })

        setInput('');
    }
   
    useEffect(() =>{
        const unsubscribe = db.collection('chats').doc(route.params.id)
                               .collection('messages')
                               .orderBy('timestamp','desc')
                               .onSnapshot((snapshot) => setMessages(
                                   snapshot.docs.map(doc => ({
                                       id: doc.id,
                                       data: doc.data()
                                   }))
                               ))
        
        return unsubscribe;
    },[route])

    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar style='light' /> 
            {/* keyboard 안: flex: 1 (flex-basis)*/}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'padding' : 'height'} style={styles.keyboardContainer} keyboardVerticalOffset={100}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{paddingTop: 10}}>
                            {/* chat HERE!! */}
                            {messages.map(({id, data}) => (
                                data.email === auth.currentUser.email ? (
                                    // 본인 계정
                                    <View key={id} style={styles.reciever}>
                                        <Avatar rounded size={30} source={{uri: data.photoURL}} 
                                            position='absolute' bottom={-15} right={-5} 
                                            //web
                                            containerStyle={{
                                                position:'absolute',
                                                bottom:-15, right:-5, 
                                            }}
                                        />
                                        <Text style = {styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style = {styles.sender}>
                                        <Avatar rounded size={30} source={{uri: data.photoURL}} 
                                            position='absolute' bottom={-15} left={-5} 
                                            //web
                                            containerStyle={{
                                                position:'absolute',
                                                bottom:-15, left:-5,
                                            }}/> 
                                        <Text style = {styles.senderText}>{data.message}</Text>
                                        <Text style = {styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            ) )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput value={input} onChangeText={(Text) => setInput(Text)} pnSubmitEditing={sendMessage} placeholder='Signal Message' style={styles.textInput}/>
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name='send' size={24} color='#2B68E6' />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>

        // Test
        // <View>
        //     <Text>{route.params.chatName}</Text>
        // </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    headerTitle: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    textStyle:{
        color: 'white',
        marginLeft: 5,
        fontWeight: '700'
    },
    headerRight:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 80,
        marginRight: 20
    },
    safeContainer:{
        flex: 1, backgroundColor: 'white'
    },
    keyboardContainer:{
        flex: 1,
    },
    footer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    textInput:{
        // bottom: 0,
        height: 50,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30,
    },


    reciever:{
        padding: 15, 
        backgroundColor: '#ececec',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    recieverText:{
        color: 'black',
        fontWeight: '500',
        marginRight: 10,
        // marginBottom: 15
    },
    sender:{
        padding: 15, 
        backgroundColor: '#2C6BED',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: '80%',
        position: 'relative',
    },
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    },
    
}
)
