const mongoose = require("mongoose");

const emailValidator = {
  validator: function (v) {
    const pattern = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return pattern.test(v);
  },

  message: "`{VALUE}` is invalid syntax of `{PATH}`",
};

const emailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      validate: emailValidator,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("email", emailSchema);
