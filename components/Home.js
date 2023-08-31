import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import GoogleFontLoader from 'react-google-font-loader';
import React from "react";
import Pokemon from "../components/Pokemon";
import { useState, useEffect } from "react";


function Home() {

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/pokemons").then((response) =>
      response.json().then((data) => {
        setPokemonData(data);
        console.log(pokemonData[0]);
      })
    );
  }, []);

  const Pokemons = pokemonData.map((data) => {
    return (
      <Pokemon
        key={data._id}
        name={data.name}
        type={data.type}
        image={data.image}
        price={data.price}
        stock={data.stock}
        number={data.number}
      ></Pokemon>
    );
  });


  return (
    <div>
      {/* <GoogleFontLoader fonts={[{ font: 'Press Start 2P', weights: [400] }]} /> */}
      <Header></Header>
      <main className={styles.main}>
        <div className={styles.backgroundContainer}>
        <h1 className={`${styles.title} ${styles.pressStartFont}`} >Poke Shop</h1>
          <img src="/background-home.jpg" className={styles.backgroundImage} />
        </div>
        {Pokemons}
      </main>
    </div>
  );
}

export default Home;
