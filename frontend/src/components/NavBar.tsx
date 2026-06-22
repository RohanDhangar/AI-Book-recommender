import { useContext } from "react";
import { UserDetails } from "../Context/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { isAuthenticated } = useContext(UserDetails);

  if (!isAuthenticated) {
    return (
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </nav>
    );
  }

  return (
    <nav>
      <Link to="/suggested-books">Suggested Books</Link>
      <Link to="/profile/:id">Profile</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
}

export default NavBar;

// Sentence

// "I love JavaScript"
//       ↓
// Token IDs
//       ↓
// Embeddings
//       ↓
// Q K V generation
//       ↓
// Attention (understand relationships)
//       ↓
// Neural layers refine information
//       ↓
// Final internal understanding vector
// (Hidden State)
//       ↓
// Compare against all vocabulary words
//       ↓
// Raw scores (Logits)
//       ↓
// Softmax converts scores → probabilities
//       ↓
// Highest probability wins
//       ↓
// Next word predicted
