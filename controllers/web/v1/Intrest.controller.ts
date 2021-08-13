import { Intrest } from "../../../src/entity/Intrest";
import { User } from "../../../src/entity/User";
import { errRes, okRes } from "../../../utility/util.service";
/*
* intrest is a list of intrist  that are preinsered in daatabase ❗❗
*/
export default class IntrestController {
  static async getAll(req, res): Promise<object> {
    try {
      const intrests = await User.findOne({
        where: { id: req.user.id },
        relations: ["intrests"],
        select: ["intrests"],
      });
      return okRes(res, intrests);
    } catch (err) {
      console.log(err);
      return errRes(res, " somethings wrong 🥴");
    }
  }
  static async deleteOne(req, res): Promise<object> {
    try {
      const intrest = await Intrest.findOne({
        where: { id: req.params.id },
        relations: ["user"],
      });
      intrest.users = intrest.users.filter((user) => user !== req.user.id);
      await intrest.save();
      return okRes(res, {
        status: "true",
        message: "Intrest deleted successfully 🎆✨",
      });
    } catch (err) {
      console.log(err);
      return errRes(res, " somethings wrong 🥴");
    }
  }
  static async createOne(req, res): Promise<object> {
    try {
      const intrest = await Intrest.findOne(req.body.id);
      const user = await User.findOne(req.user.id);
      intrest.users.push(user);
      return okRes(res, {
        status: "true",
        message: "Intrest created successfully 🎆✨",
      });
    } catch (err) {
      console.log(err);
      return errRes(res, " somethings wrong 🥴");
    }
  }
}
