import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Pokemon.module.css";
import React from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reducers/cart";
import Tilt from "react-parallax-tilt";

function Pokemon({ name, type, image, price, stock, number }) {
  let pokemonTypeStyle = {};
  switch (type) {
    case "normal":
      pokemonTypeStyle.backgroundColor = "#f5f5f5";
      break;
    case "fire":
      pokemonTypeStyle.backgroundColor = "#fddfdf";
      break;
    case "grass":
      pokemonTypeStyle.backgroundColor = "#defde0";
      break;
    case "electric":
      pokemonTypeStyle.backgroundColor = "#fcf7de";
      break;
    case "water":
      pokemonTypeStyle.backgroundColor = "#def3fd";
      break;
    case "ground":
      pokemonTypeStyle.backgroundColor = "#f4e7da";
      break;
    case "rock":
      pokemonTypeStyle.backgroundColor = "#d5d5d4";
      break;
    case "fairy":
      pokemonTypeStyle.backgroundColor = "#fceaff";
      break;
    case "poison":
      pokemonTypeStyle.backgroundColor = "#98d7a5";
      break;
    case "bug":
      pokemonTypeStyle.backgroundColor = "#f8d5a3";
      break;
    case "dragon":
      pokemonTypeStyle.backgroundColor = "#97b3e6";
      break;
    case "psychic":
      pokemonTypeStyle.backgroundColor = "#eaeda1";
      break;
    case "flying":
      pokemonTypeStyle.backgroundColor = "#f5f5f5";
      break;
    case "fighting":
      pokemonTypeStyle.backgroundColor = "#e6e0d4";
      break;
    case "ghost":
      pokemonTypeStyle.backgroundColor = "#717171";
      break;
    case "ice":
      pokemonTypeStyle.backgroundColor = "#3FD0D4";
      break;
    case "dark":
      pokemonTypeStyle.backgroundColor = "#3D3E51";
      break;
    case "steel":
      pokemonTypeStyle.backgroundColor = "#B2B2B2";
      break;
  }

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  console.log(cart);

  const handleAddToCart = () => {
    dispatch(addToCart({ name, type, image, price, stock, number }));
  };

  return (
    <Tilt
      glareEnable={true}
      tiltMaxAngleX={20}
      tiltMaxAngleY={20}
      perspective={10000}
      glareColor={"rgb(255,0,0)"}
    >
      <div className={styles.cardWrapper}>
        <div
          className={styles.card}
          style={{ backgroundColor: pokemonTypeStyle.backgroundColor }}
        >
          <div>
            <header className={styles.card__header}>
              <h1>{name}</h1>
            </header>
            <div className={styles.card__image}>
              <div className={styles.card__imageContainer}>
                <img src={image} alt="Pokemon" />
              </div>
              <div className={styles.typeContainer}>
                Pokemon Type : <span>{type}</span>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.bottomInfos}>
              <div className={styles.priceCard}>
                <span className={styles.priceText}></span>
                <span className={styles.priceValue}> {price} €</span>
              </div>
              <FontAwesomeIcon
                icon={faShoppingCart}
                size="lg"
                className={styles.toCartBtn}
                onClick={() => handleAddToCart()}
              />
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );

  // <div className={styles.cardContainer} style={pokemonTypeStyle}>
  //   <div className={styles.infosCard} style={pokemonTypeStyle}>
  //     <div className={styles.imgContainer}>
  //       <img src={image} alt={name} className={styles.imgPokemon}/>
  //     </div>
  //     <div className={styles.info}>
  //       <h3 className={styles.name}>{name}</h3>
  //       <span className={styles.type}>
  //         Type: <span>{type}</span>
  //       </span>
  //     </div>
  //   </div>
  //   <div className={styles.bottomInfos}>
  //     <div className={styles.priceCard}>
  //       <span className={styles.priceText}></span>
  //       <span className={styles.priceValue}> {price} €</span>
  //     </div>
  //     <FontAwesomeIcon
  //       icon={faShoppingCart}
  //       size="lg"
  //       className={styles.toCartBtn}
  //       onClick={() => handleAddToCart()}
  //     />
  //   </div>
  // </div>
  // );
}

export default Pokemon;
