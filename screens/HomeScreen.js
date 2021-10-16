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
    // headerRight AddChat 으로 챗 추가 페이지 만듦 ->  
    // firebase db collection chats에 있는 데이터를 chats에 넣음 ->
    // 챗 리스트 만듦
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
            // 가운데 
            title: 'signal',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#fff'},
            headerTitleStyle: {color: 'black'},
            headerTintColor: 'white',
            // 왼쪽
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
                     {/* <Avatar 
                        rounded
                        source={require('../assets/profile_hj.jpg')}
                    /> */}
                </TouchableOpacity>
            </View>), 
            // 오른쪽

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
        // id: id 를 단순 id 로 써도 됨!
        // Q ChatScreen으로 id, chatName 전달
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {/* firebase db.collection('chats')에 있던 id, chatName을 useEffect에서 setChats 함수로 chats 배열에 각 각 넣었음 */}
                {chats.map(({id, data:{chatName} }) => (
                    // CustomListItem에 전달
                    // CustomListItem에 enterChat전달 / enterChat함수는 이곳 HomeScreen에서 만듦 / CustomListItem에서 onPress하면 navigate - Chat으로 페이지 이동
                    // CustomListItem 대신 거기서 return하는 ListItem을 여기에 직접 넣을 경우 
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
