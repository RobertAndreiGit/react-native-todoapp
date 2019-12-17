import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View }  from 'react-native';
import Modal from "react-native-modal"

export default function EditTodo({ deleteHandler, editHandler , todoVisibility, backdropPress, item, setItem }){
    const changeHandlerTask = (val) => {
        setItem({task: val, description: item.description, key:item.key})
    }

    const changeHandlerDescription = (val) => {
        setItem({task: item.task, description: val, key:item.key})
    }

    function handleEditPress() {
        editHandler(item)
    }

    function handleDeletePress() {
        deleteHandler(item.key);
    }

    return(
            <Modal 
                isVisible={todoVisibility}
                onBackdropPress={backdropPress}
            >
                
                <View style={styles.containerFormContainer}>
                    <View style={styles.containerForm}>
                        <TextInput
                            value={item.task}
                            stlye={styles.input}
                            onChangeText={changeHandlerTask}
                        />
                          
                        <TextInput
                            value={item.description}
                            stlye={styles.input}
                            onChangeText={changeHandlerDescription}
                        />

                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={handleEditPress}
                                title='Edit'
                                color='coral'
                            />

                            <Button
                                onPress={handleDeletePress}
                                title='Delete'
                                color='coral'
                            />
                        </View>
                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    },
    containerFormContainer:{
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm:{
        height: 150,
        width: 350,
        padding: 20,
        backgroundColor: 'white',
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        borderRadius: 10,
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});