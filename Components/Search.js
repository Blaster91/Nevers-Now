import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native'
import FilmItem from './FilmItem.js'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi.js'



class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isLoading: false
    }
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
        this._loadFilms()
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayDetailForFilm = (idFilm) => {
      this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

  render(){
    return (
      <View style={styles.main_container}>
      <View style={styles.main_container1}>
        <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput}  placeholder="Titre du film"/>
        <Button style={{height: 160}} title="Rechercher" onPress={() =>this._searchFilms()}/>
      </View>
        <View style={styles.main_container2}>
          <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}

          onEndReachThreashold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages){
              this._loadFilms()
            }
          }}
          renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
          />
          {this._displayLoading()}
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
    width: "100%",
  },
  main_container1: {
    backgroundColor: 'white',
    width: "100%",
    padding: 10
  },
  main_container2: {
    backgroundColor: '#dedede',
    width: "100%",
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10
  },
  textinput: {
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    paddingLeft: 5,
    backgroundColor: 'white',
    marginBottom: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
