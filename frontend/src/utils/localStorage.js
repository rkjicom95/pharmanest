// export const saveAuthData = (resp) => {
//   if (!resp) return null;

//   const token = resp?.token ?? null;
//   const userObj = resp?.user ?? resp?.data ?? resp;

//   const auth = {
//     token,
//     id: userObj?._id ?? userObj?.id ?? null,
//     name: userObj?.name ?? userObj?.given_name ?? null,
//     email: userObj?.email ?? null,
//     isAdmin: userObj?.isAdmin ?? false,
//   };

//   localStorage.setItem("auth", JSON.stringify(auth));

//   try {
//     window.dispatchEvent(new Event("authChanged"));
//   } catch (e) {}

//   return auth;
// };

// export const getAuthData = () => {
//   const raw = localStorage.getItem("auth");
//   return raw ? JSON.parse(raw) : null;
// };

// export const getUser = () => {
//   const a = getAuthData();
//   return a ? { id: a.id, name: a.name, email: a.email, isAdmin: a.isAdmin } : null;
// };

// export const clearAuthData = () => {
//   localStorage.removeItem("auth");
//   try {
//     window.dispatchEvent(new Event("authChanged"));
//   } catch (e) {}
// };

// export const getAccessToken = () => {
//   const auth = getAuthData();
//   return auth ? auth.token : null;
// };

// 🔹 Save Auth Data in localStorage
export const saveAuthData = (resp) => {
  if (!resp) return null;

  // Backend से token और user object normalize करना
  const token = resp?.token ?? resp?.accessToken ?? null;
  const userObj = resp?.user ?? resp?.data ?? resp;

  const auth = {
    token,
    id: userObj?._id ?? userObj?.id ?? null,
    name: userObj?.name ?? userObj?.given_name ?? null,
    email: userObj?.email ?? null,
    isAdmin: userObj?.isAdmin ?? false,
  };

  // LocalStorage में auth save
  localStorage.setItem("auth", JSON.stringify(auth));

  try {
    window.dispatchEvent(new Event("authChanged")); // अगर कहीं listener लगा हो
  } catch (e) {
    console.error("Auth event dispatch error:", e);
  }

  return auth;
};

// 🔹 Get Auth Data
export const getAuthData = () => {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to parse auth data:", e);
    return null;
  }
};

// 🔹 Get User (Normalized object)
export const getUser = () => {
  const auth = getAuthData();
  return auth
    ? {
        id: auth.id, // हमेशा id ही मिलेगा (_id और id दोनों normalize हो गए हैं)
        name: auth.name,
        email: auth.email,
        isAdmin: auth.isAdmin,
      }
    : null;
};

// 🔹 Clear Auth Data
export const clearAuthData = () => {
  localStorage.removeItem("auth");
  try {
    window.dispatchEvent(new Event("authChanged"));
  } catch (e) {
    console.error("Auth event dispatch error:", e);
  }
};

// 🔹 Get Token
export const getAccessToken = () => {
  const auth = getAuthData();
  return auth?.token ?? null;
};
