import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storage";

function PostCard({ id, title, featuredImage }) {
  return (
    <Link to={`/post/${id}`}>
      <div>
        <img src={storageService.getFilePreview(featuredImage)} alt={title} />
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
