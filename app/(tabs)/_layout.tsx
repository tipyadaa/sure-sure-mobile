// app/_layout.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

const ACTIVE = "#014BFF";
const INACTIVE = "#6B7280";
const ALLOWED_ROUTES = ["index", "history", "banks", "shop"] as const;

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // แสดงเฉพาะ 4 route ที่อนุญาต
  const visibleRoutes = state.routes.filter((r) =>
    ALLOWED_ROUTES.includes(r.name as any)
  );

  return (
    <View style={styles.bar}>
      {visibleRoutes.map((route, idx) => {
        const isFocused = state.index === state.routes.indexOf(route);
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel ??
          options.title ??
          (route.name === "index" ? "รายงาน" : route.name);

        const icon = (() => {
          switch (route.name) {
            case "index":
              return (
                <MaterialCommunityIcons
                  name="chart-line"
                  size={24}
                  color={isFocused ? ACTIVE : INACTIVE}
                />
              );
            case "history":
              return (
                <Ionicons
                  name="time-outline"
                  size={24}
                  color={isFocused ? ACTIVE : INACTIVE}
                />
              );
            case "banks":
              return (
                <MaterialCommunityIcons
                  name="office-building"
                  size={24}
                  color={isFocused ? ACTIVE : INACTIVE}
                />
              );
            case "shop":
              return (
                <MaterialCommunityIcons
                  name="storefront-outline"
                  size={24}
                  color={isFocused ? ACTIVE : INACTIVE}
                />
              );
            default:
              return null;
          }
        })();

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.item}>
            {icon}
            <Text style={[styles.label, { color: isFocused ? ACTIVE : INACTIVE }]}>
              {label as string}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs tabBar={(props) => <MyTabBar {...props} />} screenOptions={{ headerShown: false }}>
      {/* 4 แท็บที่ต้องการเท่านั้น */}
      <Tabs.Screen name="index" options={{ title: "รายงาน" }} />
      <Tabs.Screen name="history" options={{ title: "รายการย้อนหลัง" }} />
      <Tabs.Screen name="banks" options={{ title: "บัญชีธนาคาร" }} />
      <Tabs.Screen name="shop" options={{ title: "ร้านค้า" }} />

      {/* ถ้ามี route อื่น ๆ โผล่มา ให้ซ่อนไว้โดยใส่ options={{ href: null }} (ถ้ารู้ชื่อไฟล์) */}
      {/* <Tabs.Screen name="_sitemap" options={{ href: null }} /> */}
      {/* <Tabs.Screen name="+not-found" options={{ href: null }} /> */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.select({ ios: 86, android: 74 }),
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: "row",
    justifyContent: "space-around", // กระจาย 4 ช่องให้สวยงาม
    alignItems: "flex-end",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -4 },
      },
      android: { elevation: 8 },
    }),
    zIndex: 100,
  },
  item: {
    flex: 1,               // ความกว้างเท่ากันทั้ง 4 ช่อง
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});
