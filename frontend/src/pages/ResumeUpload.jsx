import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";

function ResumeUpload() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-20 px-6">
        <UploadBox />
      </div>
    </div>
  );
}

export default ResumeUpload;