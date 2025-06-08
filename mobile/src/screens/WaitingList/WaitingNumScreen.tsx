import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

export const WaitingNumScreen: React.FC = () => {
    const waitingNumber = 32; // 예시 대기번호
    const waitingCustomers = 1; // 예시 대기손님 수
    const currentTime = '2025.06.02 22:59:30'; // 예시 현재 시간

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerRight}>
                <Text style={styles.timeText}>{currentTime}</Text>
            </View>

            <View style={styles.topContainer}>
                <View style={styles.universityBox}>
                    <Text style={styles.universityText}>동양미래대학교</Text>
                </View>
                <Text style={styles.waitingNumLabel}>대기번호</Text>
                <Text style={styles.waitingNumber}>{waitingNumber}</Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>대기손님</Text>
                    <Text style={styles.infoValue}>{waitingCustomers}명</Text>
                </View>
                <Text style={styles.smallText}>영업 상황에 따라 대기시간이 지연될 수 있습니다.</Text>
            </View>

            <View style={styles.notificationContainer}>
                <Text style={styles.infoLabel}>대기알림</Text>
                <Text style={styles.smallText}>대기 손님이 3명일 때 알림으로 알려드려요</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>번호표 취소</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        paddingTop: 20,
    },
    headerRight: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    timeText: {
        fontSize: 12,
        color: '#555',
    },
    topContainer: {
        width: '80%',
        alignItems: 'center',
        marginTop: 60,
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    universityBox: {
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginBottom: 20,
    },
    universityText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    waitingNumLabel: {
        fontSize: 18,
        color: '#888',
        marginBottom: 5,
    },
    waitingNumber: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#4562D6',
    },
    infoContainer: {
        width: '80%',
        marginTop: 30,
        paddingHorizontal: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    smallText: {
        fontSize: 13,
        color: '#666',
        marginBottom: 10,
    },
    notificationContainer: {
        width: '80%',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'center',
        paddingBottom: 30,
    },
    cancelButton: {
        backgroundColor: '#4562D6',
        width: '80%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
