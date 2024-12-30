export class DataBaseConnectionError extends Error {

    reason:string = "Error connecting to database";
    constructor() {
        super();
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
    }
}