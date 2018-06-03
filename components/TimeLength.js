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
            backgroundColor="#d3d3d3"
            onPress={this.props.decreaseTimer}
          />
          {!this.props.timerActive ? (
            <Button
              raised
              large
              title="Start Timer"
              backgroundColor="#E684AE"
              onPress={this.props.startTimer}
            />
          ) : (
            <Button
              raised
              large
              title="Stop Timer"
              backgroundColor="#E684AE"
              onPress={this.props.stopTimer}
            />
          )}
          <Button
            raised
            large
            title="+"
            backgroundColor="#d3d3d3"
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
