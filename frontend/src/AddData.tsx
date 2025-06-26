import { useEffect, useState } from "react";

// interface Post {
//   id: number; // Example fields
//   title: string;
//   content: string;
// }

const AddData = () => {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Entry added successfully!");
        setText(""); // Clear input
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding entry:", error);
      alert("Failed to add entry.");
    }
  };

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter post text"
      />
      <button onClick={handleSubmit}>Add post</button>
    </>
  );
};

export default AddData;
