import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

class TimeLength extends Component {
  render() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <Button
            raised
            large
            title="-"
            backgroundColor="#647381"
            onPress={this.props.decreaseTimer}
          />
          <Button
            raised
            large
            title="Start Timer"
            backgroundColor="#E684AE"
            onPress={this.props.startTimer}
          />
          <Button
            raised
            large
            title="+"
            backgroundColor="#647381"
            onPress={this.props.increaseTimer}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center"
  }
};

export default TimeLength;
