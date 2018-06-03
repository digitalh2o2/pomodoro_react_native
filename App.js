import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TimeLength from "./components/TimeLength";
import MainTimer from "./components/MainTimer";

export default class App extends React.Component {
  state = {
    timeLeft: "10:00"
  };

  startTimer = () => {
    const { timeLeft } = this.state;
    let timer = parseInt(timeLeft);
    console.log("starting timer!");
    let countDown = new Date().getTime() + timer * 60000 + 1000;
    let x = setInterval(() => {
      let now = new Date().getTime();
      let timeComplete = countDown - now;
      let minutes = Math.floor((timeComplete % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeComplete % (1000 * 60)) / 1000);
      console.log("minutes", minutes);
      console.log("seconds", seconds);
      console.log(timeComplete);
      this.setState({ timeLeft: `${minutes}:${seconds}` });
    }, 1000);
  };

  increaseTimer = () => {
    const { timeLeft } = this.state;
    let newTime = parseInt(timeLeft) + 5;
    console.log("INCREASED!");
    this.setState({ timeLeft: `${newTime}:00` });
  };

  decreaseTimer = () => {
    const { timeLeft } = this.state;
    let newTime = parseInt(timeLeft) - 5;
    console.log("DECREASED!");
    this.setState({ timeLeft: `${newTime}:00` });
  };

  render() {
    return (
      <View style={styles.container}>
        <MainTimer timeLeft={this.state.timeLeft} />
        <TimeLength
          startTimer={this.startTimer}
          increaseTimer={this.increaseTimer}
          decreaseTimer={this.decreaseTimer}
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
