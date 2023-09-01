import styles from "../styles/CartItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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

  // console.log("quantityItem", quantityItem);
  // console.log("cart.quantity", cart.quantity);

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
              ),
                console.log("quantity - 1 ", {
                  name,
                  type,
                  image,
                  price,
                  stock,
                  number,
                  quantity,
                });
            }}
          >
            {" "}
            -{" "}
          </p>
          <p className={styles.cartItemQuantity}> {quantityItem} </p>
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
    </div>
  );
}

export default CartItem;
