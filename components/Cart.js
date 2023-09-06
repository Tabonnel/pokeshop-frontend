import styles from "../styles/Cart.module.css";
import Nav from "./Nav";
import CartItem from "../components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { decrementFromCart, removeFromCart } from "../reducers/cart";
import { useRouter } from "next/router";
import { Modal } from "antd";
import Link from "next/link";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const CartData = cart.map((item) => {
      return (
        <CartItem
          key={item._id}
          name={item.name}
          type={item.type}
          image={item.image}
          price={item.price}
          stock={item.stock}
          number={item.number}
          quantity={item.quantity}
        ></CartItem>
      );
    });
    setCartData(CartData);
  }, [cart]);

  return (
    <div className={styles.body}>
      <Nav />
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <p className={styles.cartHeaderTitle}>Panier</p>
        </div>

        <div className={styles.cartItemsContainer}>
          <div className={styles.cartItemsHeader}>
            <div className={styles.cartItemsHeaderName}>
              <p>Carte</p>
            </div>
            <div className={styles.cartItemsHeaderPrice}>
              <p>Prix</p>
            </div>
            <div className={styles.cartItemsHeaderQuantity}>
              <p>Quantité</p>
            </div>
            <div className={styles.cartItemsHeaderTotal}>
              <p>Total</p>
            </div>
          </div>
          {cartData.length > 0 ? (
            <div className={styles.cartItems}>{cartData}</div>
          ) : (
            <div className={styles.emptyCartContainer}>
              <p className={styles.emptyCartText}>Votre panier est vide</p>
            </div>
          )}
        </div>
        <Link href="/Payment">
          <button>Valider et payer</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
