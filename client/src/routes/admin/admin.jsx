import { useEffect, useState } from "react";
import Users from "../../components/users/users";
import apiRequest from "../../lib/apiRequest";
import "./admin.scss";

function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { username, email, password } = Object.fromEntries(formData);

      const updatedUserData = { username, email, password };
      await apiRequest.put(`/users/${id}`, updatedUserData);
      console.log("successfully updated user! (Admin)");
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

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

  const handleUserTitleClick = (user) => {
    setSelectedUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setId(user.id);
    setPassword("");
    setError(null);
  };

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
              .map((user) => (
                <Users
                  key={user.id}
                  user={user}
                  onUserTitleClick={handleUserTitleClick}
                />
              ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
      <div className="Container">
        {selectedUser && (
          <>
            <img
              src={selectedUser.avatar || "/noavatar.jpg"}
              className="img"
              alt=""
            />
            <br />
            <h3>User ID : {selectedUser.id}</h3>
            <br />
            <div className="formContainer">
              <form onSubmit={handleSubmit}>
                <div className="item">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="item">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="item">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button>Update</button>
                {error && <span>Update Failed!</span>}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;
