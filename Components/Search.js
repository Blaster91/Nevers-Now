import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  Text
} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'




class Search extends React.Component {

  _loadFilms() {
      getFilmsFromApiWithSearchedText("star").then(data => console.log(data));
  }

  render(){
    return (
      <View style={styles.main_container}>
      <View style={styles.main_container1}>
        <TextInput style={styles.textinput}  placeholder="Titre du film"/>
        <Button style={{height: 50}} title="Rechercher" onPress={() =>this._loadFilms()}/>
      </View>
        <View style={styles.main_container2}>
          <FlatList
            data={films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmItem film={item}/>}
          />
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
  }
})

export default Search
