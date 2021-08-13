import "reflect-metadata";
import { createConnection } from "typeorm";
import { Gender, User } from "./entity/User";
import * as express from "express";
const app = express();
import webv1 from "../route/web/v1";
import notFound from "../middlewares/web/notFound";
import * as cors from "cors";

const port = process.env.PORT || 3000;

createConnection()
  .then(async (connection) => {
    /* const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    user.gender = Gender.MALE;
    user.favorite_gender = Gender.FEMALE;
    user.phone = "07724018497";
    user.city = "baghdad";
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users); */
    /*   let user2 = await User.findOne({
      where: { id: "576a9106-d9c6-41ab-85a4-ba121cec9e02" },
      relations: ["musics"],
    });console.log(user2.musics); */
    app.use(cors());
    app.use(express.json());
    app.use("/v1", webv1);
    app.use(notFound);
    app.listen(port, () => console.log(`Running on ${port}`));
  })
  .catch((error) => console.log(error));
