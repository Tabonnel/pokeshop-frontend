import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faHeart,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <div className={styles.logo}>
          <img
            src="./pokeball-logo.png"
            alt="logo"
            className={styles.logoImg}
          />
        </div>
        <div className={styles.homeItem}>
          <Link href="/">
            <p className={styles.homeLink}>Home</p>
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
        <FontAwesomeIcon icon={faUser} size="lg" />
        <FontAwesomeIcon icon={faHeart} size="lg" />
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
      </div>
    </div>
  );
}

export default Header;
