import { Query } from "./index";
import { IUser } from "../../types";
import { generateHash } from "../utils/passwords";

const all = async () => {
  return Query("SELECT * from users");
};

const find = async (column: string, email: string) => {
  return Query(
    `Select * From users
    WHERE ??=?`,
    [column, email]
  );
};

const singleUser = async (id: number) => {
  return Query("SELECT * FROM users WHERE id=?", [id]);
};

const createUser = async (user: IUser) => {
  let hashedPassword = generateHash(user.password);
  console.log(user.role);
  return <Promise<any>>(
    Query(`INSERT INTO users (email, password, role) VALUES (?,?,?)`, [
      user.email,
      hashedPassword,
      user.role,
    ])
  );
};

const updateUser = async (user: IUser) => {
  return Query(`UPDATE users SET email=?, password=?, role=? WHERE id=?`, [
    user.email,
    user.password,
    user.role,
    user.id,
  ]);
};

const deleteUser = async (id: number) => {
  return Query(`DELETE FROM users WHERE id=?`, [id]);
};

const resetPassword = async (id: number, password: string) => {
  let hashedPassword = generateHash(password);
  return Query(
    `UPDATE users
SET password=?
WHERE id=?`,
    [hashedPassword, id]
  );
};

const getAllUserIDsForPasswordReset = async (email: string) => {
  //in the sentence below, "email" is actually username in the database.
  return Query("SELECT * FROM users WHERE real_email=?", [email]);
};

export default {
  all,
  find,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
  resetPassword,
  getAllUserIDsForPasswordReset,
};
