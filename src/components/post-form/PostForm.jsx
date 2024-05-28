import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RTE from "../RTE";
import storageService from "../../appwrite/storage";
import dbService from "../../appwrite/db";
import Button from "../Button";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaulValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        storageService.deletFile(post.featuredImage);
      }

      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await storageService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await dbService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback(() => {
    if (value && typeof value === "string") return;
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, "-");
  }, []);

  React.useEffect(() => {
    watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="w-2/3">
        <Input
          label="Title"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug: "
          placeholder="Slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3">
        <input
          lable="Featured Image"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />
        {post && (
          <div>
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined}>
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
