import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar, Icon } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import account from '../assets/Missing_avatar.svg.png'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import { db, auth } from '../firebase'

const CustomListItem = ({id, chatName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([])

    useEffect(() =>{
        const unsubscribe = db.collection('chats').doc(id)
                              .collection('messages')
                              .orderBy('timestamp','desc')
                              .onSnapshot((snapshot) =>
                                setChatMessages(snapshot.docs.map((doc) =>doc.data()))
                              )
        return unsubscribe;
    })
    return (
        // react-native에서는 onclick아닌 onPress!!
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            {/* <Avatar 
                rounded
                icon = { faUser }
            /> */}
            <Avatar 
                rounded
                source={{ uri: chatMessages?.[0]?.photoURL || 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png' }}
            />
            
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: '800'}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
