import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import {
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Card from "./components/Card";

type Item = {
  id: string;
  date: string;   // e.g. "Apr 23, 2021"
  transferId: string;
  status: "สำเร็จ" | "ไม่สำเร็จ";
};

const DATA: Item[] = [
  { id: "1", date: "Apr 23, 2021", transferId: "TXN2948239489\n230", status: "สำเร็จ" },
  { id: "2", date: "Apr 23, 2021", transferId: "TXN2948239489\n230", status: "ไม่สำเร็จ" },
  { id: "3", date: "Apr 18, 2021", transferId: "TXN2948239489\n230", status: "ไม่สำเร็จ" },
  { id: "4", date: "Apr 15, 2021", transferId: "TXN2948239489\n230", status: "ไม่สำเร็จ" },
  { id: "5", date: "Apr 15, 2021", transferId: "TXN2948239489\n230", status: "สำเร็จ" },
  { id: "6", date: "Apr 11, 2021", transferId: "TXN2948239489\n230", status: "สำเร็จ" },
];

export default function HistoryScreen() {
  const [filter, setFilter] = useState<"all" | "success" | "fail">("all");

  const items = useMemo(() => {
    if (filter === "success") return DATA.filter((i) => i.status === "สำเร็จ");
    if (filter === "fail") return DATA.filter((i) => i.status === "ไม่สำเร็จ");
    return DATA;
  }, [filter]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      {/* Header gradient */}
      <LinearGradient
        colors={["#014BFF", "#01C3AF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerBg}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.headerBar}>
          <View style={styles.brandWrap}>
            <View style={styles.brandBox}>
              <Text style={styles.brandMark}>Sure{"\n"}Sure</Text>
            </View>
          </View>
          <View style={styles.userChip}>
            <Text style={styles.userChipText}>Hi, Yada</Text>
            <MaterialCommunityIcons name="badge-account-outline" size={20} color="#EFFFFA" />
          </View>
        </View>
      </LinearGradient>

      {/* Sheet */}
      <View style={styles.sheet}>
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <Text style={styles.title}>รายการย้อนหลัง</Text>

          {/* Filter row */}
          <View style={styles.toolsRow}>
            <View style={styles.filterPill}>
              <Picker
                selectedValue={filter}
                onValueChange={(v) => setFilter(v)}
                style={styles.picker}
                dropdownIconColor="transparent"
                mode="dropdown"
              >
                <Picker.Item label="แสดงรายการทั้งหมด" value="all" />
                <Picker.Item label="สำเร็จ" value="success" />
                <Picker.Item label="ไม่สำเร็จ" value="fail" />
              </Picker>
              {/* chevron icon on pill */}
              <Ionicons name="chevron-down" size={16} color="#111827" style={styles.pillIcon} />
            </View>

            <Pressable style={[styles.circleBtn, styles.circleBtnBlue]}>
              <Ionicons name="search" size={18} color="#fff" />
            </Pressable>
          </View>

          {/* List card */}
          <Card style={{ marginTop: 10, padding: 10 }}>
            {/* header row */}
            <View style={[styles.row, { paddingVertical: 8 }]}>
              <Text style={[styles.th, { flex: 1.1 }]}>วัน/เวลาทำรายการ</Text>
              <Text style={[styles.th, { flex: 1.4 }]}>Transfer ID</Text>
              <Text style={[styles.th, { flex: 0.7, textAlign: "right" }]}>สถานะ</Text>
            </View>

            <View style={styles.divider} />

            {/* rows */}
            {items.map((it, idx) => (
              <View key={it.id}>
                <View style={[styles.row, { paddingVertical: 12 }]}>
                  <Text style={[styles.tdDate, { flex: 1.1 }]}>{it.date}</Text>
                  <Text style={[styles.tdId, { flex: 1.4 }]}>{it.transferId}</Text>
                  <View style={{ flex: 0.7, alignItems: "flex-end" }}>
                    <StatusBadge text={it.status} />
                  </View>
                </View>
                {idx !== items.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </Card>
        </ScrollView>
      </View>
    </View>
  );
}

/** small status chip */
function StatusBadge({ text }: { text: "สำเร็จ" | "ไม่สำเร็จ" }) {
  const ok = text === "สำเร็จ";
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: ok ? "#E8FFF3" : "#F3F4F6",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "700",
          color: ok ? "#10B981" : "#9CA3AF",
        }}
      >
        {text}
      </Text>
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
  headerBg: {
    height: 160,
    paddingTop: Platform.OS === "android" ? 12 : 32,
    paddingHorizontal: 14,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandWrap: { flexDirection: "row", alignItems: "center" },
  brandBox: {
    width: 46, height: 46, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center", alignItems: "center",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.22)",
  },
  brandMark: { color: "#fff", fontWeight: "900", textAlign: "center", lineHeight: 16, fontSize: 12 },
  userChip: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.25)",
  },
  userChipText: { color: "#EFFFFA", fontWeight: "700", marginRight: 6, fontSize: 12 },

  sheet: {
    flex: 1,
    marginTop: -54,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 14,
    paddingTop: 12,
    ...shadow.s2,
  },

  title: { fontSize: 24, fontWeight: "900", color: "#111827", marginBottom: 10 },

  toolsRow: { flexDirection: "row", alignItems: "center" },
  filterPill: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    paddingRight: 32, // กันตัวหนังสือชนไอคอน
    height: 40,
    ...shadow.s1,
  },
  picker: {
    height: 40,
    color: "#111827",
    backgroundColor: "transparent",
    borderWidth: 0,
    ...Platform.select({ web: { appearance: "none" as any, outlineStyle: "none" as any } }),
  },
  pillIcon: { position: "absolute", right: 10, top: "50%", marginTop: -8 },
  circleBtn: {
    width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center",
    marginLeft: 8, backgroundColor: "#fff", ...shadow.s1,
  },
  circleBtnBlue: { backgroundColor: "#2563EB" },

  row: { flexDirection: "row", alignItems: "center" },
  th: { fontSize: 12, fontWeight: "800", color: "#6B7280" },

  tdDate: { fontSize: 13, color: "#374151", fontWeight: "600" },
  tdId: { fontSize: 13, color: "#374151" },

  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 6, opacity: 0.9 },
  separator: { height: 1, backgroundColor: "#E5E7EB", opacity: 0.5 },
});
