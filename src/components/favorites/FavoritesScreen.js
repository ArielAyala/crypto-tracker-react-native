import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../res/colors';
import FavoritesEmptyState from './FavoritesEmpyState'

class FavoritesScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FavoritesEmptyState />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1,
    }
})

export default FavoritesScreen;