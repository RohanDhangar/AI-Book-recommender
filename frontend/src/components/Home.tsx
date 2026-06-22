import { useContext, useEffect } from "react"
import { UserDetails } from "../Context/AuthContext"

function Home() {
  const { isAuthenticated } = useContext(UserDetails);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please login to access the home page.");
    }
  }, [isAuthenticated]);

  return (
    <div>Home</div>
  )
}

export default Home