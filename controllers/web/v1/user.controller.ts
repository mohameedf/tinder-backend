import { Raw } from "typeorm";
import { User } from "../../../src/entity/User";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { errRes, okRes, paginate } from "../../../utility/util.service";
import { Intrest } from "../../../src/entity/Intrest";
import { Music } from "../../../src/entity/Music";

/**
 *
 */
export default class UserController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async addIntrests(req, res) {
    const body = req.body;
    // validate the req

    if (!Array.isArray(body.intrests) || body.intrests.length < 1)
      return errRes(res, "intrests must by array");
    let intrests = [];
    for (const intrest of body.intrests) {
      let notValid = validate(intrest, Validator.addCheck());
      if (notValid) return errRes(res, notValid);
      let intr = await Intrest.findOneOrFail(intrest.id);
      intrests.push(intr);
    }
    let user = await User.findOne({
      where: { id: req.user.id },
      relations: ["intrests"],
    });
    user.intrests = intrests;

    await user.save();

    return okRes(res, { intrests: user.intrests });
  }

  static async addMusics(req, res) {
    const body = req.body;
    if (!Array.isArray(body.musics) || body.musics.length < 1)
      return errRes(res, "musics must by array");
    let musics = [];
    for (const music of body.musics) {
      let notValid = validate(music, Validator.addCheck());
      if (notValid) return errRes(res, notValid);
      let intr = await Music.findOneOrFail(music.id);
      musics.push(intr);
    }
    let user = await User.findOne({
      where: { id: req.user.id },
      relations: ["musics"],
    });
    user.musics = musics;

    await user.save();

    return okRes(res, { musics: user.musics });
  }
}
