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

export default { categoryData, mealData, recipeDetailData };
