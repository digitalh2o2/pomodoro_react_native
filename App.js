import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Vibration,
  Animated
} from "react-native";
import TimeLength from "./components/TimeLength";
import MainTimer from "./components/MainTimer";
import Completed from "./components/Completed";

export default class App extends React.Component {
  state = {
    timeLeft: "10:00",
    timerActive: false,
    breakTimeActive: false,
    sessionsComplete: 0,
    disableButtons: false
  };

  // to allow clearInterval to work properly
  timerId = null;
  timeComplete = null;
  minutes = null;
  seconds = null;
  fadeBackGround = new Animated.Value(0);

  getCounter = time => {
    let now = new Date().getTime();
    timeComplete = time - now;
    minutes = Math.floor((timeComplete % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((timeComplete % (1000 * 60)) / 1000);
  };

  startTimer = () => {
    const { timeLeft, sessionsComplete } = this.state;
    this.setState({
      timerActive: true,
      breakTimeActive: false,
      disableButtons: true
    });
    let timer = parseInt(timeLeft);
    let countDown = new Date().getTime() + timer * 60000 + 1000;
    this.timerId = setInterval(() => {
      this.getCounter(countDown);
      if (timeComplete < 1000) {
        clearInterval(this.timerId);
        this.setState({ sessionsComplete: sessionsComplete + 1 });
        this.clearTimer();
        Vibration.vibrate(3000);
        Alert.alert("Time's Up!", "Time for a break!", [
          { text: "OK", onPress: () => this.breakTime() }
        ]);
      }
      if (seconds < 10) {
        this.setState({ timeLeft: `${minutes}:0${seconds}` });
      } else {
        this.setState({ timeLeft: `${minutes}:${seconds}` });
      }
    }, 1000);
  };

  breakTime = () => {
    const { sessionsComplete } = this.state;
    this.setState({ timerActive: true, breakTimeActive: true });
    let timer = sessionsComplete % 4 === 0 ? 25 : 5;
    let countDown = new Date().getTime() + timer * 60000 + 1000;
    this.timerId = setInterval(() => {
      this.getCounter(countDown);
      if (timeComplete < 1000) {
        clearInterval(this.timerId);
        this.clearTimer();
        Vibration.vibrate(3000);
        Alert.alert("Break Time Over!", "Start a new session!", [
          { text: "OK", onPress: () => this.stopTimer() }
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
    this.fadeBackGround.setValue(0);
    this.setState({
      timeLeft: "0:00",
      timerActive: false,
      breakTimeActive: false,
      disableButtons: false
    });
  }

  maxAlert = sessionTime => {
    if (sessionTime >= 60) {
      Alert.alert(
        "Max Timer!",
        "For best results in retaining information, max session is only 60 minutes.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      sessionTime = 60;
    }
    this.setState({ timeLeft: `${sessionTime}:00` });
  };

  increaseTimer = amount => {
    const { timeLeft } = this.state;
    let newTime;
    if (amount === "increase") {
      newTime = parseInt(timeLeft) + 1;
    } else if (amount === "increase more") {
      newTime = parseInt(timeLeft) + 5;
    }
    this.maxAlert(newTime);
  };

  lowAlert = sessionTime => {
    if (sessionTime <= 0) {
      Alert.alert(
        "Minumum Reached!",
        "Session can not be lower than 1 minute. Please increase time.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      sessionTime = 1;
    }
    this.setState({ timeLeft: `${sessionTime}:00` });
  };

  decreaseTimer = amount => {
    const { timeLeft } = this.state;
    let newTime;
    if (amount === "low") {
      newTime = parseInt(timeLeft) - 1;
    } else if (amount === "lower") {
      newTime = parseInt(timeLeft) - 5;
    }
    this.lowAlert(newTime);
  };

  stopTimer = () => {
    const { timerActive, breakTimeActive, sessionsComplete } = this.state;
    this.fadeBackGround.setValue(0);
    if (timerActive === true && breakTimeActive === false) {
      this.setState({ sessionsComplete: 0 });
    }
    clearInterval(this.timerId);
    this.setState({
      timeLeft: "1:00",
      timerActive: false,
      breakTimeActive: false,
      disableButtons: false
    });
  };

  fadeBack = () => {
    Animated.timing(this.fadeBackGround, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  };

  render() {
    const {
      breakTimeActive,
      timerActive,
      sessionsComplete,
      disableButtons
    } = this.state;
    let backGroundColorAnimated = this.fadeBackGround.interpolate({
      inputRange: [0, 1],
      outputRange: ["#D0F0C0", "#bfe9ff"]
    });
    return (
      <Animated.View
        style={
          breakTimeActive
            ? [
                styles.breakContainer,
                this.fadeBack(),
                { backgroundColor: backGroundColorAnimated }
              ]
            : styles.container
        }
      >
        <MainTimer
          timeLeft={this.state.timeLeft}
          breakTimeActive={breakTimeActive}
          timerActive={timerActive}
        />
        <TimeLength
          startTimer={this.startTimer}
          increaseTimer={this.increaseTimer}
          higherIncrease={this.higherIncrease}
          decreaseTimer={this.decreaseTimer}
          higherDecrease={this.higherDecrease}
          stopTimer={this.stopTimer}
          timerActive={timerActive}
          breakTimeActive={breakTimeActive}
          disableButtons={disableButtons}
        />
        <Completed sessionsComplete={sessionsComplete} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0F0C0",
    alignItems: "center",
    justifyContent: "center"
  },
  breakContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
