import { useState } from "react";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import { Modal, Popover } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import OutlineButton from "./Button";

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
  const [open, setOpen] = useState(false);

  // Ouverture Popover

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleOpenModalSgnIn = () => {
    setIsModalConnexionVisible(true);
    setShowLinks(false);
    setOpen(false);
  };

  const handleOpenModalSgnup = () => {
    setIsModalRegisterVisible(true);
    setShowLinks(false);
    setOpen(false);
  };

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
    fetch("https://pokeshop-backend.vercel.app/users/signin", {
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
    fetch("https://pokeshop-backend.vercel.app/users/signup", {
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
      <FontAwesomeIcon
        icon={faXmark}
        size="lg"
        onClick={hide}
        style={{ cursor: "pointer" }}
      />
      <Button
        onClick={() => {
          handleOpenModalSgnIn();
        }}
      >
        <span className={styles.btnSpan}>Sign In</span>
      </Button>
      <OutlineButton
        onClick={() => {
          handleOpenModalSgnup();
        }}
      >
        Sign Up
      </OutlineButton>
    </div>
  );

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
      <Button id="connection" onClick={() => handleConnection()}>
        Connect
      </Button>
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
      <Button id="register" onClick={() => handleRegister()}>
        Register
      </Button>
    </div>
  );

  return (
    <div
      className={`${styles.navBar} ${
        showLinks ? styles.showNav : styles.hideNav
      }`}
    >
      <div className={styles.navBarLogo}>
        <Link href="/">
          <img
            src="./pokeball-logo.png"
            alt="logo"
            className={`${styles.logoImg} ${styles.rotateOnHover}`}
          />
        </Link>
      </div>
      <ul className={styles.navBarLinks}>
        <li className={`${styles.navBarItem} ${styles.slideInDown1}`}>
          <Link href="/">
            <span onClick={handleShowLinks}>Home</span>
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
            <Popover
              content={popoverContent}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
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
          <Link href="/WishList">
            <span onClick={handleShowLinks}>WishList</span>
          </Link>
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
