import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const SearchBar = ({ search, handleSearch }) => {
    return (
        <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for products or stores"
                placeholderTextColor="#999"
                value={search}
                onChangeText={handleSearch}
            />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#fff',
    }, searchIcon: {
        fontSize: 16,
        color: '#999',
        marginRight: 10,
    },

    searchPlaceholder: {
        color: '#999',
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#FFFFFF',
    }, searchContainer: {
        marginBottom: 20,
    },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F1F1F',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 10,
    },


})