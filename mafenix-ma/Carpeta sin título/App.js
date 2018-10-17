// Importaciones
import React from 'react';
import { StyleSheet} from 'react-native';

import Routes from './src/Routes';

export default class App extends React.Component {
  render() {
    return (
      <Routes/>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#3949ab",
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
  }
});
