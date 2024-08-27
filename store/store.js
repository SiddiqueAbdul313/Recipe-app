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

export const useThemeStore = create((set) => ({
  isDarkMode: false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));


export default useFavoriteStore;
