export class DataBaseConnectionError extends Error {

    reason:string = "";
    constructor() {
        super();
        this.reason = "Error connecting to database";
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
    }
}