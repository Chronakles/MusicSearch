import React from 'react';
import { SearchBar } from 'react-native-elements';

export default class Searching extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            dataSource: [],
        };
    }


    updateSearch = (search) => {
        this.setState({ search });
    };

    makeItSearchable(text){
        let result = text;
        result.toLowerCase();
        result.replace(" ", "_");
        return result;
    }

    searchArtist(text){
        let URL = "https://www.theaudiodb.com/api/v1/json/1/search.php?s=" + text;

        fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    dataSource: responseJson['artists'],
                })
            })
            .then(() => {
                if(this.state.dataSource == null){
                    alert("Artist not found.")
                }else{
                    //alert(this.state.dataSource['0']['strArtist'])
                    this.props.navigation.navigate("API", {artist: text})
                }
            })
    }

    render() {
        const { search } = this.state;

        return (
            <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                platform={"ios"}
                returnKeyType={"done"}
                onSubmitEditing={() => {
                    let newText = this.makeItSearchable(this.state.search);
                    this.searchArtist(newText);
                }}
            />
        );
    }
}