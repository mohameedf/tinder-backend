export default class Validate {
  constructor(parameters) {}

  static register = (must = true) => ({
    firstname: {
      presence: must,
      type: "string",
    },
    lastname: {
      presence: must,
      type: "string",
    },
    age: {
      presence: must,
      type: "number",
    },
    gender: {
      presence: must,
      type: "string",
    },
    favorite_gender: {
      presence: must,
      type: "string",
    },
    phone: {
      presence: must,
      type: "string",
    },
    city: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
    bio: {
      presence: false,
      type: "string",
    },
    image: {
      presence: false,
      type: "string",
    },
  });

  static login = (must = true) => ({
    phone: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });

  static forget = (must = true) => ({
    phone: {
      presence: must,
      type: "string",
    },
  });

  static verifyPassword = (must = true) => ({
    passwordOtp: {
      presence: must,
      type: "string",
    },
    newPassword: {
      presence: must,
      type: "string",
    },
  });

  static addCheck = (must = true) => ({
    id: {
      presence: must,
      type: "number",
    },
  });

  static machUser = (must = true) => ({
    id: {
      presence: must,
      type: "string",
    },
  });
}
