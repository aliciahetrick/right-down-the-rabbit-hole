import React, { useEffect, useState } from "react";
import styled from "styled-components";

type PostData = {
  id: number; // Example fields
  text: string;
  likes: number;
};

const PostComponent = ({ postData }: { postData: PostData[] }) => {
  return (
    <div>
      <div>
        {postData.map((item, index) => (
          <div>
            <TextWrapper key={index}>{item.text}</TextWrapper>
            <Button>-</Button>
            <LikesWrapper>{item.likes}</LikesWrapper>
            <Button>+</Button>
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
