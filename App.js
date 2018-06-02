import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TimeLength from "./components/TimeLength";
import MainTimer from "./components/MainTimer";

export default class App extends React.Component {
  state = {
    timeLeft: "10:00"
  };

  render() {
    return (
      <View style={styles.container}>
        <MainTimer timeLeft={this.state.timeLeft} />
        <TimeLength />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bfe9ff",
    alignItems: "center",
    justifyContent: "center"
  }
});
