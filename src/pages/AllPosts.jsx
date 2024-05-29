import React, { useEffect, useState } from "react";
import dbService from "../appwrite/db";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div>
      <Container>
        <div>
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
