import { models, model, Schema } from "mongoose";

export type ProfileInfo = {
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
};

const profileInfoSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    displayName: { type: String },
    bio: { type: String },
    avatarUrl: { type: String },
    coverUrl: { type: String },
  },
  { timestamps: true }
);

// check if model already exists, if not then create the model otherwise just return the array
export const ProfileInfoModel =
  models?.ProfileInfo || model<ProfileInfo>("ProfileInfo", profileInfoSchema);
