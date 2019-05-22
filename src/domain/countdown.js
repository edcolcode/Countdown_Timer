/**
 * Creates a countdown logic.
 * @param {Date} targetTimeStamp target timestamp value.
 */
const Countdown = function(targetTimeStamp) {
  const listeners = {};
  const interval = null;
  let invalidConfiguration = false;

  if (!targetTimeStamp) {
    console.error("Target value must be a not null value");
    invalidConfiguration = true;
  }

  if (!(targetTimeStamp instanceof Date)) {
    console.error("Target value must be a valid Date instance");
    invalidConfiguration = true;
  }

  // Clear interval
  window.onbeforeunload = () => {
    if (interval) {
      clearInterval(interval);
    }
  };

  /**
   * Starts the countdown
   */
  const start = function() {
    if (invalidConfiguration) {
      console.error(
        "Unable to initialize the countdown. Invalid configuration."
      );
      return;
    }

    const interval = setInterval(() => {
      const remaingTime = targetTimeStamp.getTime() - new Date().getTime();

      let newDate = new Date(remaingTime);

      if (remaingTime < 0) {
        newDate = new Date(0);
      }

      // Notify listeners
      Object.keys(listeners).forEach(listenerId =>
        listeners[listenerId](newDate)
      );

      if (remaingTime <= 0) {
        clearTimeout(interval);
      }
    }, 1000);
  };

  /**
   * Adds a subscriptor to be notify about the updates.
   * @param {string} id identifier of the subscriber
   * @param {function} callBack function that will receive notifications.
   * returns true if the listenar was subscribed correctly false otherwise.
   */
  const subscribe = function(id, callBack) {
    let result = true;

    if (!listeners[id]) {
      listeners[id] = callBack;
    } else {
      result = false;
    }

    return result;
  };

  /**
   * Removes a subscriptor.
   * @param {string} id of the subscriptor.
   */
  const unsubscribe = function(id) {
    let result = true;

    delete listeners.id;

    return result;
  };

  return {
    start,
    subscribe,
    unsubscribe
  };
};

export default Countdown;
