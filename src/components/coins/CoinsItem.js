import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../res/colors';

const CoinsItem = (props) => {
    const { item } = props;
    return (
        <View style={styles.container} >
            <View style={styles.row}>
                <Text style={styles.symbolText} >{item.symbol}</Text>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
            </View>
            <View style={styles.row} >
                <Text style={styles.percentText} >{item.percent_change_1h}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16
    },
    row: {
        flexDirection: 'row',
    },
    symbolText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12
    },
    nameText: {
        color: Colors.white,
        fontSize: 16,
        marginRight: 14
    },
    priceText: {
        color: Colors.white,
        fontSize: 14,
    },
    percentText: {
        color: Colors.white,
        fontSize: 12
    }
})

export default CoinsItem;