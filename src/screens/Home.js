
import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { APIurl } from '../constants'

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
  }

  componentDidMount() {
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

  renderItem({ item }) {
    return (
        <Text>{item.foodName} {item.description} {item.latitude} {item.longitude} </Text>
    )
  }

  render() { 
    const { navigation } = this.props
    return (
      <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Create Post')}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
      <FlatList
        numColumns = {1}
        data={this.state.data}
        renderItem = {this.renderItem}
        keyExtractor= {item => item.id}
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
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
})

export default Home