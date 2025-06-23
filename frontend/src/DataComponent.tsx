import React, { useEffect, useState } from "react";

interface Post {
  id: number; // Example fields
  title: string;
  content: string;
}

const DataComponent = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/post")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log(response.json);
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

  return (
    <div>
      <h1>Data from PostgreSQL</h1>
      {Array.isArray(data) && data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default DataComponent;
