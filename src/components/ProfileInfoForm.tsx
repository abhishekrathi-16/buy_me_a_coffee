"use client";
import { saveProfile } from "@/actions/profileInfoActions";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";

type Props = { profileInfo: ProfileInfo | null };

export default function ProfileInfoForm({ profileInfo }: Props) {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);

  async function handleFormAction(formData: FormData) {
    const result = await saveProfile(formData);
    console.log(result);
  }

  return (
    <form action={handleFormAction}>
      <div className="border bg-gray-100 p-4 rounded-lg">
        <div className="border bg-gray-100 size-24 rounded-full p-4">
          avatar
          <UploadButton onUploadComplete={setAvatarUrl} />
          <input type="hidden" name="avatarUrl" value={avatarUrl} />
        </div>
        <div>
          cover image
          <UploadButton onUploadComplete={setCoverUrl} />
          <input type="hidden" name="coverUrl" value={coverUrl} />
        </div>
      </div>
      <div>
        <label className="block mt-4" htmlFor="username">
          Username
        </label>
        <input
          defaultValue={profileInfo?.username}
          name="username"
          type="text"
          id="username"
          placeholder="username"
        />
      </div>
      <div>
        <label className="block mt-4" htmlFor="dispname">
          Display Name
        </label>
        <input
          defaultValue={profileInfo?.displayName}
          name="displayName"
          type="text"
          id="dispname"
          placeholder="display name"
        />
      </div>
      <div>
        <label className="block mt-4" htmlFor="bio">
          Bio
        </label>
        <textarea
          defaultValue={profileInfo?.bio}
          name="bio"
          id="bio"
          placeholder="bio"
        />
      </div>
      <div>
        <button className="bg-yellow-300 rounded-full mt-4 px-4 py-2">
          Save profile
        </button>
      </div>
    </form>
  );
}
