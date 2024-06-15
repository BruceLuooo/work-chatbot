import { useState, useEffect } from "react";
import { userProfile } from "../../../../api/profile";

import "./UserDetails.scoped.css";

function UserDetails() {
  const roles = [
    { role: "Vosyn Employee", image: "fa-solid fa-pen" },
    { role: "SW Team", image: "fa-solid fa-file-code" },
    { role: "Admin User", image: "fa-solid fa-person" },
  ];

  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      await userProfile().then((res) => {
        let data = {};

        res.UserAttributes.forEach(
          (attribute) => (data = { ...data, [attribute.Name]: attribute.Value })
        );

        setUserDetails(data);
      });
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading) return <div></div>;

  return (
    <div className="user-details-container">
      <div className="user-details">
        <span className="user-details-title">Name</span>
        <div className="name-input">
          <i className="fa-solid fa-pen"></i>
          <span className="user-details-info">
            {userDetails.given_name} {userDetails.family_name}
          </span>
        </div>
      </div>
      <div className="user-details">
        <span className="user-details-title">Email</span>
        <span className="user-details-info">{userDetails.email}</span>
      </div>
      <div className="user-details">
        <span className="user-details-title">Password</span>
        <button className="reset-button">
          <i className="fa-solid fa-envelope"></i>
          <span>Send Password Reset Email</span>
        </button>
      </div>
      <div className="user-details">
        <span className="user-details-title">Your Roles</span>
        <div className="roles">
          {roles.map((role, index) => (
            <div key={index} className="role">
              <i class={role.image}></i>
              <span>{role.role}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="user-details">
        <span className="user-details-title">Delete Account</span>
        <span className="user-details-info">
          Upon account deletion, all data associated with your account will also
          be deleted.
        </span>
        <button className="delete-account-button">
          <i className="fa-solid fa-trash big-font-size"></i>
          <span>Permanently Delete Account</span>
        </button>
      </div>
    </div>
  );
}

export default UserDetails;
