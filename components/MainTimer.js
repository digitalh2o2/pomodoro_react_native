import React, { Component } from "react";
import { View, Text } from "react-native";

class MainTimer extends Component {
  render() {
    return (
      <View style={styles.timerContainer}>
        <Text style={styles.textContainer}>{this.props.timeLeft}</Text>
      </View>
    );
  }
}

const styles = {
  timerContainer: {
    marginBottom: 20
  },
  textContainer: {
    fontSize: 64,
    textAlign: "center",
    color: "white"
  }
};

export default MainTimer;
