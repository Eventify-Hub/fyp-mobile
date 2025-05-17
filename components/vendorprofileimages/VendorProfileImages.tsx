// import { router } from 'expo-router';
// import React from 'react';
// import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// const images = [
//     { id: '1', uri: 'https://example.com/image1.jpg' },
//     { id: '2', uri: 'https://example.com/image2.jpg' },
//     { id: '3', uri: 'https://example.com/image3.jpg' },
//     { id: '4', uri: 'https://example.com/image4.jpg' },
//     { id: '5', uri: 'https://example.com/image5.jpg' },
//     { id: '6', uri: 'https://example.com/image6.jpg' },
//     { id: '7', uri: 'https://example.com/image7.jpg' },
//     { id: '8', uri: 'https://example.com/image8.jpg' },
// ];

// const PhotosScreen: React.FC = () => {
//     const renderItem = ({ item }: { item: { id: string; uri: string } }) => (
//         <View style={styles.imageContainer}>
//             <Image source={{ uri: item.uri }} style={styles.image} />
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => router.back()}>
//                     <Text style={styles.backText}>Back</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.title}>Photos</Text>
//             </View>

//             {/* Photos Grid */}
//             {/* <FlatList
//                 data={images}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id}
//                 numColumns={2}
//                 contentContainerStyle={styles.grid}
//                 showsVerticalScrollIndicator={false}
//             /> */}

//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F8EAF2',
//         paddingTop: 70, // Add padding for the status bar
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 16,
//         marginBottom: 16,
//     },
//     backText: {
//         fontSize: 16,
//         color: '#333',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     grid: {
//         paddingHorizontal: 10,
//     },
//     imageContainer: {
//         flex: 1,
//         margin: 8,
//         borderRadius: 12,
//         overflow: 'hidden',
//         backgroundColor: '#FFF',
//         elevation: 3, // Add shadow for Android
//     },
//     image: {
//         width: '100%',
//         height: 150,
//         resizeMode: 'cover',
//     },
// });

// export default PhotosScreen;
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PhotosScreen: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [vendorData, setVendorData] = useState<any>(null);

    // Fetch images from backend
    const fetchImages = async () => {

        try {
            const response = await axios.get('http://13.233.214.252:3000/api/vendor/6767fd771413582eafc4688c'); // Replace with your API endpoint
            setImages(response.data.images.map((image: string) => `http://13.233.214.252:3000${image}`));
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#780C60" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Photos</Text>
            </View>

            {/* Photos Grid */}
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Photos</Text>
                <ScrollView horizontal style={styles.photoContainer}>
                    {vendorData.images.map((image: string, index: number) => (
                        <Image
                            key={index}
                            source={{
                                uri: `http://13.233.214.252:3000${image}`,
                            }}
                            style={styles.photo}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EAF2',
        paddingTop: 70, // Add padding for the status bar
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8EAF2',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    backText: {
        fontSize: 16,
        color: '#333',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    grid: {
        paddingHorizontal: 10,
    },
    imageContainer: {
        flex: 1,
        margin: 8,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        elevation: 3, // Add shadow for Android
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    photoContainer: {
        flexDirection: 'row',
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
});

export default PhotosScreen;
