import styles from "../styles/CartItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { decrementFromCart, addToCart, removeFromCart } from "../reducers/cart";
import { useState, useEffect } from "react";
import { login } from "../reducers/user";

function CartItem({ name, type, image, price, stock, number, quantity }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [quantityItem, setQuantityItem] = useState(0);

  useEffect(() => {
    // Recherchez le produit correspondant dans le panier et mettez à jour la quantité locale
    const cartItem = cart.find((item) => item.name === name);
    if (cartItem) {
      setQuantityItem(cartItem.quantity);
    } else {
      setQuantityItem(0); // Si l'article n'est pas dans le panier, la quantité est de 0
    }
  }, [cart, name]);

  const total = price * quantityItem;

  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.cartItem}>
        <div className={styles.cartItemCard}>
          <img src={image} className={styles.cartItemImage} />
          <p className={styles.cartItemName}>{name}</p>
        </div>

        <div className={styles.cartItemPrice}>{price}€</div>

        <div className={styles.cartItemQuantity}>
          <p
            className={styles.cartItemQuantityMinus}
            onClick={() => {
              dispatch(
                decrementFromCart({
                  name,
                  type,
                  image,
                  price,
                  stock,
                  number,
                  quantity,
                })
              );
            }}
          >
            <FontAwesomeIcon icon={faMinus} cursor="pointer" />
          </p>
          <p className={styles.cartItemQuantityText}> {quantityItem} </p>
          <p
            className={styles.cartItemQuantityPlus}
            onClick={() => {
              dispatch(
                addToCart({ name, type, image, price, stock, number, quantity })
              );
            }}
          >
            <FontAwesomeIcon icon={faPlus} cursor="pointer" />
          </p>
          <div
            className={styles.cartItemDelete}
            onClick={() => {
              dispatch(
                removeFromCart({
                  name,
                  type,
                  image,
                  price,
                  stock,
                  number,
                  quantity,
                })
              );
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
        <div className={styles.cartItemTotal}>
          <p className={styles.cartItemTotalTotal}>{total} €</p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
