import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AddTodo() {
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [isToday, setIsToday] = React.useState(false);
  const listTodos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addTodo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      hour: date.toString(),
      isToday: isToday,
      isComplited: false,
    }
    try{
      await AsyncStorage.setItem("@Todos", JSON.stringify([...listTodos, newTodo]));
      dispatch(addTodoReducer(newTodo));
      console.log("Todo salvo corretamente");
      navigation.goBack();
    } catch (e) {
        console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicione agora</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Nome</Text>
        <TextInput 
          style={styles.textInput}
          placeholder= "Tarefa"
          placeholderTextColor='#00000030'
          onChangeText={(text) => {setName(text)}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Hora</Text>
        <DateTimePicker 
        value={date}
        mode={'time'}
        is24Hour={true}
        onChange={(event, selectedDate) => setDate(selectedDate)}
        style={{width: '80%'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Hoje</Text>
        <Switch 
          value={isToday}
          onValueChange={(value) => { setIsToday(value)}}
        />
      </View>
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={{color: 'white'}}>Pronto</Text>
        </TouchableOpacity>
        <Text style={{color: '#00000060', textAlign: 'center'}}>Se você desabilitar hoje, a tarefa será considerada como amanhã</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 30,
  },
  title:{
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 10,
  },
  inputTitle:{
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24
  },
  textInput:{
    borderBottomColor: '#00000030',
    borderBottomWidth: 1,
    width: '80%'
  },
  inputContainer:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 30,
  },
  button:{
    marginTop: 30,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: 46,
    borderRadius: 11,
  }
})