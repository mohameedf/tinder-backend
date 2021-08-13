import "reflect-metadata";
import { createConnection } from "typeorm";
import { Gender, User } from "./entity/User";

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
    let user2 = await User.findOne({
      where: { id: "576a9106-d9c6-41ab-85a4-ba121cec9e02" },
      relations: ["musics"],
    });

    console.log(user2.musics);
  })
  .catch((error) => console.log(error));
