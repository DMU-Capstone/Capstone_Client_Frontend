import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components/Header';

export const NoticeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>공지사항</Text>
        {/* 공지사항 내용을 여기에 추가 */}
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
}); 