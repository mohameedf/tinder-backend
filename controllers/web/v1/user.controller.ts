import { User } from "../../../src/entity/User";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { errRes, okRes, paginate } from "../../../utility/util.service";
import { Intrest } from "../../../src/entity/Intrest";
import { Music } from "../../../src/entity/Music";
import { Match, Status } from "../../../src/entity/Match";

export default class UserController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async updateIntrests(req, res) {
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

  static async updateMusics(req, res) {
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

  static async me(req, res) {
    let user = req.user;
    user = await User.findOneOrFail({
      where: { id: req.user.id },
      relations: ["intrests", "musics"],
    });
    let userMatchs = await Match.find({
      where: [
        { user1: user, status: Status.ACCEPTED },
        { user2: user, status: Status.ACCEPTED },
      ],
      relations: ["user1", "user2"],
    });

    let friends = {};
    userMatchs.forEach((e) => {
      if (!friends[e.user1.id] && e.user1.id != user.id) {
        friends[e.user1.id] = e.user1;
      } else if (!friends[e.user2.id] && e.user2.id != user.id) {
        friends[e.user2.id] = e.user2;
      }
    });
    return okRes(res, {
      data: { user, friends },
    });
  }

  static async show(req, res) {
    let user = req.user;
    let q = req.params.id;
    console.log(q);

    let showUser = await User.findOneOrFail(q);
    let match = await Match.findOne({
      where: [
        { user1: user, user2: showUser },
        { user1: showUser, user2: user },
      ],
      relations: ["user1"],
    });

    if (match && match.status == Status.BLOCKED && match.user1.id != user.id) {
      return errRes(res, "can't show this user");
    }
    return okRes(res, {
      data: { user: showUser, relationStatus: match ? match.status : null },
    });
  }
}
