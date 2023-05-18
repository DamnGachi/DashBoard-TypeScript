import express, { Router } from "express";
import RegistryController from "../src/controllers/auth/user";

const router: Router = express();

router.get('/', (req, res) => {
    res.send("HELLO");
});
router.post('/api/register', RegistryController.createUser);



export default router;