import React, {useState} from 'react';
import { StyleSheet, View , FlatList, Text, Linking, TouchableOpacity } from 'react-native';
import Header from './Header'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'

export default function App() {
  const [todos, setTodos] = useState([
    {task:"coffee", description: "buy", key: "1"},
    {task:"app", description: "create", key: "2"},
    {task:"switch", description: "play", key:"3"}
  ]);
  const [addVisibility, setAddVisibility] = useState(false);
  const [todoVisibility, setTodoVisibility] = useState(false);
  const [item, setItem] = useState("");

  const pressHandler = (key) => {
    setItem(todos.find(it => it.key === key));
    setTodoVisibility(true);
  }

  const deleteHandler = (key) => {
    setTodoVisibility(false);
    setTodos(( prevTodos ) => {
          return prevTodos.filter(todo => todo.key != key);
    })
  }

  const editHandler = (itm) => {
    setTodoVisibility(false);
    setTodos(( prevTodos ) => {
          return prevTodos.map(todo => {
            if(todo.key === itm.key){
                return itm;
            }
            return todo;
          })
    })
  }

  const submitHandler = (task, description) => {
    setAddVisibility(false);

    if(task.length > 2 && description.length > 2)
        setTodos((prevTodos) => {
        return [{task: task, description: description, key: Math.random().toString()}, ...prevTodos];
        })
  }

  const backdropPressAdd = () =>{
    setAddVisibility(false);
  }
  const backdropPressTodo = () =>{
    setTodoVisibility(false);
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL('google.navigation:q=46.770920+23.589920')}
        >
            <Text style={styles.buttonText}>
                MAP
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
                style={styles.button}
                onPress={() => setAddVisibility(true)}
        >
            <Text style={styles.buttonText}>
                ADD
            </Text>
        </TouchableOpacity>
        <AddTodo
            submitHandler={submitHandler}
            addVisibility={addVisibility}
            backdropPress={backdropPressAdd}
        />
        <EditTodo 
            todoVisibility={todoVisibility}
            backdropPress={backdropPressTodo}
            item={item}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            setItem={setItem}
        />
        <View style={styles.list}>
                <FlatList
                    nestedScrollEnabled = {true}
                    data={todos}
                    renderItem={({ item }) => (
                    <TodoItem 
                        item={item}
                        pressHandler={pressHandler}
                    />
                    )}
                />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    padding: 40,
    flex: 1,
  },
  list:{
    flex: 1,
    marginTop: 20,
  },
  button:{
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'coral',
      margin: 5,
      padding: 5,
  },
  buttonText:{   
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
