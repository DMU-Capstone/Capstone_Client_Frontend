import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

const { width } = Dimensions.get("window");

interface Facility {
    name: string;
}

const images: string[] = [
    "https://interiorbay.net/design/upload_file/BD38940/8f5398862f704318e607b1f31b60bf4d_50881_1.jpg",
    "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202404/17/3fb9f3d4-da14-41d2-967b-1a7f8bbcee51.jpg",
    "https://lh4.googleusercontent.com/proxy/lOBFj8gX5YU5OVVr3oM0MPUH2qZIs27aHbnMckwy9awQ0mqI-u6zW9j9ir4dNpHfBX4XQSWmv_vys5--qFDM6jUJjoZu2aww3vas-dMetTwpB1unIS0wD6qjqQ",
];

const facilities: Facility[] = [
    { name: "주차장" },
    { name: "무선 인터넷" },
    { name: "남/녀 화장실 구분" },
    { name: "예약" }
];

export const WaitingListScreen: React.FC = () => {
    type WaitingListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WaitingListScreen'>;
    const navigation = useNavigation<WaitingListScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <View style={styles.swiperContainer}>
                <Carousel
                    loop
                    width={width}
                    height={200}
                    autoPlay={true}
                    autoPlayInterval={3000}
                    data={images}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
            </View>

            {/* 헬스장 정보 */}
            <View style={styles.card}>
                <Text style={styles.title}>영등포 에이블짐</Text>
                <Text style={styles.subtitle}>혼자가 아닌 함께 성장할 수 있는 곳, 에이블짐...</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>영등포역 5번 출구에서 112m</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>06:00 ~ 24:00</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>프리웨이트존, 유산소존, 스쿼트랙</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>샤워실, 사우나 </Text>
                </View>
            </View>

            {/* 편의시설 리스트 */}
            <View style={styles.facilityContainer}>
                <Text style={[styles.title, { paddingBottom: 20 }]}>편의시설</Text>
                <View style={styles.facilityRow}>
                    {facilities.map((item, index) => (
                        <View key={index} style={styles.facilityItem}>
                            <Text style={styles.facilityText}>{item.name}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.reserveButton} onPress={() => navigation.navigate('WaitingNumScreen')}>
                <Text style={styles.reserveButtonText}>예약하기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// 스타일 정의
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    swiperContainer: { height: 200 },
    swiper: { flex: 1 },
    image: { width: width, height: 200, resizeMode: "cover" },
    card: {
        padding: 16,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
    subtitle: { fontSize: 14, color: "#666", marginBottom: 10 },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    infoText: { marginLeft: 5, fontSize: 14, color: "#555" },
    facilityContainer: { justifyContent: "space-around", padding: 20 },
    facilityItem: { flexDirection: "column", alignItems: "center" },
    facilityText: { marginTop: 5, fontSize: 12 },
    facilityRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    mapContainer: {
        padding: 20,
        height: 300,
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    reserveButton: {
        backgroundColor: '#4562D6',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reserveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
