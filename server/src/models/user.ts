import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new Schema({
  email: String,
  name: String,
  given_name: String,
  locale: String,
  sub: String,
  google_access_token: String,
  google_refresh_token: String,
  google_id_token: String
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
