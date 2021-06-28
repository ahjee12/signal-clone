import React, {useState, useLayoutEffect, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { ListItem, Avatar, Icon } from 'react-native-elements'
import {auth, db} from '../firebase'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([])

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    // 왜 unsubscribe일까 
    // firebase db collection chats에 있는 데이터를 chats에 넣음
    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => 
            setChats(snapshot.docs.map(doc =>({
                id: doc.id,
                data: doc.data()
            })))
        )
        return unsubscribe
    }, [])

    // 상단 레이아웃 
    useLayoutEffect(() =>{
        navigation.setOptions({
            title: 'signal',
            headerStyle: {backgroundColor: '#fff'},
            headerTitleStyle: {color: 'black'},
            headerTintColor: 'white',
            headerLeft: () =>(
            <View style={{marginLeft: 20}}>
                <TouchableOpacity activeOpacity= {0.5} onPress={signOutUser}>
                    {/* <Avatar 
                        rounded
                        icon = { {name: 'user', type: 'font-awesome'}}
                    /> */}
                    <Avatar 
                        rounded
                        source={{ uri: auth?.currentUser?.photoURL }}
                    />
                </TouchableOpacity>
            </View>), 
            headerRight: () =>(
            <View style={styles.headerRightviewStyle}>
                <TouchableOpacity activeOpacity = {0.5} >
                    <AntDesign name='camerao' size={24} color='black' />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity = {0.5} onPress={() => navigation.navigate('AddChat')}>
                    <SimpleLineIcons name='pencil' size={24} color='black' />
                </TouchableOpacity>
            </View>
            )     
        })
    },[navigation])

    // UI는 컴포넌트 & 클릭은  
    const enterChat = (id, chatName) => {
        // js6버전
        // id: id -> id 로 써도 됨!
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data:{chatName} }) => (
                    // CustomListItem에 전달
                    // CustomListItem에 enterChat전달 / enterChat함수는 이곳 HomeScreen에서 만듦 / CustomListItem에서 onPress하면 navigate - Chat으로 페이지 이동
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen 

const styles = StyleSheet.create({
    container:{
        height: '100%'
    },
    headerRightviewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 80,
        marginRight: 20
    }
})
