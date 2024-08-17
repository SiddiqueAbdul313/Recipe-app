import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import { COLORS, dummyData } from "../constants";
import Header from "../components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CheckCircleIcon, CheckIcon } from "react-native-heroicons/solid";

const NotificationScreen = () => {
  const [notificationData, setNotificationData] = useState(
    dummyData.notifications
  );
  const [allRead, setAllRead] = useState(notificationData);

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
    <SafeAreaView className="flex-1 p-4">
      <View className="mb-2 pt-4 flex-row items-center justify-between">
        <Header text="Notifications" />
        <TouchableOpacity
          onPress={allRead ? markAllAsUnread : markAllAsRead}
          className="rounded-lg"
        >
          {allRead ? (
            <CheckCircleIcon color={COLORS.success} size={hp(4)} />
          ) : (
            <CheckCircleIcon color={COLORS.primary} size={hp(4)} />
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={notificationData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleReadStatus(item.id)}
            className={`p-4 mb-5 rounded-lg ${
              item.read ? "bg-gray-200" : "bg-white"
            }`}
            activeOpacity={0.9}
          >
            <Text
              className={`text-lg ${
                item.read ? "text-gray-600" : "text-black"
              }`}
            >
              {item.title}
            </Text>
            <Text className="text-sm text-gray-500">
              {item.read ? (
                <View
                  className=" rounded-full"
                  style={{
                    height: hp(1),
                    width: hp(1),
                    backgroundColor: COLORS.success,
                  }}
                ></View>
              ) : (
                <View
                  className="bg-amber-500 rounded-full"
                  style={{ height: hp(1), width: hp(1) }}
                ></View>
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
