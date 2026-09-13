import { useEffect, useState } from "react";


function SuggestedBooks() {
  const [loading, setLoading] = useState(true);
  const [isProfileProcessed, setIsProfileProcessed] = useState(false);

  const handleGetBooks = async () => {
    const response = await fetch("http://localhost:2000/userDetails", 
      {
        method: "GET",
        credentials: "include"
      }
    )

    const data = response.json();
    if(data.Data.profileProcessed){
      setIsProfileProcessed(true);
    }
  }

  useEffect(()=>{
    handleGetBooks();
  }, []);
  return (
    <>
    {isProfileProcessed ? (
      <>
      welcome to the personalized books 
      </>
    ): (
      <>
      <h1>Suggested Books</h1>
      <p>This is the Suggested Books page.</p>
      </>
    )}
    </>
  );
}   

export default SuggestedBooks;