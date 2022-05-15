export default class UnionFind {
    constructor(vertexCount) {
        this.parent = new Array(vertexCount);
        this.rank = new Array(vertexCount);
        for(let i = 0; i < vertexCount; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }

    findSet(i) {
        return this.parent[i] === i ? i : (this.parent[i] = this.findSet(this.parent[i]));
    }

    isSameSet(i, j) {
        return this.findSet(i) === this.findSet(j);
    }

    unionSet(i, j) {
        if(!this.isSameSet(i, j)) {
            let x = this.findSet(i);
            let y = this.findSet(j);
            if(this.rank[x] > this.rank[y]) {
                this.parent[y] = x;
            } else {
                this.parent[x] = y;
                if(this.rank[x] === this.rank[y]) {
                    this.rank[y]++;
                }
            }
        }
    }
};