import styles from "../styles/CartItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../reducers/cart";

function CartItem({ name, type, image, price, stock, number }) {


    
  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.cartItem}>
        <img src={image} className={styles.cartItemImage} />
        <div className={styles.cartItemInfo}>
          <p className={styles.cartItemName}>{name}</p>
          <p className={styles.cartItemType}>{type}</p>
          <p className={styles.cartItemPrice}>{price}€</p>
        </div>
        <div className={styles.cartItemQuantity}>
          <p className={styles.cartItemQuantityNumber}>{number}</p>
        </div>
        <div className={styles.cartItemDelete}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={styles.cartItemDeleteIcon}
          />
        </div>
      </div>
    </div>
  );
}
