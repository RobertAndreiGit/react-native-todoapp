import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage} from 'react-native';

export default function LoginScreen( props ) {
    let [loginUsername, setLoginUsername] = useState('');
    let [loginPassword, setLoginPassword] = useState('');

    function login() {
        fetch('http://192.168.0.122:8080/task_manager/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username: loginUsername,
                password: loginPassword,
            })
        })
        .then((res) => res.json())
        .then((res)=>{
            if(res.error===false){
                saveUser(res.user).then(()=>{
                    saveJwt(res.jwt).then(()=>{
                        props.navigation.navigate('Main',{user:res.user,connected:true});
                    });
                });
            }
            else{
                //alert(res.message);
            }
        })
        .catch((error)=>{
            //alert(error);
            getUser().then((foundUser)=>{
                if(foundUser.username===loginUsername && foundUser.password===loginPassword)
                {
                    props.navigation.navigate('Main',{user:foundUser,connected:false});
                }
                else
                {
                    alert("Wrong username or password");
                }
            });
        })
        .done();
        //props.navigation.navigate('Main');
    }

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
                    onChangeText={(newuser)=>setLoginUsername(newuser)}
                    value={loginUsername}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    secureTextEntry
                    returnKeyType="go"
                    onChangeText={(newpass)=>setLoginPassword(newpass)}
                    style={styles.input}
                    value={loginPassword}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={login}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

async function saveUser(userToSave)
{
    let json=await AsyncStorage.setItem('user',JSON.stringify(userToSave));
}

async function saveJwt(jwt)
{
    await AsyncStorage.setItem('jwt',jwt);
}

async function getUser()
{
    const retrievedItem =  await AsyncStorage.getItem('user');
    const item = JSON.parse(retrievedItem);
    return item;
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