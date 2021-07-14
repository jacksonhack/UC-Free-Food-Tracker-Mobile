import React from 'react'
import {useState} from 'react'
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'

function CreatePost(props) {
  const { navigation } = props
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);

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
        onPress={() => navigation.navigate('Home')
          //TODO: HIT API HERE TO CREATE (DO INPUT VALIDATION)
        }>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </ScrollView>
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
  },
  longInput: {
    borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 300,
      height: 200
  }
})

export default CreatePost