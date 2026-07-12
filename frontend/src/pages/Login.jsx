function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-10 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Welcome Back 👋
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-slate-700 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-slate-700 text-white outline-none"
        />

        <button className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-white font-semibold">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;