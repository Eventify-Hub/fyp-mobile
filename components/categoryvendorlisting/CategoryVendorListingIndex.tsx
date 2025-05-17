
import getAllVendorsByCategoryId from "@/services/getAllVendorsByCategoryId";
import { getSecureData } from "@/store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [data, setData] = useState<any>([]);
  const [headerTitle, setHeaderTitle] = useState<string>("");
  const [vendorData, setVendorData] = useState<any>(null);

  useEffect(() => {
    fetchData();
    fetchCategoryName(); // Fetch category name for header title
  }, []);

  const fetchData = async () => {
    const categoryId = (await getSecureData("categoryId")) || "";
    const data = await getAllVendorsByCategoryId(categoryId);
    setData(data);
  };

  const fetchCategoryName = async () => {
    const categoryName = (await getSecureData("categoryName")) || "Category";
    setHeaderTitle(categoryName);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.coverImage,
        }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.title}>
          {item.name}
        </Text>
        <Text style={styles.subtitle}>Pakistan</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={14} color="#FF8C00" />
          <Text style={styles.address}>{item.contactDetails.city}</Text>
        </View>
      </View>
      <View style={styles.priceSection}>
        <Text style={styles.priceText}>Starting From</Text>

        <Text style={styles.price}>
          {item?.BusinessDetails?.minimumPrice || "N/A"}/-
        </Text>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => router.push(`/vendorprofiledetails?id=${item._id}`)}
      >
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/*add test id */}
        <TouchableOpacity testID="back-button" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle || "Loading..."}</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#C4C4C4"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search Salon & Spa"
          style={styles.searchInput}
          placeholderTextColor="#C4C4C4"
        />
        {/*add test id */}
        <TouchableOpacity
          testID="filter-button"
          onPress={() => {
            router.push("/makeupfilter");
          }}
        >
          <MaterialIcons name="tune" size={24} color="#C4C4C4" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8E9F0",
    padding: 16,
    paddingTop: 70,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 16,
    elevation: 1,
    justifyContent: "space-between",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  city: {
    fontSize: 12,
    color: "#FF8C00",
    marginLeft: 4,
  },
  priceSection: {
    alignItems: "flex-end",
    flex: 1,
    marginRight: 10,
  },
  priceText: {
    fontSize: 12,
    color: "#888",
  },
  price: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  viewButton: {
    backgroundColor: "#780C60",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: '#7A7A7A',
    marginVertical: 8,
  },
});
