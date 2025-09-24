// app/(tabs)/shop.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

type BranchStatus = "ยังไม่ได้เชื่อมต่อ" | "เชื่อมต่อเรียบร้อย";
type Branch = { id: string; name: string; status: BranchStatus; code: string };

const INITIAL: Branch[] = [
  { id: "1", name: "สาขาเชียงใหม่", status: "ยังไม่ได้เชื่อมต่อ", code: "CM-9X2K" },
  { id: "2", name: "สาขาลำพูน", status: "เชื่อมต่อเรียบร้อย", code: "LP-2M7Q" },
  { id: "3", name: "สาขาเชียงใหม่สันทราย", status: "ยังไม่ได้เชื่อมต่อ", code: "ST-5A3P" },
];

export default function ShopScreen() {
  const [data, setData] = useState(INITIAL);

  const onAdd = () => Alert.alert("เพิ่มสาขา", "เตรียมเปิดใช้งานเร็ว ๆ นี้ค่ะ");
  const onEdit = (id: string) => Alert.alert("แก้ไขสาขา", `id: ${id}`);
  const onDelete = (id: string) =>
    Alert.alert("ลบสาขา", "ต้องการลบสาขานี้หรือไม่คะ?", [
      { text: "ยกเลิก", style: "cancel" },
      { text: "ลบ", style: "destructive", onPress: () => setData((curr) => curr.filter((b) => b.id !== id)) },
    ]);
  const onCopy = (code: string) => Alert.alert("คัดลอก code", code);
  const onCreateLine = (name: string) => Alert.alert("สร้าง LINE Group", name);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* HEADER (เหมือนหน้า Dashboard) */}
        <LinearGradient
          colors={["#014BFF", "#01C3AF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerBg}
        >
          <View style={styles.headerRow}>
            <View style={styles.brandBox}>
              <Text style={styles.brandMark}>Sure{"\n"}Sure</Text>
            </View>
            <View style={styles.userChip}>
              <Text style={styles.userChipText}>Hi,Yada</Text>
              <MaterialCommunityIcons name="calendar-month-outline" size={18} color="#EFFFFA" />
            </View>
          </View>
        </LinearGradient>

        {/* SHEET */}
        <View style={styles.sheet}>
          {/* หัวเรื่อง + ปุ่ม + */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>สาขาร้านค้า</Text>
              <Text style={styles.subtitle}>เชื่อมต่อสาขากับ LINE Group เพื่อตรวจสอบ</Text>
            </View>
            <TouchableOpacity style={styles.fab} onPress={onAdd} activeOpacity={0.9}>
              <Ionicons name="add" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(i) => i.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 28 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <BranchCard
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
                onCopy={onCopy}
                onCreateLine={onCreateLine}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function BranchCard({
  item,
  onEdit,
  onDelete,
  onCopy,
  onCreateLine,
}: {
  item: Branch;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (code: string) => void;
  onCreateLine: (name: string) => void;
}) {
  const ok = item.status === "เชื่อมต่อเรียบร้อย";
  return (
    <View style={styles.card}>
      {/* ด้านซ้าย: วงกลมสีเขียวฟ้า */}
      <View style={styles.avatar} />

      {/* เนื้อหา */}
      <View style={{ flex: 1 }}>
        <Text style={styles.branchName}>{item.name}</Text>

        <View style={{ marginTop: 6 }}>
          <View
            style={[
              styles.statusPill,
              ok ? styles.statusOk : styles.statusPending,
            ]}
          >
            <Text style={[styles.statusText, ok ? { color: "#16A34A" } : { color: "#EF4444" }]}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* ปุ่มแถวล่าง */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => onCopy(item.code)}>
            <Text style={styles.outlineText}>คัดลอก code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.outlineBtn, { marginLeft: 10 }]} onPress={() => onCreateLine(item.name)}>
            <Text style={styles.outlineText}>สร้าง line group</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ไอคอนแก้ไข/ลบ */}
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => onEdit(item.id)} hitSlop={8} style={{ marginRight: 12 }}>
          <MaterialCommunityIcons name="pencil" size={18} color="#2563EB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)} hitSlop={8}>
          <MaterialCommunityIcons name="trash-can-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const shadow = {
  s1: Platform.select({
    ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
    android: { elevation: 3 },
  }),
  s2: Platform.select({
    ios: { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 8 } },
    android: { elevation: 4 },
  }),
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#E9EEF6" },
  container: { flex: 1 },

  // Header เท่าหน้า Dashboard
  headerBg: {
    height: 160,
    paddingTop: Platform.OS === "android" ? 12 : 32,
    paddingHorizontal: 14,
  },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brandBox: {
    width: 46, height: 46, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center", alignItems: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.22)",
  },
  brandMark: { color: "#fff", fontWeight: "900", textAlign: "center", lineHeight: 16, fontSize: 12 },
  userChip: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 6,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.25)",
  },
  userChipText: { color: "#EFFFFA", fontWeight: "700", marginRight: 6, fontSize: 12 },

  // Sheet เท่าหน้าอื่น
  sheet: {
    flex: 1,
    backgroundColor: "#F5F6F9",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginTop: -54,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
    ...shadow.s2,
  },

  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "900", color: "#111827" },
  subtitle: { marginTop: 2, color: "#6B7280", fontSize: 12 },
  fab: {
    marginLeft: 12,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: "#2563EB", alignItems: "center", justifyContent: "center",
    ...shadow.s1,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    ...shadow.s1,
  },
  avatar: { width: 46, height: 46, borderRadius: 999, backgroundColor: "#10B981", marginRight: 12, opacity: 0.9 },

  branchName: { fontSize: 16, fontWeight: "900", color: "#111827" },

  statusPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1.3,
  },
  statusOk: { borderColor: "#16A34A", backgroundColor: "#E8FFE8" },
  statusPending: { borderColor: "#EF4444", backgroundColor: "#FFECEC" },
  statusText: { fontSize: 12, fontWeight: "700" },

  actionsRow: { flexDirection: "row", marginTop: 10 },
  outlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: "#2563EB",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: "#fff",
  },
  outlineText: { color: "#111827", fontWeight: "800", fontSize: 12 },

  cardActions: { marginLeft: 10, alignItems: "flex-start", paddingTop: 2, flexDirection: "row" },
});
