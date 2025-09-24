import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export type BankAccount = {
  id: string;
  label: string;
  bankName: string;
  holderName: string;
  accountMasked: string;
};

type BankAccountCardProps = {
  item: BankAccount;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function BankAccountCard({ item, onEdit, onDelete }: BankAccountCardProps) {
  return (
    <View style={styles.bankCard}>
      <View style={styles.bankInfo}>
        <View style={styles.avatar} />
        <View style={styles.labels}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.bankName}>{item.bankName}</Text>
          <Text style={styles.holder}>{item.holderName}</Text>
          <Text style={styles.account}>{item.accountMasked}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => onEdit(item.id)}
          style={styles.iconButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="edit bank account"
        >
          <Ionicons name="pencil" size={18} color="#0B79FF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(item.id)}
          style={[styles.iconButton, styles.destructiveButton]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="delete bank account"
        >
          <Ionicons name="trash" size={18} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  bankCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E5E7EB",
  },
  labels: {
    marginLeft: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  bankName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
    marginTop: 2,
  },
  holder: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 6,
  },
  account: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  destructiveButton: {
    marginLeft: 12,
  },
});
