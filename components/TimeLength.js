import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

class TimeLength extends Component {
  render() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <Button raised large title="-" backgroundColor="#fd1d1d" />
          <Button raised large title="Start Timer" backgroundColor="#E684AE" />
          <Button raised large title="+" backgroundColor="#45B649" />
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
