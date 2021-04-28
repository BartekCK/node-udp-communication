
class Queue {
    listOperations = [];

    addToList = (operation) => {
        this.listOperations.push(operation);
        console.log(this.listOperations);
    }
}

module.exports = new Queue();
