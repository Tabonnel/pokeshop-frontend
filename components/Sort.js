import styles from "../styles/Sort.module.css";
import React from "react";
import { createFilter } from "react-select";
import Select from "react-select";
import { useState } from "react";

const Sort = ({ filteredPokemons, setSortedPokemons, options = [] }) => {
  const [selectedSort, setSelectedSort] = useState("default");

  const sortOptions = [
    { value: "default", label: "Trier par"},
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
    { value: "alpha-asc", label: "Ordre alphabétique" },
    { value: "alpha-desc", label: "Ordre alphabétique inverse" },
  ];

  const customSort = (sortOptions, selectedSort) => {
    switch (selectedSort) {
      case "price-asc":
        return sortOptions.slice().sort((a, b) => a.price - b.price);

      case "price-desc":
        return sortOptions.slice().sort((a, b) => b.price - a.price);

      case "alpha-asc":
        return sortOptions.slice().sort((a, b) => a.name.localeCompare(b.name));

      case "alpha-desc":
        return sortOptions.slice().sort((a, b) => b.name.localeCompare(a.name));

      default:
        return sortOptions;
    }
  };
  const handleSortChange = (selectedOption) => {
    setSelectedSort(selectedOption.value);
    // Appeler la fonction de tri du composant parent (Home.js)
    setSortedPokemons(customSort(sortOptions, selectedOption.value));
  };
  
  return (
    <>
      <Select
        className={styles.selectSort}
        options={sortOptions}
        filterOption={customSort}
        onChange={handleSortChange}
      />
    </>
  );
};

export default Sort;
