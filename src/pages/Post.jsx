import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Container from "../components/container/Container";
import dbService from "../appwrite/db";
import storageService from "../appwrite/storage";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isOwner = post && userData ? post.userId === userData.$id : false;

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

  const deletePost = async () => {
    dbService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deletFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return (
    post && (
      <div>
        <Container>
          <div>
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
          <div>
            {isOwner && (
              <div>
                <Link to={`/edit-post/${post.$id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={deletePost}>Delete</Button>
              </div>
            )}
          </div>
          <div>
            <h2>{post.title}</h2>
            <div>{parse(post.content)}</div>
          </div>
        </Container>
      </div>
    )
  );
}

export default Post;
