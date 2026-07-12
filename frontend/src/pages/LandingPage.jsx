import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-5xl font-bold">
          🚀 TalentTwin AI
        </h1>

        <p className="mt-4 text-gray-400">
          Your AI-Powered Career Companion
        </p>
      </div>
    </div>
  );
}

export default LandingPage;