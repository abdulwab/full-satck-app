import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get("code");
      const state = query.get("state");

      if (code) {
        try {
          const profileResponse = await axios.get(
            `http://localhost:4000/getUserProfile?code=${code}&state=${state}`
          );

          console.log("Profile response:", profileResponse.data);
          setUser(profileResponse.data);
        } catch (error) {
          setError("Error fetching user profile");
        }
      } else {
        setError("Authorization code is missing");
      }
    };

    fetchData();
  }, [location]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-8">
      <div className="text-center">
        <img
          src={user.picture}
          alt="Profile"
          className="w-20 h-20 mx-auto mb-4 rounded-full"
        />
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Profile Details</h2>
        <ul className="text-sm">
          <li>
            <strong>Given Name:</strong> {user.given_name}
          </li>
          <li>
            <strong>Family Name:</strong> {user.family_name}
          </li>
          <li>
            <strong>Email Verified:</strong>{" "}
            {user.email_verified ? "Yes" : "No"}
          </li>
          <li>
            <strong>Locale:</strong> {user.locale.language}-
            {user.locale.country}
          </li>
          <li>
            <strong>Sub:</strong> {user.sub}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
