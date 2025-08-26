// // Save auth data (token + user info)
// export const saveAuthData = (data) => {
//   const authData = {
//     token: data.token,
//     id: data.data._id,
//     name: data.data.name,
//     email: data.data.email,
//     isAdmin: data.data.isAdmin,
//   };
//   localStorage.setItem("auth", JSON.stringify(authData));
// };

// // Get auth data
// export const getAuthData = () => {
//   const stored = localStorage.getItem("auth");
//   return stored ? JSON.parse(stored) : null;
// };

// // ✅ Fix: Get user from "auth" (not "user")
// export const getUser = () => {
//   const stored = localStorage.getItem("auth");
//   return stored ? JSON.parse(stored) : null;
// };

// // Remove auth data (logout ke liye)
// export const clearAuthData = () => {
//   localStorage.removeItem("auth");
// };


// src/utils/localStorage.js

export const saveAuthData = (resp) => {
  if (!resp) return null;

  const token = resp?.token ?? null;
  const userObj = resp?.user ?? resp?.data ?? resp;

  const auth = {
    token,
    id: userObj?._id ?? userObj?.id ?? null,
    name: userObj?.name ?? userObj?.given_name ?? null,
    email: userObj?.email ?? null,
    isAdmin: userObj?.isAdmin ?? false,
  };

  localStorage.setItem("auth", JSON.stringify(auth));

  try {
    window.dispatchEvent(new Event("authChanged"));
  } catch (e) {}

  return auth;
};

export const getAuthData = () => {
  const raw = localStorage.getItem("auth");
  return raw ? JSON.parse(raw) : null;
};

export const getUser = () => {
  const a = getAuthData();
  return a ? { id: a.id, name: a.name, email: a.email, isAdmin: a.isAdmin } : null;
};

export const clearAuthData = () => {
  localStorage.removeItem("auth");
  try {
    window.dispatchEvent(new Event("authChanged"));
  } catch (e) {}
};

export const getAccessToken = () => {
  const auth = getAuthData();
  return auth ? auth.token : null;
};