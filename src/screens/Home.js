
import React from 'react'
import { Alert, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { APIurl } from '../constants'
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

// json list of locations with ids, create_date, foodName, latitude, longitude, longitude, and description
const sampleData = [
  {
    id: 1,
    create_date: '2017-01-01',
    foodName: 'Pizza',
    latitude: '37.7833',
    longitude: '-122.4167',
    description: 'Pizza is aIt is a good thing to eat'
  }, {
    id: 2,
    create_date: '2017-01-01',
    foodName: 'Steak',
    latitude: '37.7833',
    longitude: '-122.4167',
    description: 'Steak is aIt is a good thing to eat'
  }, {
    id: 3,
    create_date: '2017-01-01',
    foodName: 'Sushi',
    latitude: '37.7833',
    longitude: '-122.4167',
    description: 'Sushi is aIt is a good thing to eat'
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true
    }
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    this.fetchData()
  }

  // asks user if they are sure they want to delete a post
  open2ButtonDeleteAlert(id) {
    Alert.alert(
      'Are you sure you want to delete this post?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'Delete', onPress: () => deletePost(id)}
      ]
    )
  }

  fetchData() {
    fetch(APIurl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          isLoading: false,
          data: response.data
        })
      })
      .catch(err => console.log(err))
  }

  renderItem({ item }, props) {
    return (
      <View style={styles.rowContainer}>
        <Text>{item.foodName} {item.description} </Text>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress = {()=> {
            this.open2ButtonDeleteAlert(item._id)
            this.fetchData()
          }}
          >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // returns the list of markers for free food locations
  mapMarkers = () => {
    return this.state.data.map((item) =>  <Marker
      key = {item._id}
      coordinate = {{latitude: Number(item.latitude) , longitude: Number(item.longitude)}}
      title = {item.foodName}
      description = {item.description}
      onPress = {() => console.log('Marker Pressed')}
    ></Marker>)
  }

  render() { 
    const { navigation } = this.props
    return (
      <View style={styles.container}>
      <Text style={styles.text}>Welcome to the UC Free Food Tracker</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Create Post')}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
      <MapView
        style = {styles.map}
        initialRegion={{
          latitude: 39.1329,
          longitude: -84.5150,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0221,
        }} >
        {this.mapMarkers()}
        </MapView>
      <FlatList
        numColumns = {1}
        data={this.state.data}
        renderItem = {(item) => this.renderItem(item, this.props)}
        keyExtractor= {item => item._id}
      />
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  rowContainer: {
    flexDirection: 'row'
  },
  //centered text
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonContainer: {
    backgroundColor: '#b40b0b',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  map: {
    width: '90%',
    height: '70%'
  }
})

export default Home

// hits the api and deletes the post
function deletePost(id) {
  fetch(APIurl + '/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(err => console.log(err))
}