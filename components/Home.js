import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import GoogleFontLoader from "react-google-font-loader";
import React from "react";
import Pokemon from "../components/Pokemon";
import { useState, useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/pokemons").then((response) =>
      response.json().then((data) => {
        setPokemonData(data);
      })
    );
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
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
        data-aos="fade-up"
      ></Pokemon>
    );
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* <GoogleFontLoader fonts={[{ font: 'Press Start 2P', weights: [400] }]} /> */}
      <Header></Header>
      <main className={styles.main}>
        <div className={styles.backgroundContainer}>
          <img src="/background-home.jpg" className={styles.backgroundImage} />
        </div>
        <div>
          <h1 className={`${styles.title} ${styles.pressStartFont}`}>
            Poke Shop
          </h1>
          <div className={styles.pokemonGrid} id="scrollPoint">
            {Pokemons}
          </div>
        </div>
        <div className={styles.scrollButton} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} size="lg" className={styles.arrowUp} />
        </div>
      </main>
    </div>
  );
}

export default Home;
