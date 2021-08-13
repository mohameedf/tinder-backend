import { Raw } from "typeorm";
import { User } from "../../../src/entity/User";
import * as validate from "validate.js";
import Validator from "../../../utility/validation";
import { errRes, okRes, paginate } from "../../../utility/util.service";
import { Intrest } from "../../../src/entity/Intrest";
import { Music } from "../../../src/entity/Music";
import { Match, Status } from "../../../src/entity/Match";

/**
 *
 */
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
      where: { user1: user.id, user2: user2, status: Status.PENDING },
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
}
