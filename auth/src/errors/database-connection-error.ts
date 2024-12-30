export class DataBaseConnectionError extends Error {

    statusCode = 500;
    reason:string = "Error connecting to database";
    constructor() {
        super();
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
    }

    serizalizeErrors() {
        return [{ message: this.reason}];
    }
}