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
      this.page = 0 // Compteur pour connaître la page courante
      this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
      this.state = {
        films: [],
        isLoading: false
      }
  }


  // Components/Search.js

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
_displayLoading(){
  if(this.state.isLoading) {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}
_searchFilms(){
  this.page = 0
  this.totalPages = 0
  this.setState({
    films: []
  })
  console.log("Page : " + this.page + " / totalPages : " + this.totalPages + " / nombre de films : " + this.state.films.length)
  this._loadFilms()
}
_searchTextInputChanged(text) {
  this.searchedText = text
}
  render(){
    console.log(this.state.isLoading);
    return (
      <View style={styles.main_container}>
      <View style={styles.main_container1}>
        <TextInput onSubmitEditing={() => this._loadFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput}  placeholder="Titre du film"/>
        <Button style={{height: 50}} title="Rechercher" onPress={() =>this._searchFilms()}/>
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
          renderItem={({item}) => <FilmItem film={item}/>}
          />
          {this._displayLoading()}
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
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
