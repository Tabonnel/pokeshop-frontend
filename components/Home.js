import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import React from "react";
import Pokemon from "../components/Pokemon";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import Sort from "./Sort";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";


function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortedPokemons, setSortedPokemons] = useState([]);

  const handleFilterChange = (selectedOptions) => {
    setSelectedTypes(selectedOptions);
  };

  const handleSortChange = (selectedSort) => {
    const sortedData = customSort(filteredPokemons, selectedSort);
    setSortedPokemons(sortedData);
  };

  const filteredPokemons = pokemonData.filter((data) => {
    if (selectedTypes.length === 0) {
      return true;
    }
    return selectedTypes.some((type) => data.type.includes(type.value));
  });

  const customSort = (options, selectedSort) => {
    switch (selectedSort) {
      case "price-asc":
        return options.slice().sort((a, b) => a.price - b.price);

      case "price-desc":
        return options.slice().sort((a, b) => b.price - a.price);

      case "alpha-asc":
        return options.slice().sort((a, b) => a.name.localeCompare(b.name));

      case "alpha-desc":
        return options.slice().sort((a, b) => b.name.localeCompare(a.name));

      default:
        return options;
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/pokemons/first150").then((response) =>
      response.json().then((data) => {
        setPokemonData(data);
        console.log(data[0]);
      })
    );
  }, []);

   
  useEffect(() => {
    AOS.init({
      duration: 3000,
    });
  }, []);

  const sortedAndFilteredPokemons = customSort(
    filteredPokemons,
    sortedPokemons
  );

  const Pokemons = sortedAndFilteredPokemons.map((data) => {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* <Header></Header> */}
      <Nav></Nav>
      <main className={styles.main}>
        <div className={styles.homeImgContainer}>
          <div className={styles.titleContainer}>
          <img src="/titre.png" className={styles.titleImage} />
          </div>
          <div className={styles.pokeImgContainer}>
          <img src="/salameche.png" className={styles.poke1} />
          <img src="/pikachu.png" className={styles.poke2} />
          <img src="/carapuce.png" className={styles.poke3} />
          <img src="/bulbizare.png" className={styles.poke4} />
          </div>

          
        </div>
        <div className={styles.shopContainer}>
          <h1 className={styles.title}>Poke Shop</h1>
          <div className={styles.filterContainer}>
            <Filter onFilterChange={handleFilterChange}></Filter>
            <Sort
              onSortChange={handleSortChange}
              filteredPokemons={filteredPokemons}
              setSortedPokemons={setSortedPokemons}
            ></Sort>
          </div>
          <div className={styles.pokemonGrid} id="scrollPoint">
            {Pokemons}
          </div>
        </div>
        <div className={styles.scrollButton} onClick={scrollToTop}>
          <FontAwesomeIcon
            icon={faArrowUp}
            size="lg"
            className={styles.arrowUp}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
