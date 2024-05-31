import React, { useState, useEffect } from "react";
import PostForm from "../components/post-form/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/db";
import Container from "../components/container/Container";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      dbService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
