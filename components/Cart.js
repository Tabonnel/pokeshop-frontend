import styles from "../styles/Cart.module.css";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { removeFromCart } from "../reducers/cart";
import { useRouter } from "next/router";
import { Modal } from "antd";

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
 
  }, []);

  return (
    <div className={styles.body}>
      <Header></Header>
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <p className={styles.cartHeaderTitle}>Panier</p>
        </div>

        <div className={styles.cartItemsContainer}>
          <div className={styles.cartItemsHeader}>
            <p className={styles.cartItemsHeaderName}>Carte</p>
            <p className={styles.cartItemsHeaderType}>Type</p>
            <p className={styles.cartItemsHeaderPrice}>Prix</p>
            <p className={styles.cartItemsHeaderQuantity}>Quantité</p>
            <p className={styles.cartTitemsHeaderTotal}>Total</p>
          </div>
          {cartData.length > 0 ? (
            cartData
          ) : (
            <div className={styles.emptyCartContainer}>
              <p className={styles.emptyCartText}>Votre panier est vide</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
