import React from 'react';
import image from "./perfil.jpg"
import {client} from '../utils/graphQLUtils';
import gql from "graphql-tag";
import { View, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";

export default class Teachers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false
    };
  }
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    if(this.state.page <= 5){
    
    const { page } = this.state;
    this.setState({ loading: true });
      client.query({
        query: gql`query{
          allTeachers(page:${page}){
            id
            name
            description
          }
        }
        `
      }).then(res => {
               ///codigo
               console.log(res.data.allTeachers);
               this.setState({
                data: page === 1 ? res.data.allTeachers : [...this.state.data, ...res.data.allTeachers],
                error: res.error || null,
                loading: false,
                refreshing: false
              });
      })
      .catch(error => {
          console.log(error);
          this.setState({ error, loading: false });
        });
      }
  };


  handleRefresh = () => {
    if(this.state.page <= 5){
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  }
  };

  handleLoadMore = () => {
    if(this.state.page <= 5){
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Buscar..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name} `}
              subtitle={item.description}
              avatar={ image}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}