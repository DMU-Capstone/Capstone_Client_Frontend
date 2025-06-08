import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const WaitingListScreen: React.FC = () => {
  return (
   <View>
      <View style={styles.banner}>
      <Image
        source={{ uri: 'https://www.fashionbiz.co.kr/images/etcImg/1734912608622-%E3%84%B7%E3%84%B9%E3%84%B7%E3%84%B9%E3%84%B7%E3%84%B9%E3%84%B7.jpg' }} 
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});