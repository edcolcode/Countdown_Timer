import React from "react";

import Display from "./components/Display";
import Countdown from "./domain/countdown";
import "./app.css";

/**
 * Application entry point.
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    /**
     * Set target value here using the Date API
     */
    const targetDate = new Date(2019, 5, 6, 6, 6, 0);

    this.countdown = new Countdown(targetDate);
    this.countdown.subscribe("countdown", this.handleUpdate.bind(this));
    this.countdown.start();
  }

  /**
   *
   * @param {Date} countDownDetails not null value
   */
  handleUpdate(countDownDate) {
    if (!countDownDate) {
      return;
    }

    if (!(countDownDate instanceof Date)) {
      return;
    }

    const countDownTime = countDownDate.getTime();

    this.setState({
      days: Math.floor(countDownTime / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: countDownDate.getMinutes(),
      seconds: countDownDate.getSeconds()
    });
  }

  componentWillUnmount() {
    this.countdown.unsubscribe("countdown");
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;

    return (
      <div className="app">
        <Display value={days} unit="Days" />
        <Display value={hours} unit="Hours" />
        <Display value={minutes} unit="Minutes" />
        <Display value={seconds} unit="Seconds" />
      </div>
    );
  }
}
