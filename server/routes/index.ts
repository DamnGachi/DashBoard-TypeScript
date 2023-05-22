import passport from "passport";
import express, { Router } from "express";
import RegistryController from "../src/controllers/auth/user";
import AuthController from "../src/controllers/auth/googleAuth";

const router: Router = express();

router.post("/api/register", RegistryController.createUser);
router.get("/logged_in", AuthController.login);

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/auth/google/redirect",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.send("This is the callback route");
    }
);

export default router;
