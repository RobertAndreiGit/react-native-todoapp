import React, {useState} from 'react';
import { StyleSheet, Text, View , FlatList} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import MainScreen from './components/MainScreen'
import LoginScreen from './components/LoginScreen'

const AppNav = createStackNavigator({
  Home:{screen:LoginScreen},
  Main:{screen:MainScreen},
},{
  headerMode: 'none',
  navigationOptions:{
    headerVisible: false,
  }
})

const Application = createAppContainer(AppNav);

export default function App() {
  const [todos, setTodos] = useState([
    {text:"buy coffee", key: "1"},
    {text:"create an app", key: "2"},
    {text:"play on the switch", key:"3"},
    {text:"play on the switch", key:"4"}
  ]);

  const pressHandler = (key) => {
    setTodos(( prevTodos ) => {
      return prevTodos.filter(todo => todo.key != key);
    })
  }

  const submitHandler = (text) => {
    setTodos((prevTodos) => {
      return [{text: text, key: Math.random().toString()}, ...prevTodos];
    })
  }

  return (
    <Application />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    padding: 40,
  },
  list:{
    marginTop: 20,
  }
});
