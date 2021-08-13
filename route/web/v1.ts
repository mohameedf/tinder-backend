import * as express from "express";
import otp from "../../middlewares/web/otp";
import auth from "../../middlewares/web/auth";
import AuthController from "../../controllers/web/v1/auth.controller";
import UserController from "../../controllers/web/v1/user.controller";
import MatchController from "../../controllers/web/v1/matched.controller";
import IntrestController from "../../controllers/web/v1/Intrest.controller";
const route = express.Router();

/// Not Auth
route.post("/register", AuthController.register);
route.post("/otp", otp, AuthController.checkOtp);
route.post("/login", AuthController.login);

// checkout

//  Need Auth
route.use(auth);
route.post("/intrest", UserController.addIntrests);
route.post("/music", UserController.addMusics);

//matched
route.post("/match", MatchController.request);
route.post("/match/accept", MatchController.accept);
route.post("/match/block", MatchController.block);

//intrest
route.get("/intrest", IntrestController.getAll);
route.delete("/intrest/:id", IntrestController.deleteOne);
route.post("/intrest", IntrestController.createOne);
export default route;
