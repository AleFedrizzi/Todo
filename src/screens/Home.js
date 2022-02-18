import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import TodoList from '../components/TodoList';
import { todosData } from '../data/todos';
import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hideComplitedReducer, setTodosReducer } from '../redux/todosSlice'

export default function Home() {

  const todos = useSelector(state => state.todos.todos);
  
  // const [localData, setLocalData] = React.useState(
    //   todosData.sort((a, b) => {return a.isCompleted - b.isCompleted})
    // );
    
    const [isHidden, setIsHidden] = React.useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    React.useEffect(() => {
      const getTodos = async() =>{
        try {
          const todos = await AsyncStorage.getItem("@Todos");
          if(todos !== null){
            dispatch(setTodosReducer(JSON.parse(todos)));
          }
        } catch (e) {
          console.log(e);
        }
      }
      getTodos();
    }, []); 

  const handleHidePress = async () => {

    if(isHidden) {
      setIsHidden(false);
      const todos = await AsyncStorage.getItem('@Todos');
      if (todos !== null) {
        dispatch(setTodosReducer(JSON.parse(todos)));
      }
      return;
    }
    setIsHidden(true);
    dispatch(hideComplitedReducer());
    //   setLocalData(todosData.sort((a, b) => {return a.isCompleted - b.isCompleted}))
    //   return;
    // }
    // setIsHidden(!isHidden)
    // setLocalData(localData.filter(todo => !todo.isCompleted))
  }

  return (
    <View style={styles.container}>
      <Image 
      source={{ uri:'https://www.petguide.com/wp-content/uploads/2013/02/papillons-2-668x501.jpg' }}
      style={styles.pic}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Hoje</Text>
        <TouchableOpacity onPress={handleHidePress}>
          <Text style={{color: '#3478F6'}}>{isHidden ? 'Mostre os feitos' : 'Esconder os feitos'}</Text>
        </TouchableOpacity> 
      </View>

      <TodoList todosData={todos.filter(todo => todo.isToday)} />
      <Text style={styles.title}>Amanhã</Text>
      <TodoList todosData={todos.filter(todo => !todo.isToday)} />
      <TouchableOpacity onPress={() => navigation.navigate("Adicione")} style={styles.button}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 70,
  },
  pic:{
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: 'flex-end'
  },
  title:{
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 35
  },
  button:{
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 30,
    right: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus:{
    fontSize: 40,
    color: '#FFF',
    position: 'absolute',
    top: -6,
    left: 9
  },
});
