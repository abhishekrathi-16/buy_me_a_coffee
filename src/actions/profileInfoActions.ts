"use server";
import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function saveProfile(formData: FormData) {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const session = await getServerSession(authOptions);

  if (!session) throw "You need to be logged in.";

  const email = session.user?.email;
  const { username, displayName, bio, coverUrl, avatarUrl } = Object.fromEntries(formData);
  const profileDoc = await ProfileInfoModel.findOne({ email });

  if (profileDoc) {
    profileDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
    await profileDoc.save();
  } else {
    ProfileInfoModel.create({ username, displayName, bio, coverUrl, avatarUrl, email });
  }

  return true;
}
