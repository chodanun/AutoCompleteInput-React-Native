import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class AutocompleteExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cosmetics: [],
      query: ''
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8000/api/search/all/`).then(res => res.json()).then((json) => {
      console.log(json)
      this.setState({ cosmetics :json });
    });
  }

  findCosmetic(query) {
    if (query === '') {
      return [];
    }
    const { cosmetics } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return cosmetics.filter(cosmetic => cosmetic.name.search(regex) >= 0);
  }

  renderCosmetic(cosmetic) {
    const { name , description } = cosmetic;
    return (
      <View>
        <Text style={styles.titleText}>{name} , {description}</Text>
      </View>
    );
  }

  render() {
    const { query } = this.state;
    const cosmetics = this.findCosmetic(query);

    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={cosmetics.length === 1 && comp(query, cosmetics[0].name) ? [] : cosmetics}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter A Cosmetic Name"
          renderItem={({ name}) => (
            <TouchableOpacity onPress={() => this.setState({ query: name})}>
              <Text style={styles.itemText}>
                {name} 
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.descriptionContainer}>
          {cosmetics.length > 0 ? (
            this.renderCosmetic(cosmetics[0])
          ) : (
            <Text style={styles.infoText}>
              ENTER COSMETIC NAME {1}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

export default AutocompleteExample;
