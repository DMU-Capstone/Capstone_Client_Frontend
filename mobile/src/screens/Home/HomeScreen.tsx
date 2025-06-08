// HomeScreen.tsx
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';

import { Header } from '../../components/Header';
import { Card } from '../../components/Card';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNavigateToWaitingList = () => {
    navigation.navigate('WaitingListScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />

        {/* 배너 (슬라이드 대신 단일 이미지로 예시) */}
        <View style={styles.banner}>
          <Image
            source={{ uri: 'https://www.fashionbiz.co.kr/images/etcImg/1734912608622-%E3%84%B7%E3%84%B9%E3%84%B7%E3%84%B9%E3%84%B7%E3%84%B9%E3%84%B7.jpg' }} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* 인기 줄서기 스팟 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>트렌드 줄서기 스팟</Text>
            <TouchableOpacity onPress={handleNavigateToWaitingList}><Text> 전체보기 </Text></TouchableOpacity>
          </View>

          <View style={styles.horizontalContainer}>
            <Card
              imageSource={'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2021/10/%EC%8B%A0%EC%84%B8%EA%B3%84%EC%9D%B8%ED%84%B0%EB%82%B4%EC%85%94%EB%82%A0_%EB%B3%B8%EB%AC%B81.png'}
              title="동양미래대 축제"
              onPress={handleNavigateToWaitingList}
            />
            <Card
              imageSource={'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2021/10/%EC%8B%A0%EC%84%B8%EA%B3%84%EC%9D%B8%ED%84%B0%EB%82%B4%EC%85%94%EB%82%A0_%EB%B3%B8%EB%AC%B81.png'}
              title="동양미래대 학식"
              onPress={handleNavigateToWaitingList}
            />
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
            <Text style={styles.sectionTitle}>내 주변 줄서기 스팟</Text>
            <TouchableOpacity><Text> 전체보기 </Text></TouchableOpacity>
          </View>

          <View style={styles.horizontalContainer}>
            <Card
              imageSource={'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2021/10/%EC%8B%A0%EC%84%B8%EA%B3%84%EC%9D%B8%ED%84%B0%EB%82%B4%EC%85%94%EB%82%A0_%EB%B3%B8%EB%AC%B81.png'}
              title="동양미래대 축제"
              onPress={handleNavigateToWaitingList}
            />
            <Card
              imageSource={'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2021/10/%EC%8B%A0%EC%84%B8%EA%B3%84%EC%9D%B8%ED%84%B0%EB%82%B4%EC%85%94%EB%82%A0_%EB%B3%B8%EB%AC%B81.png'}
              title="동양미래대 학식"
              onPress={handleNavigateToWaitingList}
            />
          </View>

        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  tabContainer: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  banner: {
    height: 200,
    marginVertical: 20,
    borderWidth: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    padding: 16
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  horizontalContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  card: {
    width: 160,
    height: 100,
    marginRight: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rankWrapper: {
    marginTop: 20
  },
  rankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  rankNum: {
    width: 20,
    color: '#888'
  },
  rankText: {
    width: '40%'
  },
});

