import AuthContext from "../contexts/authContext";
import { useContext } from "react";

export default function useAuth() {
  return useContext(AuthContext)
}