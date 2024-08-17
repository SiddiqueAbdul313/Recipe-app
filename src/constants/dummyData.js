import {
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "./theme";

const categoryData = [
  {
    name: "Starter",
    image: "https://www.themealdb.com/images/category/starter.png",
  },

  {
    name: "Beef",
    image: "https://themealdb.com/images/category/beef.png",
  },

  {
    name: "Dessert",
    image: "https://themealdb.com/images/category/dessert.png",
  },
];

const mealData = [
  {
    name: "Shakshuka",
    image: "https://www.themealdb.com/images/media/meals/g373701551450225.jpg",
  },

  {
    name: "Beef Banh Mi Bowls with Sriracha Mayo",
    image: "https://www.themealdb.com/images/media/meals/z0ageb1583189517.jpg",
  },

  {
    name: "Chickpea Fajitas",
    image: "https://www.themealdb.com/images/media/meals/tvtxpq1511464705.jpg",
  },

  {
    name: "Smoky Lentil Chili with Squash",
    image: "https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg",
  },
  {
    name: "Braised Beef Chilli",
    image: "https://www.themealdb.com/images/media/meals/uuqvwu1504629254.jpg",
  },
];

const recipeDetailData = [
  {
    icon: (
      <ClockIcon
        size={hp(4)}
        style={{ color: COLORS.primary }}
        strokeWidth={2}
      />
    ),
    value: "35",
    label: "Mins",
  },
  {
    icon: (
      <UsersIcon
        size={hp(4)}
        style={{ color: COLORS.primary }}
        strokeWidth={2}
      />
    ),
    value: "04",
    label: "Servings",
  },
  {
    icon: (
      <FireIcon
        size={hp(4)}
        style={{ color: COLORS.primary }}
        strokeWidth={2}
      />
    ),
    value: "180",
    label: "Cal",
  },
  {
    icon: (
      <Square3Stack3DIcon
        size={hp(4)}
        style={{ color: COLORS.primary }}
        strokeWidth={2}
      />
    ),
    value: "Steps",
    label: "Easy",
  },
];

const notifications = [
  { id: 1, title: "New recipe added: Spaghetti Carbonara", read: false },
  { id: 2, title: "Your weekly meal plan is ready!", read: true },
  { id: 3, title: "Don’t miss out on our new vegan recipes", read: false },
  { id: 4, title: "Reminder: Grocery list for Chicken Alfredo", read: true },
  {
    id: 5,
    title: "New comment on your favorite recipe: Chocolate Cake",
    read: false,
  },
  { id: 6, title: "20% off on your next meal kit order!", read: true },
  { id: 7, title: "Your saved recipe: Pancakes with Maple Syrup", read: false },
  { id: 8, title: "Top 10 summer salad recipes you must try", read: false },
  { id: 9, title: "New kitchen hacks to save you time!", read: true },
  {
    id: 10,
    title: "Check out trending recipes: Garlic Butter Shrimp",
    read: false,
  },
];

export default { categoryData, mealData, recipeDetailData, notifications };
