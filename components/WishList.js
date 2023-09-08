import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import React from "react";
import Pokemon from "./Pokemon";
import styles from "../styles/WishList.module.css";

function WishList() {
  const user = useSelector((state) => state.user.value);

  const [wishListData, setWishListData] = useState([]);
  const [isDataInWishList, setIsDataInWhisList] = useState(true);

  console.log(isDataInWishList)

  useEffect(() => {
    if (user.token) {
      fetch(`http://localhost:3000/users/${user.token}`).then((response) =>
        response.json().then((data) => {
          
          if (data.pokemons) {
            setWishListData(data.pokemons);
            console.log("ici", wishListData);
          } else {
            setIsDataInWhisList(false);
          }
        })
      );
    }
  }, []);

  let Pokemons = null;

  if (isDataInWishList) {
    Pokemons = wishListData.map((data) => {
      return (
        <Pokemon
          id={data._id}
          key={data._id}
          name={data.name}
          type={data.type}
          image={data.image}
          price={data.price}
          stock={data.stock}
          number={data.number}
          data-aos="fade-up"
        ></Pokemon>
      );
    });
  }

  return (
    <div className={styles.body}>
      <Nav></Nav>
      <div className={styles.whishListContainer}>
        <p className={styles.whishListHeaderTitle}>WishList</p>

        {user.token ? (
          isDataInWishList ? (
            <div className={styles.pokemonGrid}>{Pokemons}</div>
          ) : (
            <p>Your WishList is empty</p>
          )
        ) : (
          <p>
            You must be log in to access to your wishlist
          </p>
        )}
      </div>
    </div>
  );
}

export default WishList;
