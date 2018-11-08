import React from 'react';
//import Routes from './src/Routes';
import Menu from './src/pages/Menu';
import Menu1 from'./Menu2';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf"),
      Entypo: require("native-base/Fonts/Entypo.ttf"),
      Foundation: require("native-base/Fonts/Foundation.ttf"),
      MaterialCommunityIcons: require("native-base/Fonts/MaterialCommunityIcons.ttf"),
      MaterialIcons: require("native-base/Fonts/MaterialIcons.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Root>
        <Menu1 />
      </Root>
    );
  }
}
