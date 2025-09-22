import { StyleSheet, Text, View } from "react-native";
export default function Banks() {
  return (
    <View style={s.c}><Text style={s.t}>หน้าบัญชีธนาคาร</Text></View>
  );
}
const s = StyleSheet.create({ c:{flex:1,alignItems:"center",justifyContent:"center"}, t:{fontSize:18,fontWeight:"700"} });
