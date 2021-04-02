import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../res/colors'


const FavoritesEmptyState = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You don't have any favorite yet</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent:'center'
    },
    text: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'
    }

})

export default FavoritesEmptyState;