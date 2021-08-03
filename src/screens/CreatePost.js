import React from 'react'
import {useState} from 'react'
import {Alert, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'

import {APIurl} from '../constants/index'
function CreatePost(props) {
  const { navigation } = props
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // one button alert when any input field is left empty
  const inputValidationAlert = () => {
    Alert.alert(
      'Error',
      'Please fill out all fields',
      [
        {text: 'OK', onPress: () => {}}
      ]
    )
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps='handled'
    >

      {/* INPUT FIELDS */}
      <Text style={styles.text}>Enter Title of Event:</Text>
      <TextInput 
      style = {styles.input}
      placeholder = 'e.g. Canes at TUC'
      onChangeText={(val) => setTitle(val)}
      />

      <Text style={styles.text}>Enter Description of Event:</Text>
      <TextInput 
      style = {styles.longInput}
      placeholder = 'e.g. Student Government handing out chicken and fries'
      onChangeText={(val) => setDescription(val)}
      multiline = {true}
      blurOnSubmit = {true}
      />

      <Text style={styles.text}>Enter Latitude of Event:</Text>
      <TextInput 
      style = {styles.input}
      keyboardType = 'numeric'
      placeholder = 'e.g. 39.1329'
      onChangeText={(val) => setLatitude(val)}
      />

      <Text style={styles.text}>Enter Longitude of Event:</Text>
      <TextInput 
      style = {styles.input}
      keyboardType = 'numeric'
      placeholder = 'e.g. 84.5150'
      onChangeText={(val) => setLongitude(val)}
      />

      {/* SUBMIT BUTTON */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          // alert if any input field is left empty
          if (title === '' || description === '' || latitude === '' || longitude === '') {
            inputValidationAlert()
            return
          }
          createPost(title, description, latitude, longitude)
          navigation.navigate('Home', {title: title})
        }
        }>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    flexDirection: 'row'
  },
  text: {
    color: '#101010',
    fontSize: 18,
    fontWeight: 'bold'
  },
  input: {
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 200
  },
  longInput: {
    borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 300,
      height: 200
  },
  buttonContainer: {
    backgroundColor: '#b40b0b',
    borderRadius: 5,
    padding: 10,
    margin: 20
  }
})

export default CreatePost

// hits the API to create a post
function createPost(title, description, latitude, longitude) {
  //replace with your own IP
  fetch(APIurl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      foodName: title,
      latitude: latitude,
      longitude: longitude,
      description: description
    })
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.error(err))
}