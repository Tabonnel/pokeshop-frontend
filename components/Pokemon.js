import styles from "../styles/Pokemon.module.css";
import React from "react";

function Pokemon({name, type, image, price, stock, number}) {

    let pokemonTypeStyle = {};
	switch (type) {
		case 'normal': pokemonTypeStyle.backgroundColor = '#f5f5f5'; break;
		case 'fire': pokemonTypeStyle.backgroundColor = '#fddfdf'; break;
		case 'grass': pokemonTypeStyle.backgroundColor = '#defde0'; break;
		case 'electric': pokemonTypeStyle.backgroundColor = '#fcf7de'; break;
		case 'water': pokemonTypeStyle.backgroundColor = '#def3fd'; break;
		case 'ground': pokemonTypeStyle.backgroundColor = '#f4e7da'; break;
		case 'rock': pokemonTypeStyle.backgroundColor = '#d5d5d4'; break;
		case 'fairy': pokemonTypeStyle.backgroundColor = '#fceaff'; break;
		case 'poison': pokemonTypeStyle.backgroundColor = '#98d7a5'; break;
		case 'bug': pokemonTypeStyle.backgroundColor = '#f8d5a3'; break;
		case 'dragon': pokemonTypeStyle.backgroundColor = '#97b3e6'; break;
		case 'psychic': pokemonTypeStyle.backgroundColor = '#eaeda1'; break;
		case 'flying': pokemonTypeStyle.backgroundColor = '#f5f5f5'; break;
		case 'fighting': pokemonTypeStyle.backgroundColor = '#e6e0d4'; break;
	}

    return (
        <div className={styles.cardContainer} 
        style={pokemonTypeStyle}
        
        >
          <div className={styles.imgContainer}>
            <img
              src={image}
              alt={name}
            />
          </div>
          <div className={styles.info}>
            <h3 className={styles.name}>{name}</h3>
            <span className={styles.type}>
              Type: <span>{type}</span>
            </span>
          </div>
        </div>
      );
    }
    
    export default Pokemon;
    

