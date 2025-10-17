import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CardProps {
  imageSource: any; // 이미지 소스 (require('../../assets/image.png') 또는 { uri: '...' })
  title: string;
  isBookmarked?: boolean; // 북마크 여부 (선택 사항)
  onPress?: () => void; // 카드 클릭 시 실행될 함수 (선택 사항)
}

export const Card: React.FC<CardProps> = ({
  imageSource,
  title,
  isBookmarked = false,
  onPress,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.log("Card 이미지 로딩 실패:", imageSource);
    setImageError(true);
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {!imageError ? (
        <Image
          source={imageSource}
          style={styles.cardImage}
          onError={handleImageError}
        />
      ) : (
        <View style={[styles.cardImage, styles.errorImage]}>
          <Text style={styles.errorText}>이미지 없음</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        {isBookmarked && (
          <View style={styles.bookmarkIcon}>
            <Text>🔖</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 180, // 이미지에 맞게 조절
    height: 150,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 3,
    overflow: "hidden", // 이미지가 둥근 모서리에 맞게 잘리도록
  },
  cardImage: {
    width: "100%",
    height: 100, // 이미지 높이 조절
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  bookmarkIcon: {
    // 북마크 아이콘 스타일
    // 실제 아이콘 라이브러리 사용 시에는 이미지/텍스트 대신 아이콘 컴포넌트를 사용하세요.
  },
  errorImage: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#999",
    fontSize: 12,
  },
});
