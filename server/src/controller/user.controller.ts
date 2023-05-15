import { Request, Response } from "express"
import { CreateUserInput, VerifyUserInput } from "../dto/user.schema";
import { createUser } from "../service/user.service";
import sendEmail from "../utils/mailer";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response
) {
    const body = req.body

    try {
        const user = await createUser(body);

        await sendEmail({
            from: 'test@example.com',
            // to: user.email,
            subject: "plase",
            // text: `code ${user.verificationCode}`
        })

        return res.send("user created successfully")

    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(409).send("account already exists")
        }
        return res.status(500).send(error)
    }
}
export async function verifyUserHandler(
    req: Request<VerifyUserInput>,
    res: Response
  ) {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;
  
    // find the user by id
    const user = await findUserById(id);
  
    if (!user) {
      return res.send("Could not verify user");
    }
  
    // check to see if they are already verified
    if (user.verified) {
      return res.send("User is already verified");
    }
  
    // check to see if the verificationCode matches
    if (user.verificationCode === verificationCode) {
      user.verified = true;
  
      await user.save();
  
      return res.send("User successfully verified");
    }
  
    return res.send("Could not verify user");
  }
  