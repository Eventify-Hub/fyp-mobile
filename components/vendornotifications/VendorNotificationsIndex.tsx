// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';

// const notifications = [
//     {
//         id: '1',
//         type: 'Trending',
//         description: 'Your Post is Trending in the hot Section',
//         time: '9:56 AM',
//         icon: <MaterialCommunityIcons name="fire" size={24} color="orange" />,
//     },
//     {
//         id: '2',
//         type: 'Comment',
//         description: 'Someone commented on your post: Around Heavy ball floor these languag....',
//         time: '9:56 AM',
//         icon: <FontAwesome name="comment" size={24} color="blue" />,
//     },
//     {
//         id: '3',
//         type: 'Trending',
//         description: 'Your Post is Trending in the Fun Section',
//         time: '9:56 AM',
//         icon: <FontAwesome name="heart" size={24} color="red" />,
//     },
//     {
//         id: '4',
//         type: 'Upvote',
//         description: 'Someone Upvoted your post: Around Heavy ball floor these languag....',
//         time: '9:56 AM',
//         icon: <MaterialCommunityIcons name="arrow-up-bold" size={24} color="green" />,
//     },
// ];

// const NotificationsScreen: React.FC = () => {
//     const renderNotification = ({ item }: { item: typeof notifications[0] }) => (
//         <View style={styles.notificationContainer}>
//             <View style={styles.iconContainer}>{item.icon}</View>
//             <View style={styles.textContainer}>
//                 <Text style={styles.notificationType}>{item.type}</Text>
//                 <Text style={styles.notificationDescription}>{item.description}</Text>
//             </View>
//             <Text style={styles.notificationTime}>{item.time}</Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => router.back()}>
//                     <Ionicons name="arrow-back" size={24} color="#800080" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Notifications</Text>
//             </View>

//             {/* Notifications List */}
//             <FlatList
//                 data={notifications}
//                 renderItem={renderNotification}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={styles.list}
//             />

//             {/* Bottom Navigation */}
//             <View style={styles.bottomNavigation}>
//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => router.push('/dashboard')}
//                 >
//                     <View style={styles.iconContainer}>
//                         <Image
//                             source={{
//                                 uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/037c15c0-3bc9-4416-8c18-69934587461a?placeholderIfAbsent=true&apiKey=0a92af3bc6e24da3a9ef8b1ae693931a',
//                             }}
//                             style={styles.iconImage}
//                         />
//                     </View>
//                     <Text style={styles.navText}>Dashboard</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => router.push('/bottommessages')}
//                 >
//                     <View style={styles.iconContainer}>
//                         <Image
//                             source={{
//                                 uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/549e73c4-da91-40a5-a5c8-fd173b0e2a62?placeholderIfAbsent=true&apiKey=0a92af3bc6e24da3a9ef8b1ae693931a',
//                             }}
//                             style={styles.iconImage}
//                         />
//                     </View>
//                     <Text style={styles.navText}>Messages</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => router.push('/bottomnotification')}
//                 >
//                     <View style={styles.iconContainer}>
//                         <Image
//                             source={{
//                                 uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/198f4cc8-49ff-4ccc-b97b-619e572143d4?placeholderIfAbsent=true&apiKey=0a92af3bc6e24da3a9ef8b1ae693931a',
//                             }}
//                             style={styles.iconImage}
//                         />
//                     </View>
//                     <Text style={styles.navText}>Notifications</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => router.push('/account')}
//                 >
//                     <View style={styles.iconContainer}>
//                         <Image
//                             source={{
//                                 uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/73089a6f-a9a6-4c94-9fd1-4cdd5923a137?placeholderIfAbsent=true&apiKey=0a92af3bc6e24da3a9ef8b1ae693931a',
//                             }}
//                             style={styles.iconImage}
//                         />
//                     </View>
//                     <Text style={styles.navText}>Account</Text>
//                 </TouchableOpacity>
//             </View>

//             );
// };

//             const styles = StyleSheet.create({
//                 container: {
//                 flex: 1,
//             backgroundColor: '#FBEFF7',
//             paddingTop: 50,
//     },
//             header: {
//                 flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: 16,
//             paddingTop: 40,
//             paddingBottom: 16,
//             backgroundColor: '#FBEFF7',
//     },
//             headerTitle: {
//                 fontSize: 18,
//             fontWeight: 'bold',
//             color: '#000',
//             marginLeft: 16,
//     },
//             list: {
//                 paddingHorizontal: 16,
//     },
//             notificationContainer: {
//                 flexDirection: 'row',
//             alignItems: 'center',
//             paddingVertical: 12,
//             borderBottomWidth: 1,
//             borderBottomColor: '#EEE',
//     },
//             iconContainer: {
//                 width: 40,
//             height: 40,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginRight: 16,
//     },
//             textContainer: {
//                 flex: 1,
//     },
//             notificationType: {
//                 fontSize: 16,
//             fontWeight: 'bold',
//             color: '#000',
//     },
//             notificationDescription: {
//                 fontSize: 14,
//             color: '#666',
//             marginTop: 2,
//     },
//             notificationTime: {
//                 fontSize: 12,
//             color: '#666',
//     },
//             footer: {
//                 flexDirection: 'row',
//             justifyContent: 'space-around',
//             paddingVertical: 12,
//             borderTopWidth: 1,
//             borderTopColor: '#EEE',
//             backgroundColor: '#FBEFF7',
//     },
//             footerButton: {
//                 justifyContent: 'center',
//             alignItems: 'center',
//     },
//             footerText: {
//                 fontSize: 12,
//             color: '#800080',
//             marginTop: 4,
//     },

//             bottomNavigation: {
//                 flexDirection: 'row',
//             justifyContent: 'space-around',
//             alignItems: 'center',
//             height: 80,
//             backgroundColor: '#fff',
//             borderTopWidth: 1,
//             borderTopColor: '#E0E0E0',
//             position: 'absolute',
//             bottom: 0,
//             width: '100%',
//       },
//             navItem: {
//                 alignItems: 'center',
//             justifyContent: 'center',
//       },
//             iconContainer: {
//                 backgroundColor: '#780C60',
//             width: 30,
//             height: 30,
//             borderRadius: 25,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginBottom: 5,
//       },
//             iconImage: {
//                 width: 37,
//             height: 37,
//             marginBottom: 5,
//       },
//             navText: {
//                 fontSize: 10,
//             color: '#000000',
//       },

// });

//             export default NotificationsScreen;
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavigationFinal from "../dashboard/BottomNavigationFinal";

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

            {/* Bottom Navigation */}
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
    // iconContainer: {
    //     width: 40,
    //     height: 40,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginRight: 16,
    // },
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
    iconContainer: {
        backgroundColor: '#780C60',
        width: 30,
        height: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
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
    homeButton: {
        // marginBottom: 30, // Moves the Home button slightly upward
        transform: [{ translateY: -10 }], // Alternatively, use translateY to lift it
    },
});

export default NotificationsScreen;
