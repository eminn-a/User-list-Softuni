import { useEffect, useState } from "react";
import UserItem from "./UserItem";
import * as userService from "../services/userService";
import CreateUserModal from "./CreateUserModal";
import UserInfoModal from "./UserInfoModal";
import UserDelleteModal from "./userDeleteModal";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showCreate, setShowCreate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDellete, setShowDelete] = useState(false);

  useEffect(() => {
    userService
      .getAll()
      .then((result) => setUsers(result))
      .catch((err) => console.log(err));
  }, []);

  function createUserClickHandler() {
    setShowCreate(true);
  }
  function hideCreateModal() {
    setShowCreate(false);
  }

  function showUserInfo() {
    setShowInfo(true);
  }
  function hideUserInfo() {
    setShowInfo(false);
  }

  function showUserDellete() {
    setShowDelete(true);
  }

  const userCreateHandler = async (e) => {
    e.preventDefault();
    //get FromData from form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    //create new User with data
    const newUser = await userService.create(data);
    //add newUser to users and just render the new user!
    setUsers((state) => [...state, newUser]);
    //close the modal
    setShowCreate(false);
  };

  const onInfoClick = async (userId) => {
    setSelectedUser(userId);
    showUserInfo();
  };

  const onClickDelleteHandler = async () => {
    await userService.remove(selectedUser);
    setUsers((state) => state.filter((state) => state._id !== selectedUser));
    setShowDelete(false);
  };
  const onClickDellte = async (userId) => {
    setSelectedUser(userId);
    showUserDellete();
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        {showCreate && (
          <CreateUserModal
            userCreateHandler={userCreateHandler}
            hideModal={hideCreateModal}
          />
        )}

        {showInfo && (
          <UserInfoModal userData={selectedUser} onClose={hideUserInfo} />
        )}

        {showDellete && (
          <UserDelleteModal
            onDellete={onClickDelleteHandler}
            onClose={() => setShowDelete(false)}
          />
        )}

        <thead>
          <tr>
            <th>Image</th>
            <th>
              First name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Last name
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Email
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Phone
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>
              Created
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-down"
                className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                ></path>
              </svg>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((x) => (
            <UserItem
              key={x._id}
              userId={x._id}
              firstName={x.firstName}
              lastName={x.lastName}
              email={x.email}
              phoneNumber={x.phoneNumber}
              imageUrl={x.imageUrl}
              createdAt={x.createdAt}
              onInfoClick={onInfoClick}
              onClickDellete={onClickDellte}
            />
          ))}
        </tbody>
      </table>
      <button onClick={createUserClickHandler} className="btn-add btn">
        Add new user
      </button>
    </div>
  );
};

export default Table;
