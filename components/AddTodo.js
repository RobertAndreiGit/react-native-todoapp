import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View}  from 'react-native';
import Modal from "react-native-modal"

export default function AddTodo({ submitHandler, addVisibility, backdropPress }){
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    const changeHandlerTask = (val) => {
        setTask(val);
    }

    const changeHandlerDescription = (val) => {
        setDescription(val);
    }

    function handleAddPress() {
        submitHandler(task, description)
        setTask("");
        setDescription("");
    }

    return(
            <Modal 
                isVisible={addVisibility}
                onBackdropPress={backdropPress}
            >
                
                <View style={styles.containerFormContainer}>
                    <View style={styles.containerForm}>
                        <TextInput
                            stlye={styles.input}
                            placeholder='task...'
                            onChangeText={changeHandlerTask}
                        />
                        <TextInput
                            stlye={styles.input}
                            placeholder='descripion...'
                            onChangeText={changeHandlerDescription}
                        />

                        <Button
                            onPress={handleAddPress}
                            title='Add ToDo'
                            color='coral'
                        />
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
});