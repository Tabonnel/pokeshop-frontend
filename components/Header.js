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
import { Modal, Popover } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isModalConnexionVisible, setIsModalConnexionVisible] = useState(false);
  const [isModalRegisterVisible, setIsModalRegisterVisible] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");


  console.log(user);

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
          setIsModalRegisterVisible(false);
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
              token: data.data.token,
              username: data.data.username,
            })
          );
          setSignInEmail("");
          setSignInPassword("");
          setIsModalConnexionVisible(false);
        }
      });
  };

  const popoverContent = (
    <div>
     <button onClick={() => setIsModalConnexionVisible(true)}>Sign In</button>
      <button onClick={() => setIsModalRegisterVisible(true)}>Sign Up</button>
    </div>
  );

  const closeModals = () => {
    setIsModalConnexionVisible(false);
    setIsModalRegisterVisible(false)
  }

  let modalContentConnexion;

  modalContentConnexion = (
    <div className={styles.connexionSection}>
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
  );

  let modalContentRegister;

  modalContentRegister = (
    
      <div className={styles.registerSection}>
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
            <span onClick={() => dispatch(logout())}>Logout</span>
          </div>
        ) : (
          <Popover content={popoverContent}>
              <FontAwesomeIcon icon={faUser} size="lg" />
          </Popover>
          
        )}
        <FontAwesomeIcon icon={faHeart} size="lg" />
        <Link href="/Cart">
        <FontAwesomeIcon  cursor="pointer" icon={faShoppingCart} size="lg" />
        </Link>
      </div>

      <Modal
        title="Sign In"
        open={isModalConnexionVisible}
        footer=""
        closable={false}
        mask={true}
      >
        <button
          className={styles.closeButton}
          onClick={() => closeModals()}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        {modalContentConnexion}
      </Modal>
      <Modal
        title="Sign Up"
        open={isModalRegisterVisible}
        footer=""
        closable={false}
        mask={true}
        width={800} 
        height={300} 
      >
        <button
          className={styles.closeButton}
          onClick={() => closeModals()}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        {modalContentRegister}
      </Modal>
    </header>
  );
}

export default Header;
