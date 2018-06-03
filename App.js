import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import TimeLength from "./components/TimeLength";
import MainTimer from "./components/MainTimer";

export default class App extends React.Component {
  state = {
    timeLeft: "10:00",
    timerActive: false
  };

  timerId = null;

  startTimer = () => {
    const { timeLeft } = this.state;
    this.setState({ timerActive: true });
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
      }
      if (seconds < 10) {
        this.setState({ timeLeft: `${minutes}:0${seconds}` });
      } else {
        this.setState({ timeLeft: `${minutes}:${seconds}` });
      }
    }, 1000);
  };

  clearTimer() {
    this.setState({ timeLeft: "0:00" });
  }

  increaseTimer = () => {
    const { timeLeft } = this.state;
    let newTime = parseInt(timeLeft) + 1;
    this.setState({ timeLeft: `${newTime}:00` });
  };

  decreaseTimer = () => {
    const { timeLeft } = this.state;
    let newTime = parseInt(timeLeft) - 1;
    this.setState({ timeLeft: `${newTime}:00` });
  };

  stopTimer = () => {
    this.setState({ timeLeft: "0:00" });
    clearInterval(this.timerId);
    this.setState({ timerActive: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <MainTimer timeLeft={this.state.timeLeft} />
        <TimeLength
          startTimer={this.startTimer}
          increaseTimer={this.increaseTimer}
          decreaseTimer={this.decreaseTimer}
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
