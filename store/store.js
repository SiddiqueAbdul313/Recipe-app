// store.js
import { create } from "zustand";

const useFavoriteStore = create((set) => ({
  favorites: [],
  addFavorite: (recipe) =>
    set((state) => ({ favorites: [...state.favorites, recipe] })),
  removeFavorite: (idMeal) =>
    set((state) => ({
      favorites: state.favorites.filter((recipe) => recipe.idMeal !== idMeal),
    })),
}));

export default useFavoriteStore;
