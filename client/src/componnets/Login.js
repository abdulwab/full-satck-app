import React from "react";

const Login = () => {
  const handleLogin = () => {
    const client_id = "78c6ha002uuhit";
    const redirect_uri = "http://localhost:3000/profile"; // React app URL
    const state = Math.random().toString(36).substring(7);
    const scope = "openid%20profile%20email"; // Adjust scope as needed

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;

    window.location.href = authUrl;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xl"
      >
        Login with LinkedIn
      </button>
    </div>
  );
};

export default Login;
