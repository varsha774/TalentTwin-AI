import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function UploadBox() {
  const [message, setMessage] = useState("");

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed!");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="text-center">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-purple-500 p-10 rounded-xl cursor-pointer"
      >
        <input {...getInputProps()} />
        <h2 className="text-xl font-bold">
          Drag & Drop Resume Here
        </h2>
        <p>or click to select a PDF</p>
      </div>

      <p className="mt-6 text-green-400">{message}</p>
    </div>
  );
}

export default UploadBox;