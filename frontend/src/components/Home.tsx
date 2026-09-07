import { useContext } from "react";
import { UserDetails } from "../Context/AuthContext";
import ListBooks from "./ListBooks";

function Home() {
  const { isAuthenticated } = useContext(UserDetails);

  console.log("isAuthenticated:", isAuthenticated);
  if (!isAuthenticated) {
    return (
      <div>
        <h1>Welcome to the Home Page</h1>
        <p>
          This is a simple home page, Please login to load the full
          functionality
        </p>
      </div>
    );
  } else {
    return (
      <>
        <div>
          <h1>Welcome to the Home Page</h1>
          <ListBooks />
        </div>
      </>
    );
  }
}

export default Home;
