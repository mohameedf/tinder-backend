import validate = require("validate.js");
import { Contact } from "../../../src/entity/Contact";
import { UserContact } from "../../../src/entity/UserContact";
import { okRes, errRes } from "../../../utility/util.service";
import validation from "../../../utility/validation";

export default class ContactController {
  static async getAll(req, res): Promise<object> {
    try {
      let contactUsers = await UserContact.findOne({
        where: { userId: req.user.id },
        relations: ["contact"],
      });
      return okRes(res, {
        success: "true",
        message: "contact info has been added successfully 🎆✨",
        data: contactUsers.contact,
      });
    } catch (err) {
      console.log(err);
      return errRes(res, {
        success: "false",
        message: "somethings wrong 🔴",
      });
    }
  }
  static async add(req, res): Promise<object> {
    const body = req.body;
    let notValid = validate(body, validation.contactInfo);
    if (notValid)
      return errRes(res, {
        status: "false",
        errs: notValid,
      });
    try {
      const userContacts = new UserContact();
      userContacts.user = req.user.id;
      userContacts.contact = body.contactId;
      userContacts.url = body.url;
      userContacts.save();
      return okRes(res, {
        success: "true",
        message: "contact info has been added successfully 🎆✨",
        data: userContacts,
      });
    } catch (err) {
      console.log(err);
      return errRes(res, {
        success: "false",
        message: "somethings wrong 🔴",
      });
    }
  }
}
