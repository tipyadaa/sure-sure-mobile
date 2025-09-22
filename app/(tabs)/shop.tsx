import { StyleSheet, Text, View } from "react-native";
export default function Shop() {
  return (
    <View style={s.c}><Text style={s.t}>หน้าร้านค้า</Text></View>
  );
}
const s = StyleSheet.create({ c:{flex:1,alignItems:"center",justifyContent:"center"}, t:{fontSize:18,fontWeight:"700"} });