import express, { Response, Request } from "express";
import { body , validationResult} from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DataBaseConnectionError } from "../errors/database-connection-error";


const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    res.send("You are good to go ....");
    throw new DataBaseConnectionError();
  }
);

export { router as signUprouter };
