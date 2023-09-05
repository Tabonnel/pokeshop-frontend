import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import React from "react";
import Pokemon from "./Pokemon";
import styles from "../styles/WishList.module.css";

function WishList() {
  const user = useSelector((state) => state.user.value);

  const [wishListData, setWishListData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${user.token}`).then((response) =>
      response.json().then((data) => {
        setWishListData(data.pokemons);
        console.log("ici", wishListData);
      })
    );
  }, []);

  const Pokemons = wishListData.map((data) => {
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

  return (
    <div>
      <Nav></Nav>
      <div className={styles.pokemonGrid}>{Pokemons}</div>
    </div>
  );
}

export default WishList;
