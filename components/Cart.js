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
  const cart = useSelector((state) => state.cart.value);
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
        ></CartItem>
      );
    });
    setCartData(CartData);
  }, []);

  return (
    <div>
      <Header></Header>
      <div className={styles.cartContainer}>
        <div className={styles.cartItemsContainer}>Bonjour</div>
      </div>
    </div>
  );
}

export default Cart;
