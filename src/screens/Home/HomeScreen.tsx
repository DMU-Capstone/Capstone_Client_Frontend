// HomeScreen.tsx
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Footer } from "../../components/Footer";
import {
  getAllHostSessions,
  getBannerData,
  HostSession,
  BannerData,
  API_BASE_URL,
} from "../../services/hostApi";

const { width: screenWidth } = Dimensions.get("window");

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  console.log("HomeScreen rendered");
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [hostSessions, setHostSessions] = useState<HostSession[]>([]);
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 각 API를 독립적으로 처리하여 하나가 실패해도 다른 것은 계속 로드
        const [hostSessionsResult, bannerDataResult] = await Promise.allSettled(
          [getAllHostSessions(), getBannerData()]
        );

        // 호스트 세션 데이터 처리
        if (hostSessionsResult.status === "fulfilled") {
          setHostSessions(hostSessionsResult.value);
        } else {
          console.error(
            "호스트 세션 데이터 로드 실패:",
            hostSessionsResult.reason
          );
          setHostSessions([]); // 빈 배열로 설정
        }

        // 배너 데이터 처리
        if (bannerDataResult.status === "fulfilled") {
          setBannerData(bannerDataResult.value);
        } else {
          console.error("배너 데이터 로드 실패:", bannerDataResult.reason);
          setBannerData(null);
        }

        // 둘 다 실패한 경우에만 에러 상태로 설정
        if (
          hostSessionsResult.status === "rejected" &&
          bannerDataResult.status === "rejected"
        ) {
          setError("데이터를 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>데이터를 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  // 배너 이미지 렌더링 함수
  const renderBannerSlide = (imageUrl: string, index: number) => {
    // 이미지 URL 유효성 검사
    if (!imageUrl || imageUrl.trim() === "") {
      return (
        <View key={index} style={styles.slide}>
          <Text style={styles.noBannerText}>이미지를 불러올 수 없습니다</Text>
        </View>
      );
    }

    const fullImageUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${API_BASE_URL}${imageUrl}`;

    return (
      <View key={index} style={styles.slide}>
        <Image
          source={{ uri: fullImageUrl }}
          style={styles.bannerImage}
          resizeMode="cover"
          onError={() => console.log("배너 이미지 로딩 실패:", fullImageUrl)}
        />
      </View>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Header />

          {/* 배너 섹션 - 스와이퍼로 무한 슬라이드 */}
          <View style={styles.bannerContainer}>
            {bannerData &&
            bannerData.imgList &&
            bannerData.imgList.length > 0 ? (
              <Swiper
                style={styles.banner}
                showsPagination={true}
                paginationStyle={styles.pagination}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                autoplay={true}
                autoplayTimeout={3}
                loop={true}
                showsButtons={false}
                height={200}
              >
                {bannerData.imgList.map((imageUrl, index) =>
                  renderBannerSlide(imageUrl, index)
                )}
              </Swiper>
            ) : (
              <View style={styles.banner}>
                <Text style={styles.noBannerText}>배너 이미지가 없습니다</Text>
              </View>
            )}
          </View>

          {/* 인기 줄서기 스팟 */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>트렌드 줄서기 스팟</Text>
              <TouchableOpacity>
                <Text> 전체보기 </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={styles.horizontalScrollView}
              showsHorizontalScrollIndicator={false}
            >
              {hostSessions.map((session) => {
                let imageUrl =
                  "https://www.noblesse.com/shop/data/m/editor_new/2024/10/04/4307ea0d8f60886cimage1.jpg";

                if (session.imgUrl && session.imgUrl.trim() !== "") {
                  if (session.imgUrl.startsWith("http://")) {
                    imageUrl = `https://${session.imgUrl.substring(7)}`;
                  } else if (session.imgUrl.startsWith("https://")) {
                    imageUrl = session.imgUrl;
                  } else {
                    imageUrl = `${API_BASE_URL}${session.imgUrl}`;
                  }
                }

                return (
                  <Card
                    key={session.hostId}
                    imageSource={{ uri: imageUrl }}
                    title={session.hostName}
                    onPress={() =>
                      navigation.navigate("StorDetailScreen", {
                        hostId: session.hostId,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
          </View>

          {/* 급상승 검색어 */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>급상승 검색어</Text>
            </View>

            <View style={styles.rankWrapper}>
              {[
                ["동양미래대 축제부스", "롯데월드"],
                ["인천공항 대기열", "인하공전 축제부스"],
                ["헬스장 기구대기줄", "김포공항 대기열"],
                ["인천사랑병원", "동양미래대 학식"],
                ["에버랜드", "금강"],
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
              <TouchableOpacity>
                <Text> 전체보기 </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              style={styles.horizontalScrollView}
              showsHorizontalScrollIndicator={false}
            >
              {hostSessions.map((session) => {
                let imageUrl =
                  "https://www.noblesse.com/shop/data/m/editor_new/2024/10/04/4307ea0d8f60886cimage1.jpg";

                if (session.imgUrl && session.imgUrl.trim() !== "") {
                  if (session.imgUrl.startsWith("http://")) {
                    imageUrl = `https://${session.imgUrl.substring(7)}`;
                  } else if (session.imgUrl.startsWith("https://")) {
                    imageUrl = session.imgUrl;
                  } else {
                    imageUrl = `${API_BASE_URL}${session.imgUrl}`;
                  }
                }

                return (
                  <Card
                    key={session.hostId}
                    imageSource={{ uri: imageUrl }}
                    title={session.hostName}
                    onPress={() =>
                      navigation.navigate("StorDetailScreen", {
                        hostId: session.hostId,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
          </View>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffebee",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ef9a9a",
  },
  bannerContainer: {
    height: 200,
    marginVertical: 20,
  },
  banner: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: screenWidth,
    height: 200,
  },
  noBannerText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  horizontalScrollView: {
    marginTop: 10,
    paddingBottom: 10,
  },
  rankWrapper: {
    marginTop: 20,
  },
  rankRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rankNum: {
    width: 20,
    color: "#888",
  },
  rankText: {
    width: "40%",
  },
});
