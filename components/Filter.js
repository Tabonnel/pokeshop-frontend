import React from "react";
import styles from "../styles/Filter.module.css";
import Select from "react-select";

const Filter = ({ onFilterChange }) => {
  const options = [
    { value: "normal", label: "Normal" },
    { value: "fire", label: "Feu" },
    { value: "water", label: "Eau" },
    { value: "grass", label: "Plante" },
    { value: "ice", label: "Glace" },
    { value: "fighting", label: "Combat" },
    { value: "ground", label: "Sol" },
    { value: "psychic", label: "Psy" },
    { value: "bug", label: "Insecte" },
    { value: "rock", label: "Roche" },
    { value: "ghost", label: "Spectre" },
    { value: "dragon", label: "Dragon" },
    { value: "dark", label: "Ténèbres" },
    { value: "steel", label: "Acier" },
    { value: "electric", label: "Electrique" },
    { value: "poison", label: "Poison" },
    { value: "fairy", label: "Fée" },
  ];

  const handleSelectChange = (selectedOptions) => {
    onFilterChange(selectedOptions);
    };

  return (
    <>
      <Select className={styles.selectFilter} isMulti options={options}
       onChange={handleSelectChange}
       />
    </>
  );
};

export default Filter;
