import passport from "passport";
import express, { Router } from "express";
import RegistryController from "../src/controllers/auth/user";
import ChatRoomController from "../src/controllers/chatroom";
import AuthController from "../src/controllers/auth/googleAuth";
import auth from "../src/middleware/authenticated.middleware";

const router: Router = express();

router.get("/logged_in", AuthController.login);
router.post("/api/chatrooom", ChatRoomController.createRoom);
router.get("/api/user/current_user", RegistryController.currentUser);
router.post("/api/user/register", RegistryController.createUser);
router.post("/api/user/login", RegistryController.loginUser);
router.put("/api/user/update", auth, RegistryController.updateloginUser);
router.delete("/api/user/delete", auth, RegistryController.deleteUser);

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/auth/google/redirect",
    passport.authenticate("google", { failureRedirect: "/dick" }),
    (req, res) => {
        res.send("This is the callback route");
    }
);
export default router;
