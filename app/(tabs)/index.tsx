import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
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
import ProgressBar from "./components/ProgressBar";

export default function DashboardScreen() {
  const [month, setMonth] = useState<string>("May");

  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      {/* HEADER GRADIENT */}
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
            <Ionicons name="person-circle-outline" size={22} color="#EFFFFA" />
          </View>
        </View>
      </LinearGradient>

      {/* CONTENT SHEET */}
      <View style={styles.sheet}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Text style={styles.sectionHeading}>รายงาน</Text>

          {/* แถบเครื่องมือ */}
          <View style={styles.searchRow}>
            <View
              style={{
                flex: 1,
                height: 40,
                backgroundColor: "#fff",
                borderRadius: 12,
                ...shadow.s1,
              }}
            />
            <Pressable style={[styles.circleBtn, { marginLeft: 8 }]}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={18}
                color="#111827"
              />
            </Pressable>
            <Pressable style={[styles.circleBtn, styles.circleBtnBlue]}>
              <Ionicons name="search" size={18} color="#fff" />
            </Pressable>
          </View>

          {/* การ์ดรวม */}
          <Card style={{ marginTop: 10 }}>
            <Text style={styles.cardTitleCenter}>สลิปที่ตรวจสอบทั้งหมด</Text>
            <Text style={styles.bigNumber}>10</Text>
            <Pressable style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>ดาวน์โหลดไฟล์</Text>
            </Pressable>
          </Card>

          {/* การ์ดคู่ */}
          <View style={styles.row2}>
            <Card style={[styles.centerCard, { flex: 1, marginRight: 8 }]}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.smallTitle}>สลิปที่ถูกต้อง</Text>
              <Text style={styles.bigNumberSm}>10</Text>
              <Text style={styles.caption}>10.0 % ของสัปดาห์ก่อน</Text>
            </Card>

            <Card style={[styles.centerCard, { flex: 1, marginLeft: 8 }]}>
              <Ionicons name="close-circle" size={20} color="#EF4444" />
              <Text style={styles.smallTitle}>สลิปที่ไม่ถูกต้อง</Text>
              <Text style={styles.bigNumberSm}>10</Text>
              <Text style={styles.caption}>10.0 % ของสัปดาห์ก่อน</Text>
            </Card>
          </View>

          {/* การใช้งาน */}
          <Card style={{ marginTop: 12 }}>
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <View style={[styles.iconBadge, { backgroundColor: "#EAF2FF" }]}>
                  <Ionicons
                    name="speedometer-outline"
                    size={16}
                    color="#2563EB"
                  />
                </View>
                <Text style={[styles.smallTitle, { marginLeft: 6 }]}>
                  การใช้งาน
                </Text>
              </View>
              <Text style={styles.usageRight}>50 / 100</Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <ProgressBar value={50} max={100} />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.caption}>แพ็กเกจ : free trail</Text>
              <Text style={styles.caption}>วันหมดอายุ : 3 ก.ย 2025</Text>
            </View>
          </Card>

          {/* ส่วนกราฟ + dropdown เดือน */}
          <View style={{ marginTop: 14 }}>
            <Text style={styles.sectionHeading}>กราฟแสดงข้อมูลในช่วงเดือน</Text>

            <View style={styles.monthRow}>
              {/* Dropdown เดือน พร้อมไอคอนปฏิทิน (แทนลูกศร) */}
              <View style={styles.monthPill}>
                <Picker
                  selectedValue={month}
                  onValueChange={(val) => setMonth(String(val))}
                  style={styles.picker}
                  dropdownIconColor="transparent" // ซ่อนลูกศร ▼
                  mode="dropdown"
                >
                  <Picker.Item label="January" value="January" />
                  <Picker.Item label="February" value="February" />
                  <Picker.Item label="March" value="March" />
                  <Picker.Item label="April" value="April" />
                  <Picker.Item label="May" value="May" />
                  <Picker.Item label="June" value="June" />
                  <Picker.Item label="July" value="July" />
                  <Picker.Item label="August" value="August" />
                  <Picker.Item label="September" value="September" />
                  <Picker.Item label="October" value="October" />
                  <Picker.Item label="November" value="November" />
                  <Picker.Item label="December" value="December" />
                </Picker>

                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={18}
                  color="#111827"
                  style={styles.calendarIcon}
                />
              </View>


              <Pressable
                style={[styles.circleBtn, styles.circleBtnBlue, { marginLeft: 8 }]}
              >
                <Ionicons name="search" size={18} color="#fff" />
              </Pressable>
            </View>

            {/* กราฟจำลอง */}
            <Card style={{ marginTop: 10, padding: 0 }}>
              <View style={styles.chartBox}>
                <View style={styles.chartGrid}>
                  {[...Array(4)].map((_, i) => (
                    <View key={i} style={styles.chartHLine} />
                  ))}
                </View>
                <View style={styles.fakeLines}>
                  <View style={[styles.fakeBar, { height: 84, left: 16 }]} />
                  <View style={[styles.fakeBar, { height: 136, left: 56 }]} />
                  <View style={[styles.fakeBar, { height: 72, left: 96 }]} />
                  <View style={[styles.fakeBar, { height: 148, left: 136 }]} />
                  <View style={[styles.fakeBar, { height: 110, left: 176 }]} />
                </View>
                <View style={styles.legendRow}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#2563EB" }]}
                  />
                  <Text style={styles.legendText}>ถูกต้อง</Text>
                  <View
                    style={[
                      styles.legendDot,
                      { backgroundColor: "#EF4444", marginLeft: 14 },
                    ]}
                  />
                  <Text style={styles.legendText}>ผิดพลาด</Text>
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const shadow = {
  s1: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
    },
    android: { elevation: 3 },
  }),
  s2: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
    },
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
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },
  brandMark: {
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 16,
    fontSize: 12,
  },
  userChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
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

  sectionHeading: { fontSize: 18, fontWeight: "900", color: "#111827", marginBottom: 8 },

  searchRow: { flexDirection: "row", alignItems: "center" },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    ...shadow.s1,
  },
  circleBtnBlue: {
    backgroundColor: "#2563EB",
    marginLeft: 8,
  },

  cardTitleCenter: { textAlign: "center", fontSize: 14, fontWeight: "800", color: "#1F2937" },
  bigNumber: {
    fontSize: 44,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginVertical: 8,
  },
  primaryBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  primaryBtnText: { color: "#fff", fontWeight: "800" },

  row2: { flexDirection: "row", marginTop: 10 },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

  iconBadge: {
    width: 22,
    height: 22,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  centerCard: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },

  smallTitle: { fontSize: 13, fontWeight: "800", color: "#111827" },
  bigNumberSm: { fontSize: 32, fontWeight: "900", marginTop: 8, color: "#111827" },
  caption: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  usageRight: { fontSize: 12, color: "#1F2937", fontWeight: "800" },

  monthRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },

  /* container ของ dropdown เดือน */
  monthPill: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 999,
    overflow: "hidden", // ให้มุมโค้งกิน picker
    position: "relative",
    paddingRight: 36, // กันข้อความชนไอคอนปฏิทิน
    ...shadow.s1,
  },

  /* picker ไม่มีเส้นดำ/ขอบ */
  picker: {
    height: 40,
    color: "#111827",
    backgroundColor: "transparent",
    borderWidth: 0,
    // บาง OEM Android แสดงเส้น underline: การใส่ background โปร่ง + ไม่มี border ช่วยลบออก
  },

  /* ไอคอนปฏิทินแทนลูกศร ▼ */
  calendarIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -9, // 18/2
    opacity: 0.9,
  },

  chartBox: { height: 210, borderRadius: 16, overflow: "hidden" },
  chartGrid: {
    position: "absolute",
    inset: 0 as any,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  chartHLine: { height: 1, backgroundColor: "#E5E7EB", opacity: 0.9, marginHorizontal: 10 },
  fakeLines: { position: "absolute", bottom: 36, left: 8, right: 8, height: 150 },
  fakeBar: {
    position: "absolute",
    bottom: 0,
    width: 20,
    borderRadius: 8,
    backgroundColor: "#2563EB",
    opacity: 0.9,
  },
  legendRow: {
    position: "absolute",
    bottom: 8,
    left: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: { width: 10, height: 10, borderRadius: 999, marginRight: 6 },
  legendText: { fontSize: 12, color: "#374151" },
});
