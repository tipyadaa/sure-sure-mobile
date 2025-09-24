// app/(tabs)/banks.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BankAccount, BankAccountCard } from "./components/Card";

const initialData: BankAccount[] = [
  { id: "1", label: "บัญชี", bankName: "ธนาคารกรุงเทพ", holderName: "นาย ซี ทะเล", accountMasked: "xxxx-xxxxx-xxxxx" },
  { id: "2", label: "บัญชี", bankName: "ธนาคารกรุงเทพ", holderName: "นาย ซี ทะเล", accountMasked: "xxxx-xxxxx-xxxxx" },
  { id: "3", label: "บัญชี", bankName: "ธนาคารกรุงเทพ", holderName: "นาย ซี ทะเล", accountMasked: "xxxx-xxxxx-xxxxx" },
];

export default function BanksScreen() {
  const [data, setData] = useState(initialData);

  const handleAdd = () =>
    Alert.alert("เร็วๆ นี้", "ทีมงานกำลังเตรียมฟีเจอร์เพิ่มบัญชีให้พร้อมใช้งานค่ะ");

  const handleEdit = (id: string) => Alert.alert("แก้ไขบัญชี", `id: ${id}`);

  const handleDelete = (id: string) => {
    Alert.alert("ลบบัญชี", "ต้องการลบบัญชีนี้หรือไม่คะ?", [
      { text: "ยกเลิก", style: "cancel" },
      { text: "ลบ", style: "destructive", onPress: () => setData((curr) => curr.filter((i) => i.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* HEADER — same metrics as Dashboard */}
        <LinearGradient
          colors={["#014BFF", "#01C3AF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerBg}
        >
          <View style={styles.headerRow}>
            <View style={styles.brandPill}>
              <Text style={styles.brandText}>Sure{"\n"}Sure</Text>
            </View>
            <View style={styles.userPill}>
              <Text style={styles.userGreeting}>Hi, Yada</Text>
              <Ionicons name="person-circle" size={20} color="#EFFFFA" />
            </View>
          </View>
        </LinearGradient>

        {/* SHEET — same lift & radius as Dashboard */}
        <View style={styles.sheet}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>บัญชีรับเงินร้านค้า</Text>
            <TouchableOpacity style={styles.fab} onPress={handleAdd} activeOpacity={0.9}>
              <Ionicons name="add" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <BankAccountCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#E9EEF6" },
  container: { flex: 1 },

  // 👇 ให้เท่าหน้าแรก: h160, pt 32/12, px 14
  headerBg: {
  height: 160,
  paddingTop: Platform.OS === "android" ? 20 : 40, // 🔼 ดันขึ้นกว่าเดิม
  paddingHorizontal: 14,
  justifyContent: "flex-start", // ไม่ต้อง center แล้ว
},
headerRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: -4, // เพิ่ม/ลดได้เพื่อขยับละเอียด
},


  // pills เหมือนหน้าแรก
  brandPill: {
  minWidth: 68,
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 16,
  backgroundColor: "rgba(255,255,255,0.15)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.35)",
  alignItems: "center",
},
brandText: {
  color: "#FFFFFF",
  fontWeight: "900",
  fontSize: 13,     // เดิม 14 → ลดให้เท่าหน้า Dashboard
  lineHeight: 16,
  textAlign: "center",
},

userPill: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 12,  // เดิม 18 → ลดลง
  borderRadius: 18,       // เดิม 22 → ลดลง
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.35)",
  backgroundColor: "rgba(255,255,255,0.18)",
},
userGreeting: {
  color: "#EFFFFA",
  fontSize: 13,    // เดิม 15 → ลดลง
  fontWeight: "700",
  marginRight: 6,  // เดิม 8 → ลดลงนิด
},


  // 👇 ยก sheet และมุมโค้งเท่าหน้าแรก
  sheet: {
    flex: 1,
    backgroundColor: "#F5F6F9",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginTop: -54,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  title: { flex: 1, fontSize: 20, fontWeight: "900", color: "#111827" },

  // ปุ่ม + น้ำเงิน ไอคอนขาว
  fab: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  listContent: { paddingBottom: 28 },
});
