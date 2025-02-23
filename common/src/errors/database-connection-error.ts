import { CustomError } from "./custom-error";

export class DataBaseConnectionError extends CustomError {

    statusCode = 500;
    reason:string = "Error connecting to database";
    constructor() {
        super("Error connecting to database");
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DataBaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason}];
    }
}