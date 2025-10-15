import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import {
  handleSignup,
  handleSendAuthCode,
  handleVerifyAuthCode,
} from "../../package/shared/api/auth/Signup";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

export const SignupScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [authRequested, setAuthRequested] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [authVerified, setAuthVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleGenderSelect = (value: string) => {
    setGender(value);
  };

  const formatPhoneNumber = (value: string) => {
    const onlyNums = value.replace(/\D/g, "");
    if (onlyNums.length < 4) return onlyNums;
    if (onlyNums.length < 8)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11
    )}`;
  };

  const handleSendAuth = async () => {
    if (!phoneNumber || phoneNumber.length < 13) {
      Alert.alert("알림", "올바른 휴대폰 번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await handleSendAuthCode(phoneNumber, () => {
        setAuthRequested(true);
        Alert.alert("인증번호 발송", "인증번호가 발송되었습니다.");
      });
    } catch (error) {
      Alert.alert("오류", "인증번호 발송에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAuth = async () => {
    if (!authCode || authCode.length !== 6) {
      Alert.alert("알림", "6자리 인증번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await handleVerifyAuthCode(phoneNumber, authCode, () => {
        setAuthVerified(true);
        Alert.alert("인증 완료", "휴대폰 인증이 완료되었습니다.");
      });
    } catch (error) {
      Alert.alert("오류", "인증번호가 올바르지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async () => {
    if (!authVerified) {
      Alert.alert("알림", "휴대폰 인증을 완료해주세요.");
      return;
    }

    if (!password || password.length < 4) {
      Alert.alert("알림", "비밀번호는 4자 이상 입력해주세요.");
      return;
    }

    if (!name.trim()) {
      Alert.alert("알림", "이름을 입력해주세요.");
      return;
    }

    if (!nickName.trim()) {
      Alert.alert("알림", "닉네임을 입력해주세요.");
      return;
    }

    if (!gender) {
      Alert.alert("알림", "성별을 선택해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await handleSignup({
        name,
        nickName,
        password,
        phoneNumber,
        gender,
      });

      if (res) {
        Alert.alert(
          "회원가입 완료",
          "회원가입이 완료되었습니다.\n로그인 화면으로 이동합니다.",
          [{ text: "확인", onPress: () => navigation.navigate("LoginScreen") }]
        );
      }
    } catch (error) {
      Alert.alert("오류", "회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    authVerified &&
    password.length >= 4 &&
    name.trim() &&
    nickName.trim() &&
    gender;

  const CustomInput = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = "default",
    rightIcon,
    onRightIconPress,
    editable = true,
  }: any) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, !editable && styles.inputDisabled]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Icon name={rightIcon} size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>회원가입</Text>
            <View style={styles.headerRight} />
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* 타이틀 */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>계정 만들기</Text>
              <Text style={styles.subtitle}>
                서비스 이용을 위해 정보를 입력해주세요
              </Text>
            </View>

            {/* 휴대폰 번호 */}
            <View style={styles.section}>
              <CustomInput
                label="휴대폰 번호"
                placeholder="010-1234-5678"
                value={phoneNumber}
                onChangeText={(text: string) =>
                  setPhoneNumber(formatPhoneNumber(text))
                }
                keyboardType="phone-pad"
                rightIcon="send"
                onRightIconPress={handleSendAuth}
                editable={!authRequested}
              />

              {authRequested && (
                <View style={styles.authSection}>
                  <CustomInput
                    label="인증번호"
                    placeholder="6자리 인증번호 입력"
                    value={authCode}
                    onChangeText={setAuthCode}
                    keyboardType="phone-pad"
                    rightIcon="checkmark"
                    onRightIconPress={handleVerifyAuth}
                  />

                  {authVerified && (
                    <View style={styles.successMessage}>
                      <Icon name="checkmark-circle" size={20} color="#4CAF50" />
                      <Text style={styles.successText}>
                        인증이 완료되었습니다
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>

            {/* 개인정보 */}
            <View style={styles.section}>
              <CustomInput
                label="비밀번호"
                placeholder="4자 이상 입력해주세요"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                rightIcon={showPassword ? "eye-off" : "eye"}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />

              <CustomInput
                label="이름"
                placeholder="실명을 입력해주세요"
                value={name}
                onChangeText={setName}
              />

              <CustomInput
                label="닉네임"
                placeholder="사용할 닉네임을 입력해주세요"
                value={nickName}
                onChangeText={setNickName}
              />

              {/* 성별 선택 */}
              <View style={styles.genderSection}>
                <Text style={styles.genderLabel}>성별</Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === "남" && styles.genderButtonSelected,
                    ]}
                    onPress={() => handleGenderSelect("남")}
                  >
                    <Icon
                      name={gender === "남" ? "male" : "male-outline"}
                      size={20}
                      color={gender === "남" ? "#fff" : "#666"}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        gender === "남" && styles.genderTextSelected,
                      ]}
                    >
                      남성
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === "여" && styles.genderButtonSelected,
                    ]}
                    onPress={() => handleGenderSelect("여")}
                  >
                    <Icon
                      name={gender === "여" ? "female" : "female-outline"}
                      size={20}
                      color={gender === "여" ? "#fff" : "#666"}
                    />
                    <Text
                      style={[
                        styles.genderText,
                        gender === "여" && styles.genderTextSelected,
                      ]}
                    >
                      여성
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* 약관 동의 */}
            <View style={styles.termsSection}>
              <TouchableOpacity style={styles.termsButton}>
                <Icon name="checkbox" size={20} color="#4B6EF6" />
                <Text style={styles.termsText}>
                  <Text style={styles.termsBold}>서비스 이용약관</Text> 및{" "}
                  <Text style={styles.termsBold}>개인정보처리방침</Text>에
                  동의합니다
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* 하단 버튼 */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.signupButton,
                !isFormValid && styles.signupButtonDisabled,
              ]}
              onPress={handleSignupSubmit}
              disabled={!isFormValid || isLoading}
            >
              <Text style={styles.signupButtonText}>
                {isLoading ? "가입 중..." : "가입하기"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  headerRight: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#000",
  },
  inputDisabled: {
    backgroundColor: "#f0f0f0",
    color: "#999",
  },
  rightIcon: {
    padding: 16,
  },
  authSection: {
    marginTop: 10,
  },
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 12,
    backgroundColor: "#f0f8f0",
    borderRadius: 8,
    gap: 8,
  },
  successText: {
    color: "#4CAF50",
    fontWeight: "500",
    fontSize: 14,
  },
  genderSection: {
    marginTop: 10,
  },
  genderLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 12,
  },
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  genderButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },
  genderButtonSelected: {
    backgroundColor: "#4B6EF6",
    borderColor: "#4B6EF6",
  },
  genderText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  genderTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  termsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  termsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  termsText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  termsBold: {
    fontWeight: "600",
    color: "#4B6EF6",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  signupButton: {
    backgroundColor: "#4B6EF6",
    borderRadius: 12,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  signupButtonDisabled: {
    backgroundColor: "#e0e0e0",
  },
  signupButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
