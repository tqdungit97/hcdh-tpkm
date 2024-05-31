/* eslint-disable @typescript-eslint/no-explicit-any */

export class Observer<T> {
  state: T | undefined;
  reducers = {};
  subscribers: ((state?: T) => void)[] = [];
  static instance: Observer<any>;

  constructor(initialState?: T) {
    if (!Observer.instance) {
      this.state = initialState;
      this.subscribe = this.subscribe.bind(this);
      this.unsubscribe = this.unsubscribe.bind(this);
      Observer.instance = this;
    }
    return Observer.instance as Observer<T>;
  }

  subscribe(fn: (state?: T) => void) {
    this.subscribers = [...this.subscribers, fn];
    return () => this.unsubscribe(fn);
  }

  unsubscribe(fn: (state: T) => void) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== fn
    );
  }

  dispatch(state: T) {
    this.state = state;
    this.subscribers.forEach((fn) => fn(this.state));
  }
}

export default Observer;
