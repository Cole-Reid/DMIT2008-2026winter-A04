// Step 1: Define the Pub/Sub System
const PubSub = {
  _subscribers: {},

  subscribe(event, callback) {
    if (!this._subscribers[event]) {
      this._subscribers[event] = [];
    }
    this._subscribers[event].push(callback);
  },

  publish(event, ...data) {
    if (this._subscribers[event]) {
      this._subscribers[event].forEach(callback => callback(...data));
    }
  }
};

// Step 2: Define the `expenses` Object
const expenses = {
    list: [],
    addExpense(...exp) {
        this.list.push(...exp);
        this.publish("update", this.list);
  },

    filterExpense(input) {
        const result = this.list.filter(exp => {
        if (
            exp.title.toLowerCase().includes(input.toLowerCase()) ||
            exp.category.toLowerCase().includes(input.toLowerCase()) ||
            exp.date.toLowerCase().includes(input.toLowerCase()) ||
            exp.amount.toString().toLowerCase().includes(input.toLowerCase())) {
            return true;
        }
    });
    this.publish("update", result);
  },
    clear() {
        this.list = [];
        this.publish("update", this.list);
  }
};