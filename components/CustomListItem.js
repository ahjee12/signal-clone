import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar, Icon } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import account from '../assets/Missing_avatar.svg.png'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

const CustomListItem = ({id, chatName, enterChat}) => {
    return (
        // react-native에서는 onclick아닌 onPress!!
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
            {/* <Avatar 
                rounded
                icon = { faUser }
            /> */}
            <Avatar 
                rounded
                source={{ uri: 'https://ayogo.com/wp-content/uploads/2015/06/jp-avatar-placeholder.png' }}
            />
            
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: '800'}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    ABC
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
