import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>대표자</Text>
            <Text style={styles.infoValue}>졸업작품</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>사업자등록번호</Text>
            <Text style={styles.infoValue}>165-52-24124</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>주소</Text>
            <Text style={styles.infoValue}>서울특별시 구로구 경인로 445</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>이메일</Text>
            <Text style={styles.infoValue}>jongmin@jongmin.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>전화번호</Text>
            <Text style={styles.infoValue}>010-1234-5678</Text>
          </View>
        </View>

        <View style={styles.linksSection}>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>이용약관</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>개인정보처리방침</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>고객센터</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>
            Copyright 2025. Wait:It. All rights reserved.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  content: {
    padding: 24,
    paddingBottom: 32,
  },
  companyInfo: {
    marginBottom: 24,
    alignItems: "center",
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3B66F6",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: "#6c757d",
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  infoLabel: {
    fontSize: 12,
    color: "#6c757d",
    width: 80,
    marginRight: 12,
  },
  infoValue: {
    fontSize: 12,
    color: "#495057",
    flex: 1,
  },
  linksSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 16,
  },
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  linkText: {
    fontSize: 12,
    color: "#3B66F6",
    textDecorationLine: "underline",
  },
  copyright: {
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 11,
    color: "#adb5bd",
    textAlign: "center",
  },
});
