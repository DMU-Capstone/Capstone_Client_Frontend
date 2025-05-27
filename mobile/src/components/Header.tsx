// HomeScreen.tsx
import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, TextInput
} from 'react-native';


export const Header: React.FC = () => {
    return (

        <View style={styles.header}>
            <View style={styles.searchBar}>
                <TextInput style={styles.input} placeholder="검색어를 입력하세요" />
            </View>

            {/* 탭 메뉴 */}
            <View style={styles.tabMenu}>
                {['홈', '대기 목록', '공지사항', '호스트 등록'].map((tab, idx) => (
                    <Text key={idx} style={[styles.tab, idx === 0 && styles.activeTab]}>
                        {tab}
                    </Text>
                ))}
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },

    searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, },
    input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 8 },
    tabMenu: { flexDirection: 'row', marginTop: 16, gap: 16, justifyContent: 'space-around' },
    tab: { color: '#999' },
    activeTab: { color: '#007AFF', fontWeight: 'bold' },
});

