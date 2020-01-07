import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function TodoItem({ item, pressHandler }){
    return(
        <TouchableOpacity style={styles.item} onPress={() => pressHandler(item.key)}>
            <Text style={styles.title}>
                {item.task}
            </Text>
            <Text style={styles.subtitle}>
                {item.status}
            </Text>
        </TouchableOpacity>
    )
}

const styles =  StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10
    },
    title:{
        fontWeight: 'bold',
    },
    subtitle:{
        color: 'rgba(0,0,0,0.5)',
    }
})