// import React, { useState, useEffect } from "react";
// import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView } from "react-native";
// import { StatusBar } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import { Card } from "react-native-paper";
// import Carousel from "react-native-reanimated-carousel";


// const { width } = Dimensions.get("window");

// interface Facility {
//   name: string;
//   icon: string;
// }

// const images: string[] = [
//   "https://interiorbay.net/design/upload_file/BD38940/8f5398862f704318e607b1f31b60bf4d_50881_1.jpg",
//   "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202404/17/3fb9f3d4-da14-41d2-967b-1a7f8bbcee51.jpg",
//   "https://lh4.googleusercontent.com/proxy/lOBFj8gX5YU5OVVr3oM0MPUH2qZIs27aHbnMckwy9awQ0mqI-u6zW9j9ir4dNpHfBX4XQSWmv_vys5--qFDM6jUJjoZu2aww3vas-dMetTwpB1unIS0wD6qjqQ",
// ];

// const facilities: { name: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }[] = [
//   { name: "주차장", icon: "parking" },
//   { name: "무선 인터넷", icon: "wifi" },
//   { name: "남/녀 화장실 구분", icon: "human-male-female" },
//   { name: "예약", icon: "calendar-outline" }
// ];

// export const HomeScreen: React.FC = () => {

//   return (

//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
//       <View style={styles.swiperContainer}>
//         <Carousel
//           loop
//           width={width}
//           height={200}
//           autoPlay={true}
//           autoPlayInterval={3000}
//           data={images}
//           scrollAnimationDuration={1000}
//           renderItem={({ item }) => (
//             <Image source={{ uri: item }} style={styles.image} />
//           )}
//         />
//       </View>

//       {/* 헬스장 정보 */}
//       <Card style={styles.card}>
//         <Text style={styles.title}>영등포 에이블짐</Text>
//         <Text style={styles.subtitle}>혼자가 아닌 함께 성장할 수 있는 곳, 에이블짐...</Text>
//         <View style={styles.infoRow}>
//           <MaterialCommunityIcons name="map-marker" size={20} color="#555" />
//           <Text style={styles.infoText}>영등포역 5번 출구에서 112m</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <MaterialCommunityIcons name="clock-outline" size={20} color="#555" />
//           <Text style={styles.infoText}>06:00 ~ 24:00</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <FontAwesome6 name="dumbbell" size={19} color="#555" />
//           <Text style={styles.infoText}>프리웨이트존, 유산소존, 스쿼트랙</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <MaterialCommunityIcons name="shower" size={20} color="#555" />
//           <Text style={styles.infoText}>샤워실, 사우나 </Text>
//         </View>

//       </Card>

//       {/* 편의시설 리스트 */}
//       <View style={styles.facilityContainer}>
//         <Text style={[styles.title, { paddingBottom: 20 }]}>편의시설</Text>
//         <View style={styles.facilityRow}>
//           {facilities.map((item, index) => (
//             <View key={index} style={styles.facilityItem}>
//               <MaterialCommunityIcons name={item.icon} size={30} color="#333" />
//               <Text style={styles.facilityText}>{item.name}</Text>
//             </View>

//           ))}
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// // 스타일 정의
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   swiperContainer: { height: 200 },
//   swiper: { flex: 1 },
//   image: { width: width, height: 200, resizeMode: "cover" },
//   card: { padding: 16, margin: 10, borderRadius: 10, elevation: 3 },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
//   subtitle: { fontSize: 14, color: "#666", marginBottom: 10 },
//   infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
//   infoText: { marginLeft: 5, fontSize: 14, color: "#555" },
//   facilityContainer: { justifyContent: "space-around", padding: 20 },
//   facilityItem: { flexDirection: "column", alignItems: "center" },
//   facilityText: { marginTop: 5, fontSize: 12 },
//   facilityRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%"
//   },
// });

