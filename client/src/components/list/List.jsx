import { useState } from "react";
import Card from "../card/Card";
import "./list.scss";

function List({ posts }) {
  const [postList, setPostList] = useState(posts);

  const handleDeletePost = (postId) => {
    const updatedPosts = postList.filter((post) => post.id !== postId);
    setPostList(updatedPosts);
  };

  return (
    <div className="list">
      {postList.map((item) => (
        <Card key={item.id} item={item} onDelete={handleDeletePost} />
      ))}
    </div>
  );
}

export default List;
