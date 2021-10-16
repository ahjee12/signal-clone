import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase'

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('')

    useLayoutEffect(() =>{
        navigation.setOptions({
            title: 'Add a new chats',
            headerTitleAlign: 'center',
            // headerBackTitle: 'Chats',
            // headerTitleStyle: [{flex: 1, justifyContent: 'center', alignSelf: 'center', textAlign: 'center', textAlignVertical:'center'}],
            // headerTitleStyle: [{textAlign: 'center'}],
            // headerRight:<View/>,
        })
    }, [navigation])

    //firebase db-collection chats- chatName 항목에 useState setInput으로 넣었던 input값 저장
    const createChat = async () =>{
        await db.collection('chats').add({
            chatName: input,
        }).then(() =>{
            navigation.goBack()
        }).catch(error => alert(error))
    }
    
    return (
        <View style={styles.container}>
            {/* react native특징 - 단순onChange가 아닌 onChangeText={text => useState함수}에다가 onSubmitEditing={} */}
            {/* <Text>Add Chat Screen</Text> */}
            <Input placeholder='Enter a chat name' value={input} onChangeText={text => setInput(text)}
                leftIcon={ <Icon name='wechat' type='antdesign' size={24} color='black' />}
                onSubmitEditing={createChat}
            />
            <Button disabled={!input} onPress={createChat} title='Create new chat'> </Button>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%'
    }
}) 