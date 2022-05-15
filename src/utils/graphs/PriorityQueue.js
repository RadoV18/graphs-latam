export default class PriorityQueue {
    
    constructor() {
        this.values = [];
    }

    push(pair) {
        this.values.push(pair);
        this.sort();
    }

    pop() {
        return this.values.shift();
    }
    /**
     * sort by distance from source
     * < 0: a before b
     * > 0: b before a
     * === 0: keep original order of a and b
     */
    sort() {
        this.values.sort((a, b) => a.first - b.first);
    }

    empty() {
        return this.values.length === 0;
    }
}
