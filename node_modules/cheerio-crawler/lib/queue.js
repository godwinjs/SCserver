const assert = require('assert');

class Queue {

    constructor() {
        this.unvisited = [];
        this.visited = [];
    }

    add(value) {
        assert(Boolean(value), 'must not add falsy value to queue', value);
        if (!this.wasAdded(value)) {
            this.unvisited.push(value);
        }
    }

    wasAdded(value) {
        return this.unvisited.concat(this.visited).indexOf(value) >= 0;
    }

    next() {
        if (this.unvisited.length > 0) {
            var value = this.unvisited.shift();
            this.visited.push(value);
            return value;
        }
        else {
            return false;
        }
    }

    clear() {
        this.unvisited = [];
    }
}

module.exports = Queue;
