import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

export default function LoginScreen( props ) {
    return(
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
                <TextInput
                    placeholder="username"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    style={styles.input}
                    returnKeyType={ "next" }
                    autoCapitalize="none"
                    autoCorrect={false}
                    blurOnSubmit ={false}
                    onSubmitEditing={() => {this.password.focus()}}
                />
                <TextInput
                    ref={(input) => { this.password = input; }}
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    secureTextEntry
                    returnKeyType="go"
                    style={styles.input}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.replace('Main')}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3498db",
        justifyContent: 'center',
        flexDirection: 'column',
    },
    formContainer:{
        padding: 20,
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
    },
    buttonContainer:{
        backgroundColor: '#2980b9',
        paddingVertical: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
})