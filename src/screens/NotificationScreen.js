import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { COLORS, dummyData } from "../constants";
import Header from "../components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

const NotificationScreen = () => {
  const [notificationData, setNotificationData] = useState(
    dummyData.notifications
  );
  const [allRead, setAllRead] = useState(false);

  const markAllAsRead = () => {
    const updatedNotifications = notificationData.map((notification) => ({
      ...notification,
      read: true,
    }));
    setAllRead(true);
    setNotificationData(updatedNotifications);
  };

  const markAllAsUnread = () => {
    const updatedNotifications = notificationData.map((notification) => ({
      ...notification,
      read: false,
    }));
    setAllRead(false);
    setNotificationData(updatedNotifications);
  };

  const toggleReadStatus = (id) => {
    const updatedNotifications = notificationData.map((notification) =>
      notification.id === id
        ? { ...notification, read: !notification.read }
        : notification
    );
    setNotificationData(updatedNotifications);
  };

  return (
    <Animated.View
      className="flex-1 p-4"
      entering={SlideInRight.duration(500).springify().damping(15)}
      exiting={SlideOutRight.duration(500)}
    >
      <View className="mb-2 pt-4 flex-row items-center justify-between">
        <Header text="Notifications" />
        <TouchableOpacity
          onPress={allRead ? markAllAsUnread : markAllAsRead}
          className="rounded-lg"
        >
          <CheckCircleIcon
            color={allRead ? COLORS.success : COLORS.primary}
            size={hp(4)}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notificationData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleReadStatus(item.id)}
            className={`p-4 mb-2 rounded-lg ${
              item.read ? "bg-gray-200" : "bg-white"
            }`}
            activeOpacity={0.9}
          >
            <View className="flex-col items-start ">
              <Text
                className={`text-lg ${
                  item.read ? "text-gray-600" : "text-black"
                }`}
              >
                {item.title}
              </Text>
              <View
                className={`rounded-full ${
                  item.read ? "bg-green-500" : "bg-amber-500"
                }`}
                style={{ height: hp(1), width: hp(1) }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </Animated.View>
  );
};

export default NotificationScreen;
