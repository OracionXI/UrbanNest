import { useEffect, useState } from "react";
import Users from "../../components/users/users";
import apiRequest from "../../lib/apiRequest";
import "./admin.scss";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiRequest.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="userPage">
      <div className="userContainer">
        <br />
        <h2>Users List :</h2>
        <br />
        <div className="wrap">
          {users ? (
            users
              .filter((user) => user.email !== "admin@gmail.com")
              .map((user) => <Users key={user.id} user={user} />)
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
      <div className="Container"></div>
    </div>
  );
}

export default Admin;
