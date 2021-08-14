import { Raw } from "typeorm";
import { User } from "../../../src/entity/User";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { errRes, okRes, paginate } from "../../../utility/util.service";
import { Intrest } from "../../../src/entity/Intrest";
import { Music } from "../../../src/entity/Music";
import { Match, Status } from "../../../src/entity/Match";

export default class MatchController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async request(req, res) {
    const body = req.body;
    // validate the req
    let user = req.user;
    if (!body.user2) return errRes(res, "User2 can't be empty");

    let notValid = validate(body.user2, Validator.machUser());
    if (notValid) return errRes(res, notValid);

    if (body.user2.id == req.user.id) return errRes(res, "can't add your self");

    let user2 = await User.findOneOrFail(body.user2.id);
    let match = await Match.findOne({
      where: [
        { user1: user.id, user2: user2 },
        { user2: user.id, user1: user2 },
      ],
    });
    if (match) {
      return errRes(res, `can't send request to ${user2.firstName}`);
    }
    match = await Match.create({
      user1: user,
      user2: user2,
      status: Status.PENDING,
    });

    await match.save();
    return okRes(res, { data: match });
  }

  static async accept(req, res) {
    const body = req.body;

    // validate the req
    console.log(body.user2);
    let user = req.user;
    if (!body.user2) return errRes(res, "User2 can't be empty");

    let notValid = validate(body.user2, Validator.machUser());
    if (notValid) return errRes(res, notValid);

    if (body.user2.id == req.user.id)
      return errRes(res, "can't complete this proccess");

    let user2 = await User.findOneOrFail(body.user2.id);
    let match = await Match.findOne({
      where: { user1: user2, user2: user.id, status: Status.PENDING },
    });
    if (match) {
      match.status = Status.ACCEPTED;
      await match.save();
    }
    return okRes(res, { data: match });
  }

  static async block(req, res) {
    const body = req.body;

    // validate the req
    console.log(body.user2);
    let user = req.user;
    if (!body.user2) return errRes(res, "User2 can't be empty");

    let notValid = validate(body.user2, Validator.machUser());
    if (notValid) return errRes(res, notValid);

    if (body.user2.id == req.user.id)
      return errRes(res, "can't blocked your self");

    let user2 = await User.findOneOrFail(body.user2.id);
    let match = await Match.findOne({
      where: [
        { user1: user.id, user2: user2 },
        { user2: user.id, user1: user2 },
      ],
    });
    if (match) {
      match.status = Status.BLOCKED;
      match.user1 = req.user;
      match.user2 = user2;
      await match.save();
    } else {
      match = await Match.create({
        user1: user,
        user2: user2,
        status: Status.BLOCKED,
      });
      await match.save();
    }
    return okRes(res, { data: match });
  }

  static async unBlock(req, res) {
    const body = req.body;

    // validate the req
    console.log(body.user2);
    let user = req.user;
    if (!body.user2) return errRes(res, "User2 can't be empty");

    let notValid = validate(body.user2, Validator.machUser());
    if (notValid) return errRes(res, notValid);

    if (body.user2.id == req.user.id)
      return errRes(res, "can't blocked your self");

    let user2 = await User.findOneOrFail(body.user2.id);
    let match = await Match.findOne({
      where: [{ user1: user.id, user2: user2, status: Status.BLOCKED }],
    });
    console.log(match, user.id, user2.id);

    if (match) {
      await match.remove();
    } else {
      return errRes(res, "somehting went wrong");
    }
    return okRes(res, { data: "unblock successfully" });
  }

  static async suggestions(req, res) {
    let user = await User.findOne({
      where: { id: req.user.id },
      relations: ["intrests"],
    });

    let userMatchs = await Match.find({
      where: [{ user1: user }, { user2: user }],
      relations: ["user1", "user2"],
    });
    let users = [];
    for (const intrest of user.intrests) {
      let intr = await Intrest.findOne({
        where: { id: intrest.id },
        relations: ["users"],
      });
      users = [...users, ...intr.users];
    }

    let usersFilter = {};
    users.forEach(function (x) {
      if (usersFilter[x.id]) {
        usersFilter[x.id].point += 1;
      } else if (x.id != user.id) {
        usersFilter[x.id] = { user: x, point: 1 };
      }
    });
    userMatchs.forEach((e) => {
      if (usersFilter[e.user1.id]) {
        delete usersFilter[e.user1.id];
      } else if (usersFilter[e.user2.id]) {
        delete usersFilter[e.user2.id];
      }
    });
    return okRes(res, {
      suggestions: usersFilter,
    });
  }
}
