// HomeScreen.tsx
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';

import { Header } from '../components/Header';


export const StoplistScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>대기 목록</Text>
        {/* 대기 목록 내용을 여기에 추가 */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  header: {},
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
});

