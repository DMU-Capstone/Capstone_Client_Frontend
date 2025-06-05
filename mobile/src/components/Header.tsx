// HomeScreen.tsx
import React from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Header: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const [activeTab, setActiveTab] = React.useState('홈');

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('state', (e) => {
            const currentRoute = e.data.state.routes[e.data.state.index];
            switch (currentRoute.name) {
                case 'MainScreen':
                    setActiveTab('홈');
                    break;
                case 'StoplistScreen':
                    setActiveTab('대기 목록');
                    break;
                case 'NoticeScreen':
                    setActiveTab('공지사항');
                    break;
                case 'HostRegisterScreen':
                    setActiveTab('호스트 등록');
                    break;
            }
        });

        return unsubscribe;
    }, [navigation]);

    const handleTabPress = (tabName: string) => {
        setActiveTab(tabName);
        switch (tabName) {
            case '홈':
                navigation.navigate('MainScreen');
                break;
            case '대기 목록':
                navigation.navigate('StoplistScreen');
                break;
            case '공지사항':
                navigation.navigate('NoticeScreen');
                break;
            case '호스트 등록':
                navigation.navigate('HostRegisterScreen');
                break;
        }
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={styles.headerLogo}>
                    <Text style={styles.logoText}>Wait:It</Text>
                </View>
                <View style={styles.searchBar}>
                    <TextInput style={styles.input} placeholder="검색어를 입력하세요" />
                </View>
            </View>

            {/* 탭 메뉴 */}
            <View style={styles.tabMenu}>
                {['홈', '대기 목록', '공지사항', '호스트 등록'].map((tab, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={() => handleTabPress(tab)}
                        style={styles.tabContainer}
                    >
                        <Text style={[styles.tab, activeTab === tab && styles.activeTab]}>
                            {tab}
                        </Text>
                        {activeTab === tab && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerLogo: {
        flexShrink: 0,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF'
    },
    searchBar: {
        flex: 1,
    },
    input: {
        height: 40,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    tabMenu: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 16,
        justifyContent: 'space-around'
    },
    tabContainer: {
        alignItems: 'center',
    },
    tab: {
        color: '#999',
        paddingVertical: 4,
    },
    activeTab: {
        color: '#007AFF',
        fontWeight: 'bold'
    },
    tabIndicator: {
        position: 'absolute',
        bottom: -4,
        width: '100%',
        height: 2,
        backgroundColor: '#007AFF',
        borderRadius: 1,
    },
});

