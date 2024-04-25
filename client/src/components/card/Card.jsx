import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./card.scss";

function Card({ item, onDelete }) {
  const { currentUser } = useContext(AuthContext);

  const handlePostDelete = async (id) => {
    try {
      const response = await apiRequest.delete(`/posts/${id}`);
      if (response.status === 200) {
        console.log("successfully deleted post");
        onDelete(id);
        window.location.reload();
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">
          <img src="/taka.png" alt="BDT" /> {item.price}
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
            {(currentUser.email === "admin@gmail.com" ||
              currentUser.id === item.userId) && (
              <div className="icon" onClick={() => handlePostDelete(item.id)}>
                <img src="/trash.png" alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
