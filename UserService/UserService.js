// Imagine this is using MongoDB or SQL

export const findUserById = async (id) => {
  return await db.users.findById(id);
};

export const saveUser = async (userData) => {
  return await db.users.insert(userData);
};