import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, dummyData, SIZES } from "../constants";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";
import axios from "axios";
import { WebView } from "react-native-webview";
import useFavoriteStore from "../../store/store";
import Toast from "react-native-toast-message";

export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore(); // Access Zustand store
  const [heartIcon, setHeartIcon] = useState(
    favorites.some((fav) => fav.idMeal === item.idMeal)
  ); // Check if already favorited
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(true);

  const scale = useSharedValue(1);

  const toggleHeartIcon = () => {
    setHeartIcon((prevState) => !prevState);
    scale.value = withSpring(1.2, { stiffness: 200 }, () => {
      scale.value = withSpring(1);
    });

    if (heartIcon) {
      removeFavorite(item.idMeal);
      Toast.show({
        type: "success",
        text1: "Removed from Favorites",
        text2: `${item.strMeal} has been removed from your favorites.`,
      });
    } else {
      addFavorite(item);
      Toast.show({
        type: "success",
        text1: "Added to Favorites",
        text2: `${item.strMeal} has been added to your favorites.`,
      });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    const getMealData = async (id) => {
      try {
        const response = await axios.get(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setMeals(response.data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch meal data", error);
        setLoading(false);
      }
    };

    getMealData(item.idMeal);
  }, [item.idMeal]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: SIZES.padding * 3 }}
    >
      <StatusBar style="light" />

      {/* recipe images */}
      <View className="flex-row justify-center m-0">
        <Image
          source={{ uri: meals?.strMealThumb || item.strMealThumb }} // Use fetched data or fallback to passed item
          style={{ width: wp(100), height: hp(50) }}
          className="rounded-br-3xl rounded-bl-3xl"
        />
      </View>

      {/* back button and heart icon */}
      <Animated.View
        className="w-full absolute flex-row justify-between items-center pt-10 px-3"
        entering={FadeIn.delay(200).duration(1000)}
      >
        <TouchableOpacity
          className=" bg-white p-2 rounded-3xl"
          onPress={() => props.navigation.goBack()}
        >
          <ChevronLeftIcon
            size={hp(3)}
            strokeWidth={4}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className=" bg-white p-2 rounded-3xl"
          onPress={toggleHeartIcon}
          activeOpacity={0.8}
        >
          <Animated.View style={animatedStyle}>
            {heartIcon ? (
              <HeartIcon
                size={hp(3)}
                strokeWidth={4}
                color={COLORS.primary}
                fill={COLORS.primary}
              />
            ) : (
              <HeartIcon size={hp(3)} strokeWidth={4} color={COLORS.primary} />
            )}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      {/* meal details */}
      <View className="p-5 flex justify-between space-y-2">
        {/* name and area */}
        <Animated.View
          entering={FadeInDown.duration(700).springify().damping(12)}
          className="space-y-2"
        >
          <Text className="font-bold flex-1" style={{ fontSize: hp(3) }}>
            {meals?.strMeal}
          </Text>
          <Text
            className="font-semibold flex-1"
            style={{ fontSize: hp(2), color: COLORS.darkgray }}
          >
            {meals?.strArea}
          </Text>
        </Animated.View>

        {/* miscellaneous */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(700).springify().damping(12)}
          className="flex-row justify-around"
        >
          {dummyData.recipeDetailData.map((item, index) => (
            <View
              key={index}
              className="flex rounded-full p-2"
              style={{ backgroundColor: COLORS.secondary }}
            >
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full items-center justify-center"
              >
                {item.icon}
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2), color: COLORS.white }}
                  className="font-bold"
                >
                  {item.value}
                </Text>
                <Text
                  style={{ fontSize: hp(1.5), color: COLORS.white }}
                  className="font-bold"
                >
                  {item.label}
                </Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Ingredients */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
          className="space-y-4"
        >
          <Text
            style={{ fontSize: hp(3), color: COLORS.darkgray, height: hp(4) }}
            className="font-bold flex-1"
          >
            Ingredients
          </Text>
          <View className="space-y-2 ml-3">
            {ingredientsIndexes(meals).map((i) => {
              return (
                <View key={i} className="flex-row items-center space-x-4">
                  <View
                    style={{
                      height: hp(1.5),
                      width: hp(1.5),
                      backgroundColor: COLORS.primary,
                    }}
                    className="rounded-full"
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      className="font-extrabold"
                      style={{ color: COLORS.darkgray, fontSize: hp(2) }}
                    >
                      {meals["strMeasure" + i]}
                    </Text>
                    <Text
                      className="font-medium"
                      style={{ color: COLORS.darkgray, fontSize: hp(2) }}
                    >
                      {meals["strIngredient" + i]}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* instructions */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(700).springify().damping(12)}
          className="space-y-4"
        >
          <Text
            style={{ fontSize: hp(3), color: COLORS.darkgray, height: hp(4) }}
            className="font-bold flex-1"
          >
            Instructions
          </Text>
          <Text
            style={{ fontSize: hp(1.8), color: COLORS.darkgray }}
            className="font-medium flex-1"
          >
            {meals?.strInstructions}
          </Text>
        </Animated.View>
        {/* YT reference */}
        {meals.strYoutube && (
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(3), color: COLORS.darkgray }}
              className="flex-1 font-bold"
            >
              Cooking Tutorial
            </Text>
            <View
              style={{
                height: hp(30),
                borderRadius: SIZES.padding * 2,
                overflow: "hidden",
              }}
            >
              <WebView
                source={{
                  uri: `https://www.youtube.com/embed/${getYoutubeVideoId(
                    meals.strYoutube
                  )}`,
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
