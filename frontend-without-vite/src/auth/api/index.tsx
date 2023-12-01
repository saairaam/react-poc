import { useContext } from "react";
import Contextpage from "../../Contextpage";

export const signinUser = async (data: any) => {
  const { setUser } = useContext(Contextpage);
  if (data.username === "Saai") {
    setUser({
      role: "User",
      name: "Saai",
    });
  } else {
    setUser({
      role: "Admin",
      name: "Saairaam",
    });
  }
};
