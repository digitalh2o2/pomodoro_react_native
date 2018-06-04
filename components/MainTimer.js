import React, { Component } from "react";
import { View, Text, Animated } from "react-native";
import { Icon } from "react-native-elements";

class MainTimer extends Component {
  constructor() {
    super();

    this.springValue = new Animated.Value(0);
  }

  spring() {
    Animated.timing(this.springValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.springValue }]
    };
    return (
      <View style={styles.timerContainer}>
        {this.props.breakTimeActive ? (
          <Animated.View style={[this.spring(), animatedStyle]}>
            <Text style={styles.textContainer}>Break Time!</Text>
          </Animated.View>
        ) : (
          <View>
            <Text style={styles.titleTextContainer}>Pomodoro Clock</Text>
          </View>
        )}
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
  },
  titleTextContainer: {
    fontSize: 36,
    textAlign: "center",
    color: "white"
  }
};

export default MainTimer;
