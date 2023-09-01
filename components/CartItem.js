import styles from "../styles/CartItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, addToCart } from "../reducers/cart";
import { login } from "../reducers/user";

function CartItem({ name, type, image, price, stock, number, quantity }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);


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
          <p
            className={styles.cartItemQuantityMinus}
            onClick={() =>{
                dispatch(
                    removeFromCart({ name, type, image, price, stock, number, quantity })
                    ),
                console.log("quantity - 1 ", { name, type, image, price, stock, number, quantity });
            }}
          >
            {" "}
            -{" "}
          </p>
          <p className={styles.cartItemQuantity}> {quantity} </p>
          <p
            className={styles.cartItemQuantityPlus}
            onClick={() => {
              dispatch(
                addToCart({ name, type, image, price, stock, number, quantity })
              ),
                console.log("quantity + 1 ");
            }}
          >
            {" "}
            +
          </p>
        </div>
        <div className={styles.cartItemTotal}>
          <p className={styles.cartItemTotalTotal}>X total</p>
        </div>
        <div
          className={styles.cartItemDelete}
          onClick={(e) => {
            handleRemoveFromCart(e);
            console.log("cart");
          }}
        >
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={styles.cartItemDeleteIcon}
            cursor={"pointer"}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
