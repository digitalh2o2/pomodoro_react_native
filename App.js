import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import TimeLength from "./components/TimeLength";
import MainTimer from "./components/MainTimer";

export default class App extends React.Component {
  state = {
    timeLeft: "10:00",
    breakTimer: "5:00",
    timerActive: false,
    breakTimeActive: false
  };

  // to allow clearInterval to work properly
  timerId = null;

  startTimer = () => {
    const { timeLeft } = this.state;
    this.setState({ timerActive: true, breakTimeActive: false });
    let timer = parseInt(timeLeft);
    let countDown = new Date().getTime() + timer * 60000 + 1000;
    this.timerId = setInterval(() => {
      let now = new Date().getTime();
      let timeComplete = countDown - now;
      let minutes = Math.floor((timeComplete % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeComplete % (1000 * 60)) / 1000);
      console.log("minutes", minutes);
      console.log("seconds", seconds);
      if (timeComplete < 1000) {
        this.clearTimer();
        clearInterval(this.timerId);
        Alert.alert("Time's Up!", "Time for a break!", [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]);
        this.breakTime();
      }
      if (seconds < 10) {
        this.setState({ timeLeft: `${minutes}:0${seconds}` });
      } else {
        this.setState({ timeLeft: `${minutes}:${seconds}` });
      }
    }, 1000);
  };

  breakTime = () => {
    const { breakTimer } = this.state;
    this.setState({ timerActive: true, breakTimeActive: true });
    let timer = parseInt(breakTimer);
    let countDown = new Date().getTime() + timer * 60000 + 1000;
    this.timerId = setInterval(() => {
      let now = new Date().getTime();
      let timeComplete = countDown - now;
      let minutes = Math.floor((timeComplete % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeComplete % (1000 * 60)) / 1000);
      if (timeComplete < 1000) {
        this.clearTimer();
        clearInterval(this.timerId);
        Alert.alert("Break Time Over!", "Start a new session!", [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]);
      }
      if (seconds < 10) {
        this.setState({ timeLeft: `${minutes}:0${seconds}` });
      } else {
        this.setState({ timeLeft: `${minutes}:${seconds}` });
      }
    }, 1000);
  };

  clearTimer() {
    this.setState({
      timeLeft: "0:00",
      timerActive: false,
      breakTimeActive: false
    });
  }

  increaseTimer = () => {
    const { timeLeft } = this.state;
    let newTime = parseInt(timeLeft) + 1;
    if (newTime >= 60) {
      Alert.alert(
        "Max Timer!",
        "For best results in retaining information, max session is only 60 minutes.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      newTime = 60;
    }
    this.setState({ timeLeft: `${newTime}:00` });
  };

  higherIncrease = () => {
    const { timeLeft } = this.state;
    let newTime = parseInt(timeLeft) + 5;
    if (newTime >= 60) {
      Alert.alert(
        "Max Timer!",
        "For best results in retaining information, max session is only 60 minutes.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      newTime = 60;
    }
    this.setState({ timeLeft: `${newTime}:00` });
  };

  decreaseTimer = () => {
    const { timeLeft } = this.state;
    let newTime = parseInt(timeLeft) - 1;
    if (newTime <= 0) {
      Alert.alert(
        "Minumum Reached!",
        "Session can not be lower than 0 minutes. Please increase time.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      newTime = 1;
    }
    this.setState({ timeLeft: `${newTime}:00` });
  };

  higherDecrease = () => {
    const { timeLeft } = this.state;
    let newTime = parseInt(timeLeft) - 5;
    if (newTime <= 0) {
      Alert.alert(
        "Minumum Reached!",
        "Session can not be lower than 0 minutes. Please increase time.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      newTime = 1;
    }
    this.setState({ timeLeft: `${newTime}:00` });
  };

  stopTimer = () => {
    clearInterval(this.timerId);
    this.setState({
      timeLeft: "0:00",
      timerActive: false,
      breakTimeActive: false
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MainTimer
          timeLeft={this.state.timeLeft}
          breakTimeActive={this.state.breakTimeActive}
        />
        <TimeLength
          startTimer={this.startTimer}
          increaseTimer={this.increaseTimer}
          higherIncrease={this.higherIncrease}
          decreaseTimer={this.decreaseTimer}
          higherDecrease={this.higherDecrease}
          stopTimer={this.stopTimer}
          timerActive={this.state.timerActive}
        />
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
