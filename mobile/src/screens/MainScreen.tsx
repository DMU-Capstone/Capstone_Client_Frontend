// HomeScreen.tsx
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';

import { Header } from '../components/Header';


export const MainScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>

      <Header />


      {/* 배너 (슬라이드 대신 단일 이미지로 예시) */}
      <View style={styles.banner}>
        <Image
          style={styles.bannerImage}

          resizeMode="cover"
        />
      </View>

      {/* 인기 줄서기 스팟 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>트렌드 줄서기 스팟</Text>
          <TouchableOpacity><Text> 전체보기 </Text></TouchableOpacity>
        </View>

        <View style={styles.horizontalContainer}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.card}>
              <Text>동양미래대 {item === 1 ? '축제' : '학식'}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 급상승 검색어 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>급상승 검색어</Text>
        </View>

        <View style={styles.rankWrapper}>
          {[
            ['동양미래대 축제부스', '롯데월드'],
            ['인천공항 대기열', '인하공전 축제부스'],
            ['헬스장 기구대기줄', '김포공항 대기열'],
            ['인천사랑병원', '동양미래대 학식'],
            ['에버랜드', '금강']
          ].map((row, idx) => (
            <View key={idx} style={styles.rankRow}>
              <Text style={styles.rankNum}>{idx + 1}</Text>
              <Text style={styles.rankText}>{row[0]}</Text>
              <Text style={styles.rankNum}>{idx + 6}</Text>
              <Text style={styles.rankText}>{row[1]}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 내 주변 줄서기 스팟 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>내 주변변 줄서기 스팟</Text>
          <TouchableOpacity><Text> 전체보기 </Text></TouchableOpacity>
        </View>

        <View style={styles.horizontalContainer}>
          {[1, 2].map((item) => (
            <View key={item} style={styles.card}>
              <Text>동양미래대 {item === 1 ? '축제' : '학식'}</Text>
            </View>
          ))}
        </View>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {},
  container: { backgroundColor: '#fff' },
  banner: { height: 200, marginVertical: 20, borderColor: '#000', borderRadius: 10, borderWidth: 1, },
  bannerImage: { width: '100%', height: '100%', borderRadius: 10 },
  section: { padding: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  card: {
    width: 160, height: 100, marginRight: 12,
    backgroundColor: '#f2f2f2', borderRadius: 10,
    justifyContent: 'center', alignItems: 'center'
  },
  rankWrapper: { marginTop: 20 },
  rankRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  rankNum: { width: 20, color: '#888' },
  rankText: { width: '40%' },
  popularCard: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,

    // iOS용 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Android용 그림자
    elevation: 5,
  },
  horizontalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});

