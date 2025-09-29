import React, { useState, useRef } from "react";

const Profile = () => {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?img=12");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({
    name: "Rohit Kumar",
    email: "rohit.kumar@example.com", // Email stays read-only
    phone: "+91 9876543210",
    address: "Sector 62, Noida, Uttar Pradesh, 201301",
    username: "rohit_k",
    joined: "January 2024",
    role: "Premium User",
    bio: "Full-stack developer passionate about building professional, user-friendly web applications.",
  });

  const [tempUser, setTempUser] = useState(user);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
            src={avatar}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Change Photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="text-center sm:text-left w-full">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={tempUser.name}
              onChange={handleChange}
              className="text-2xl font-bold border rounded px-2 py-1 w-full sm:w-auto"
            />
          ) : (
            <h1 className="text-2xl font-bold">{user.name}</h1>
          )}
          {isEditing ? (
            <textarea
              name="bio"
              value={tempUser.bio}
              onChange={handleChange}
              className="w-full mt-2 border rounded px-2 py-1"
            />
          ) : (
            <p className="text-gray-600">{user.bio}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">Joined {user.joined}</p>
        </div>
      </div>

      {/* Personal Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Contact Information
          </h2>

          {/* Email (Read-only) */}
          <p className="mb-2">
            <span className="font-semibold">Email:</span>{" "}
            <span className="text-gray-700">{user.email}</span>
          </p>

          {/* Phone */}
          <p className="mb-2">
            <span className="font-semibold">Phone:</span>{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={tempUser.phone}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full mt-1"
              />
            ) : (
              user.phone
            )}
          </p>

          {/* Address */}
          <p className="mb-2">
            <span className="font-semibold">Address:</span>{" "}
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={tempUser.address}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full mt-1"
              />
            ) : (
              user.address
            )}
          </p>
        </div>

        {/* Account Details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Account Details
          </h2>

          {/* Username */}
          <p className="mb-2">
            <span className="font-semibold">Username:</span>{" "}
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={tempUser.username}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full mt-1"
              />
            ) : (
              user.username
            )}
          </p>

          {/* Member Since */}
          <p className="mb-2">
            <span className="font-semibold">Member Since:</span> {user.joined}
          </p>

          {/* Role */}
          <p className="mb-2">
            <span className="font-semibold">Role:</span>{" "}
            {isEditing ? (
              <input
                type="text"
                name="role"
                value={tempUser.role}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full mt-1"
              />
            ) : (
              user.role
            )}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
