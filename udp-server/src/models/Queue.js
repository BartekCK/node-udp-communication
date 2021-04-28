class Queue {
    listOperations = [];

    constructor() {
        this.loop();
    }

    loop = async () => {
        setInterval(async () => {
                const asyncFunc = this.listOperations.shift();
                if (asyncFunc) {
                    await asyncFunc();
                }
            }
        )

    }

    addToList = (operation) => {
        this.listOperations.push(operation);
    }
}

module.exports = new Queue();
