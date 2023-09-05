import { useState } from "react";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { Modal, Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [showLinks, setShowLinks] = useState(false);
  const [isModalConnexionVisible, setIsModalConnexionVisible] = useState(false);
  const [isModalRegisterVisible, setIsModalRegisterVisible] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // boutons ouverture du menu hamburger

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  // boutons de fermeture des modals

  const closeModals = () => {
    setIsModalConnexionVisible(false);
    setIsModalRegisterVisible(false);
  };

  // connexion : fetch du backend pour signin + dispatch

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

  // inscription : fetch du backend pour signup + dispatch

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
          dispatch(login({ email: signUpEmail, token: data.data.token }));
          setSignUpUsername("");
          setSignUpPassword("");
          setIsModalRegisterVisible(false);
        }
      });
  };

  const popoverContent = (
    <div className={styles.popoverContainer}>
      <button onClick={() => setIsModalConnexionVisible(true)} className={`${styles.btn} ${styles.btn2} ${styles.btn3}`}>
        <span className={styles.btnSpan}>Sign In</span>
      </button>
      <button onClick={() => setIsModalRegisterVisible(true)}>Sign Up</button>
    </div>
  );

  <button class="btn btn-2 hover-slide-right">
    <span>hover me</span>
  </button>;
  // contenu modal connexion

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

  // contenu modal Inscription

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
    <div
      className={`${styles.navBar} ${
        showLinks ? styles.showNav : styles.hideNav
      }`}
    >
      <div className={styles.navBarLogo}>
        <img src="./pokeball-logo.png" alt="logo" className={styles.logoImg} />
      </div>
      <ul className={styles.navBarLinks}>
        <li className={`${styles.navBarItem} ${styles.slideInDown1}`}>
          <Link href="/">
            <span onClick={handleShowLinks}>Home</span>
          </Link>
        </li>
        <li className={`${styles.navBarItem} ${styles.slideInDown2}`}>
          <Link href="#scrollPoint">
            <span onClick={handleShowLinks}>Shop</span>
          </Link>
        </li>
        {/* <li className={styles.navBarItem}>
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
        </li> */}
        <li className={`${styles.navBarItem} ${styles.slideInDown3}`}>
          {user.token ? (
            <div className={styles.logoutSection}>
              {/* <p>Welcome {user.username} / </p> */}
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          ) : (
            <Popover content={popoverContent} zIndex={0}>
              <span>Login</span>
            </Popover>
          )}
          <Modal
            title="Sign In"
            open={isModalConnexionVisible}
            footer=""
            closable={false}
            mask={true}
            centered={true}
            zIndex={1}
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
            centered={true}
            zIndex={1}
          >
            <button
              className={styles.closeButton}
              onClick={() => closeModals()}
            >
              <FontAwesomeIcon icon={faXmark} size="lg" />
            </button>

            {modalContentRegister}
          </Modal>
        </li>
        <li className={`${styles.navBarItem} ${styles.slideInDown4}`}>
          <span>WhisList</span>
        </li>
        <li className={`${styles.navBarItem} ${styles.slideInDown5}`}>
          <Link href="/Cart">
            <span>Cart</span>
          </Link>
        </li>
      </ul>
      <button className={styles.navBarBurger} onClick={handleShowLinks}>
        <span className={styles.burgerLine}></span>
      </button>
    </div>
  );
}

export default Nav;
