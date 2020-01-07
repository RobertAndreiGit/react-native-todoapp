import React, {useState, useEffect} from 'react';
import { StyleSheet, View , FlatList, Text, Linking, TouchableOpacity, AsyncStorage} from 'react-native';
import Header from './Header'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import EditTodo from './EditTodo'

export default function App(props) {
  const [todos, setTodos] = useState([]);
  const [addVisibility, setAddVisibility] = useState(false);
  const [todoVisibility, setTodoVisibility] = useState(false);
  const [item, setItem] = useState("");
  const currentUser = props.navigation.getParam('user','default');

  const pressHandler = (key) => {
    setItem(todos.find(it => it.key === key));
    setTodoVisibility(true);

    saveArray(todos);
  }

  function setArray(){
    getArray().then(res => setTodos(res));
  }

  const deleteHandler = (key) => {
    setTodoVisibility(false);
    setTodos(( prevTodos ) => {
          return prevTodos.filter(todo => todo.id != key);
    })

    deleteTransaction(key);
  }

  const editHandler = (itm) => {
    setTodoVisibility(false);
    setTodos(( prevTodos ) => {
          return prevTodos.map(todo => {
            if(todo.id === itm.id){
                return itm;
            }
            return todo;
          })
    })

    updateTransaction(itm.id, itm);
  }

  const submitHandler = (task, status) => {
    setAddVisibility(false);

    let nextId = 1;
    if(todos.length > 0){
      nextId = todos[todos.length-1].id + 1;
    }

    if(task.length > 2 && status.length > 2)
        setTodos((prevTodos) => {
          return [{task: task, status: status, id: nextId, user:currentUser}, ...prevTodos];
        })

    //saveArray(todos);
    addTransaction(task, status, nextId);
  }

  const backdropPressAdd = () =>{
    setAddVisibility(false);
  }
  const backdropPressTodo = () =>{
    setTodoVisibility(false);
  }

  const sendTransactionsData = () =>{
    getJwt().then((jwt)=>{
        auth="Bearer "+jwt;
        getArray().then((arr)=>{
            fetch('http://192.168.0.122:8080/task_manager/addLocalTasks2',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':auth
                },
                body:JSON.stringify({
                    taskArrayList:arr
                })
            })
            .then((response)=>response.json())
            .then((res)=>{
                if(res.error===false){
                    
                }
                else{
                    alert(res.message);
                }
            })
            .catch((exception)=>{
                
            })
            .done();
        });
    });
  }

  const loadTasks = (id, connected) =>{
    if(connected)
    {
        getJwt().then((jwt)=>{
            auth="Bearer "+jwt;
            fetch('http://192.168.0.122:8080/task_manager/getTasks/'+id,{
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':auth
                },
            })
            .then((response)=>response.json())
            .then((res)=>{
                if(res.length>0){
                    setTodos([]);
                    for(let i=0;i<res.length;i++)
                    {
                        let transaction=res[i];

                        setTodos((prevTodos) => {
                          return [{task: transaction.task, status: transaction.status, user:transaction.user, id: transaction.id}, ...prevTodos];
                        })
                    }

                    saveArray(todos);
                }
                else{
                    alert(res.message);
                }
            })
            .catch((exception)=>{
                getArray().then((array)=>{
                    if(array==null)
                    {
                        saveArray([]);
                    }

                    setTodos({transactionArray:array});
                })
                .catch((exception)=>{
                    saveArray([]);
                });
            })
            .done();
        });
    }
    else
    {
        getArray().then((array)=>{
            if(array==null)
            {
                saveArray([]);
            }

           setTodos({transactionArray:array});
        })
        .catch((exception)=>{
            saveArray([]);
        });
    }
  }

  const addTransaction = (task, status, nextId) => {
    getJwt().then((jwt)=>{
      auth="Bearer "+jwt;
      fetch('http://192.168.0.122:8080/task_manager/addTask',{
          method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization':auth
          },
          body:JSON.stringify({
            id:nextId,
            task:task,
            status:status,
            user:currentUser
          })
      })
      .catch((err) => {/*offline*/})
      .done();
    });

    getArray().then((arr) => {
      arr.push({id:nextId,
        task:task,
        status:status,
        user:currentUser});
      saveArray(arr);
    });
  }

  const updateTransaction = (id,newTask) => {
    /*console.log(JSON.stringify({
      task:newTask
    }));*/
    getJwt().then((jwt)=>{
      auth="Bearer "+jwt;
      fetch('http://192.168.0.122:8080/task_manager/updateTask/'+id,{
          method:'PUT',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              'Authorization':auth
          },
          body:JSON.stringify({
            id:newTask.id,
            task:newTask.task,
            status:newTask.status,
            user:newTask.user
          })
      })
      .catch((err) => {/*offline*/})
      .done();
    });

    saveArray(todos);
  }

  const deleteTransaction = (id) => {
    getJwt().then((jwt)=>{
        auth="Bearer "+jwt;
        fetch('http://192.168.0.122:8080/task_manager/deleteTask/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':auth
            },
        })
        .catch((err) => {/*offline*/})
        .done();
    });

    saveArray(todos);
  }

  useEffect(() => {
    setArray();
    sendTransactionsData();

    props.navigation.addListener("didFocus", () => {
      loadTasks(props.navigation.getParam('user','default').id,props.navigation.getParam('connected','default'));
    });
  }, []);

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
                    keyExtractor={(item,index) => index.toString()}
                />
        </View>
      </View>
    </View>
  );
}

async function saveArray(array){
  await AsyncStorage.setItem('transactionArray',JSON.stringify(array));
  console.log(array);
}

async function getArray(){
  const retrievedItem =  await AsyncStorage.getItem('transactionArray');
  const item = JSON.parse(retrievedItem);
  console.log(item);
  return item;
}

async function getJwt(){
  const jwt =  await AsyncStorage.getItem('jwt');
  return jwt;
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
