import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { COLORS, images, SIZES } from "../constants";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import Categories from "../components/categories";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Recipes from "../components/recipes";
import Animated, { Easing, FadeInDown, FadeOutDown } from "react-native-reanimated";

const fetchCategories = async () => {
  const response = await axios.get(
    "https://themealdb.com/api/json/v1/1/categories.php"
  );
  return response.data.categories;
};

const fetchRecipes = async (category, searchTerm) => {
  const response = await axios.get(
    `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const meals = response.data.meals;
  if (searchTerm) {
    return meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  return meals;
};

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: meals = [] } = useQuery({
    queryKey: ["meals", activeCategory, searchTerm],
    queryFn: () => fetchRecipes(activeCategory, searchTerm),
    enabled: !!activeCategory,
  });

  const hasNoResults = searchTerm && meals.length === 0;

  return (
    <View
      className="flex-1 bg-white"
      entering={FadeInDown.duration(500).easing(Easing.ease)}
    >
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-8"
      >
        <View className="mx-3 flex-row justify-between items-center mb-2">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Image
              source={images.AvatarImage}
              style={{ height: hp(5), width: hp(5) }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <BellIcon size={hp(4)} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(2.1), color: COLORS.darkgray }}>
            Hello! Abdul
          </Text>
          <View>
            <Text
              className="font-semibold"
              style={{ color: COLORS.darkgray, fontSize: hp(3.7) }}
            >
              Take the Flavours on fire,
            </Text>
          </View>
          <Text
            className="font-semibold"
            style={{ color: COLORS.darkgray, fontSize: hp(3.7) }}
          >
            It's all at <Text style={{ color: COLORS.secondary }}>home</Text>
          </Text>
        </View>
        <View className="mx-4 items-center rounded-full flex-row bg-black/5 p-[6px] mb-2">
          <TextInput
            placeholder="Search recipe..."
            placeholderTextColor={COLORS.gray}
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{
              fontSize: hp(2.1),
              paddingLeft: SIZES.padding,
              color: COLORS.darkgray,
            }}
            className="flex-1 text-base mb-1 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.7)} color={COLORS.darkgray} />
          </View>
        </View>
        {categories.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
        <Animated.View
          entering={FadeInDown.duration(500).springify().damping(16)}
          exiting={FadeOutDown.duration(500).springify().damping(16)}
        >
          {hasNoResults ? (
            <View className="flex-1 justify-center items-center">
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: hp(2.5),
                  fontWeight: 700,
                }}
              >
                Recipes not found
              </Text>
            </View>
          ) : (
            <Recipes categories={categories} meals={meals} />
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
