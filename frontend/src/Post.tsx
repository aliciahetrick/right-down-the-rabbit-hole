import React, { useEffect, useState } from "react";
import styled from "styled-components";

type PostData = {
  id: number; // Example fields
  text: string;
  likes: number;
};

const PostComponent = ({ postData }: { postData: PostData[] }) => {
  const [posts, setPosts] = React.useState(postData);

  const subtractLike = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/post/${id}/decrement`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update likes");
      }
      const updatedPost = await response.json();

      // Update the local state with the new likes count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, likes: updatedPost.likes } : post
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const addLike = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/post/${id}/add`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to update likes");
      }
      const updatedPost = await response.json();

      // Update the local state with the new likes count
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, likes: updatedPost.likes } : post
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/post/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      console.log("post deleted");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  return (
    <div>
      <div>
        {posts.map((item, index) => (
          <div>
            <TextWrapper>{item.text}</TextWrapper>
            <Button onClick={() => subtractLike(item.id)}>-</Button>
            <LikesWrapper>{item.likes}</LikesWrapper>
            <Button onClick={() => addLike(item.id)}>+</Button>
            <Button onClick={() => deletePost(item.id)}>delete post</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;

const TextWrapper = styled.p``;

const LikesWrapper = styled.p``;

const Button = styled.p``;
