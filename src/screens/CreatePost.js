import React from 'react'
import {useState} from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Title of Event:</Text>
      <TextInput style = {styles.input}/>
      <Text style={styles.text}>Enter Description of Event:</Text>
      <TextInput style = {styles.input}/>
      <Text style={styles.text}>Enter Latitude of Event:</Text>
      <TextInput style = {styles.input}
      keyboardType = 'numeric'
      />
      <Text style={styles.text}>Enter Longitude of Event:</Text>
      <TextInput style = {styles.input}
      keyboardType = 'numeric'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 200
  }
})

export default CreatePost