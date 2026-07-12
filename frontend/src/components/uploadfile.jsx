import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function UploadBox() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Selected files:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition ${
        isDragActive
          ? "border-purple-500 bg-slate-800"
          : "border-slate-600 bg-slate-900"
      }`}
    >
      <input {...getInputProps()} />

      <h2 className="text-2xl font-bold mb-3">
        📄 Upload Your Resume
      </h2>

      <p className="text-gray-400">
        Drag & drop your resume here
      </p>

      <p className="text-gray-500 mt-2">
        or click to browse
      </p>

      <p className="text-sm text-gray-500 mt-6">
        PDF • DOC • DOCX
      </p>
    </div>
  );
}

export default UploadBox;