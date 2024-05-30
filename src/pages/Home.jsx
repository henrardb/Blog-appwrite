import React, { useEffect, useState } from "react";
import dbService from "../appwrite/db";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";

function Home() {
  //console.log("Home");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  if (posts.length === 0) {
    //console.log("posts.length === 0");
    return (
      <div>
        <Container>
          <div>
            <h1>Login to read posts</h1>
          </div>
        </Container>
      </div>
    );
    console.log("End posts.length");
  }

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

export default Home;
