import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Books {
  title: string;
  description: string;
  thumbnailURL: string;
  source: string;
  purchaseURL: string;
  isLiked: boolean; // future reference for like button
  _id: string;
}

function SuggestedBooks() {
  const [loading, setLoading] = useState(true);
  const [isProfileProcessed, setIsProfileProcessed] = useState(false);
  const navigate = useNavigate();
  const [books, setBooks] = useState<Books[]>([]);
  // const [recommendationGenerated, setRecommendationGenerated] = useState(false);

  const handleProfileStatus = async () => {
    try {
      const response = await fetch("http://localhost:2000/userDetails", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      // console.log("step 29", data.Data.profileProcessed);
      // console.log("step 30", data.Data.recommendationGenerated);
      return {
        profileProcessed: data.Data.profileProcessed,
        recommendationGenerated: data.Data.recommendationGenerated,
      };
    } catch (error) {
      setLoading(false);
      console.error("Error occorued at get profile status", error);
    }
  };

  useEffect(() => {
    const handleGetBook = async () => {
      try {
        const status = await handleProfileStatus();

        // console.log("step 51", status.profileProcessed);
        // console.log("step 52", status.recommendationGenerated);
        if (status?.profileProcessed) {
          setIsProfileProcessed(true);
          if (status?.recommendationGenerated) {
            // setRecommendationGenerated(true);
            // Fetch recommended books
            const response = await fetch("http://localhost:2000/getBooks", {
              method: "GET",
              credentials: "include",
            });

            const data = await response.json();
            setBooks(data.books);
            setLoading(false);
          } else {
            // fetch the genrated route first and then fetch the get route to get the books
            alert("Recommendation not generated. Please try again later.");
          }
        } else {
          alert(
            "Profile status not processed. Please visit your profile section and process your profile.",
          );
          navigate("/profile");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error occorued at get books", error);
      }
    };

    handleGetBook();
  }, []);
  return (
    <>
      {loading ? (
        <> webpage is loading </>
      ) : (
        <>
          {isProfileProcessed ? (
            <>
              <>welcome to the personalized books</>
              {books.length > 0 ? (
                <div className="suggested-books">
                  <h1>Suggested Books</h1>
                  <div className="book-list">
                    {books.map((book) => (
                      <div key={book._id} className="book-item">
                        <img src={book.thumbnailURL} alt={book.title} />
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <a
                          href={book.purchaseURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Buy Now
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="suggested-books">
                  <h1>Suggested Books</h1>
                  <p>No suggested books available.</p>
                </div>
              )}
            </>
          ) : (
            <>
              <h1>Suggested Books</h1>
              <p>This is the Suggested Books page.</p>
            </>
          )}
        </>
      )}
    </>
  );
}

export default SuggestedBooks;
