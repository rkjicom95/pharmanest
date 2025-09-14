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