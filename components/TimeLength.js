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
            disabled={this.props.disableButtons}
            fontSize={24}
            large
            title="-"
            backgroundColor="#d3d3d3"
            onPress={this.props.decreaseTimer}
            onLongPress={this.props.higherDecrease}
          />
          {!this.props.timerActive ? (
            <Button
              raised
              fontSize={24}
              large
              title="Start Timer"
              backgroundColor="#E684AE"
              onPress={this.props.startTimer}
            />
          ) : (
            <Button
              raised
              fontSize={24}
              large
              title="Stop Timer"
              backgroundColor="#E684AE"
              onPress={this.props.stopTimer}
            />
          )}
          <Button
            raised
            disabled={this.props.disableButtons}
            fontSize={24}
            large
            title="+"
            backgroundColor="#d3d3d3"
            onPress={this.props.increaseTimer}
            onLongPress={this.props.higherIncrease}
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
