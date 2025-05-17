import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import BottomNavigationFinal from '../dashboard/BottomNavigationFinal';

const notifications = [
    {
        id: '1',
        type: 'Trending',
        description: 'Your Post is Trending in the hot Section',
        time: '9:56 AM',
        icon: <MaterialCommunityIcons name="fire" size={24} color="orange" />,
    },
    {
        id: '2',
        type: 'Comment',
        description: 'Someone commented on your post: Around Heavy ball floor these languag....',
        time: '9:56 AM',
        icon: <FontAwesome name="comment" size={24} color="blue" />,
    },
    {
        id: '3',
        type: 'Trending',
        description: 'Your Post is Trending in the Fun Section',
        time: '9:56 AM',
        icon: <FontAwesome name="heart" size={24} color="red" />,
    },
    {
        id: '4',
        type: 'Upvote',
        description: 'Someone Upvoted your post: Around Heavy ball floor these languag....',
        time: '9:56 AM',
        icon: <MaterialCommunityIcons name="arrow-up-bold" size={24} color="green" />,
    },
];

const NotificationsScreen: React.FC = () => {
    const renderNotification = ({ item }: { item: typeof notifications[0] }) => (
        <View style={styles.notificationContainer}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <View style={styles.textContainer}>
                <Text style={styles.notificationType}>{item.type}</Text>
                <Text style={styles.notificationDescription}>{item.description}</Text>
            </View>
            <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#800080" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>

            {/* Notifications List */}
            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />

            <BottomNavigationFinal />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8E9F0',
        paddingTop: 70,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#FBEFF7',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 16,
    },
    list: {
        paddingHorizontal: 16,
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    notificationType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    notificationDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    notificationTime: {
        fontSize: 12,
        color: '#666',
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 37,
        height: 37,
        marginBottom: 5,
    },
    navText: {
        fontSize: 10,
        color: '#000000',
    },
});

export default NotificationsScreen;
