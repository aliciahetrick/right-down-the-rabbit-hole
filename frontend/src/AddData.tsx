import { useEffect, useState } from "react";

interface Post {
  id: number; // Example fields
  title: string;
  content: string;
}

const AddData = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const requestData = {
      text: "hello",
      likes: 5,
    };

    fetch("http://localhost:5000/api/post", {
      method: "POST", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Set the content type
      },
      body: JSON.stringify(requestData), // Convert the data to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((fetchedData) => {
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          console.error("API returned data that is not an array:", fetchedData);
          setData([]); // Fallback to an empty array
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <div>{data.length > 0 && <p>Data loaded!</p>}</div>;
};

export default AddData;
