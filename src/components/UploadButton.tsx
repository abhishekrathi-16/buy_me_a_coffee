import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadToS3 } from "@/actions/uploadActions";
import { ChangeEvent } from "react";

export default function UploadButton({
  onUploadComplete,
}: {
  onUploadComplete: (url: string) => void;
}) {
  async function upload(ev: ChangeEvent<HTMLInputElement>) {
    const target = ev.target as HTMLInputElement;
    if (target.files?.length) {
      const file = target.files[0];
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadToS3(formData);
      onUploadComplete(result.url as string);
    }
  }
  return (
    <>
      <label className="bg-gray-300 p-2 cursor-pointer rounded-lg">
        <FontAwesomeIcon icon={faUpload} />
        <input
          className="hidden"
          type="file"
          name="coverImage"
          onChange={(ev) => upload(ev)}
        />
      </label>
    </>
  );
}
