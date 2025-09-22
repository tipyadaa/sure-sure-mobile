import { StyleSheet, View } from "react-native";

export default function ProgressBar({ value, max }: { value: number; max: number }) {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${percent}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#2563EB",
  },
});
