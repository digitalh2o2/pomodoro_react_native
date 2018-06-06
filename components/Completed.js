import React, { Component } from "react";
import { View, Text } from "react-native";

class Completed extends Component {
  render() {
    return (
      <View style={styles.sessionContainer}>
        <Text style={styles.textContainer}>
          Sessions In A Row Complete: {this.props.sessionsComplete}{" "}
        </Text>
      </View>
    );
  }
}

const styles = {
  sessionContainer: {
    marginTop: 20
  },
  textContainer: {
    fontSize: 18,
    color: "white"
  }
};

export default Completed;
