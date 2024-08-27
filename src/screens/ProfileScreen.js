import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, images, SIZES } from "../constants";
import useFavoriteStore from "../../store/store";
import Header from "../components/Header";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import Animated, {
  Easing,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ProfileScreen() {
  const { favorites } = useFavoriteStore();
  const navigation = useNavigation();
  const [noOfRecipes, setNoOfRecipes] = useState(favorites.length);

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        entering={SlideInLeft.duration(500).springify().damping(16)}
        exiting={SlideOutLeft.duration(500).springify().easing(Easing.ease)}
      >
        <View className="p-4 bg-zinc-100">
          <View className="my-4">
            <Header text="Profile" />
          </View>
          <View className="flex-row justify-between items-center">
            <Image
              source={images.AvatarImage}
              className="h-20 w-20 rounded-full"
            />
            <View className="flex-1 ml-4">
              <Text
                className="text-2xl font-bold text-center"
                style={{ color: COLORS.primary }}
              >
                Abdul Siddique
              </Text>
              <View className="flex-row justify-around mt-2">
                <View className="items-center">
                  <Text
                    className="text-lg font-semibold"
                    style={{ color: COLORS.primary }}
                  >
                    {noOfRecipes}
                  </Text>
                  <Text className="text-gray-500">
                    {noOfRecipes < 2 ? "Recipe" : "Recipes"}
                  </Text>
                </View>
                <View className="items-center">
                  <Text
                    className="text-lg font-semibold"
                    style={{ color: COLORS.primary }}
                  >
                    500
                  </Text>
                  <Text className="text-gray-500">Followers</Text>
                </View>
                <View className="items-center">
                  <Text
                    className="text-lg font-semibold"
                    style={{ color: COLORS.primary }}
                  >
                    100
                  </Text>
                  <Text className="text-gray-500">Following</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 px-4">
          <View>
            {favorites.length === 0 ? (
              <View className="gap-5">
                <Text
                  className="text-2xl font-semibold"
                  style={{ color: COLORS.primary }}
                >
                  No Recipes Added
                </Text>
                <TouchableOpacity
                  className="flex-row items-center"
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("HomeScreen")}
                >
                  <Text style={{ color: COLORS.primary }}>Add Recipes Now</Text>
                  <ArrowRightIcon
                    size={hp(2)}
                    color={COLORS.primary}
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Text
                className="text-2xl font-semibold"
                style={{ color: COLORS.primary }}
              >
                Favorite Recipes
              </Text>
            )}
          </View>

          <View className="flex-row flex-wrap justify-between mt-4">
            {favorites.map((item) => (
              <Pressable
                key={item.idMeal}
                className="mb-4"
                style={{ width: "48%" }}
                onPress={() =>
                  navigation.navigate("RecipeDetailScreen", { ...item })
                }
              >
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={{
                    height: hp(30),
                    width: "100%",
                    borderRadius: SIZES.padding * 3,
                  }}
                  resizeMode="cover"
                />
                <Text
                  className="font-semibold mt-2"
                  style={{
                    color: COLORS.darkgray,
                    fontSize: hp(1.7),
                    letterSpacing: 0.7,
                  }}
                >
                  {item.strMeal.length > 20
                    ? `${item.strMeal.slice(0, 20)}...`
                    : item.strMeal}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
