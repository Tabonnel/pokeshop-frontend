import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faHeart,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        password: signUpPassword,
        email: signUpEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: signUpEmail, token: data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalVisible(false);
        }
      });
  };

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              email: signInEmail,
              token: data.token,
              username: data.username,
            })
          );
          setSignInEmail("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
      });
  };

  let modalContent;
  //ajouter if !user.token quand il y aura les reducers ET IF USER.TOKEN logout
  modalContent = (
    <div className={styles.registerContainer}>
      <FontAwesomeIcon onClick={showModal} icon={faXmark} />
      <div className={styles.registerSection}>
        <p>Sign-up</p>
        <input
          type="text"
          placeholder="Username"
          id="signUpUsername"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername}
        />
        <input
          type="text"
          placeholder="Email"
          id="signUpEmail"
          onChange={(e) => setSignUpEmail(e.target.value)}
          value={signUpEmail}
        />
        <input
          type="password"
          placeholder="Password"
          id="signUpPassword"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
        />
        <button id="register" onClick={() => handleRegister()}>
          Register
        </button>
      </div>
      <div className={styles.registerSection}>
        <p>Sign-in</p>
        <input
          type="text"
          placeholder="Email"
          id="signInEmail"
          onChange={(e) => setSignInEmail(e.target.value)}
          value={signInEmail}
        />
        <input
          type="password"
          placeholder="Password"
          id="signInPassword"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
        />
        <button id="connection" onClick={() => handleConnection()}>
          Connect
        </button>
      </div>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <img
            src="./pokeball-logo.png"
            alt="logo"
            className={styles.logoImg}
          />
        </div>
        <div className={styles.menuItem}>
          <Link href="/">
            <p className={styles.menuLink}>Home</p>
          </Link>
        </div>
        <div className={styles.menuItem}>
          <Link href="#scrollPoint">
            <p className={styles.menuLink}>Shop</p>
          </Link>
        </div>
      </div>
      <div className={styles.searchBar}>
        <div className={styles.searchIcon}>
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </div>
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className={styles.icons}>
        {user.token ? (
          <div className={styles.logoutSection}>
            {/* <p>Welcome {user.username} / </p> */}
            <button onClick={() => dispatch(logout())}>Logout</button>
          </div>
        ) : (
          <FontAwesomeIcon icon={faUser} size="lg" onClick={showModal} />
        )}
        <FontAwesomeIcon icon={faHeart} size="lg" />
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
      </div>
      {isModalVisible && (
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            className={styles.modal}
            open={isModalVisible}
            closable={false}
            footer={null}
          >
            {modalContent}
          </Modal>
        </div>
      )}
    </header>
  );
}

export default Header;
