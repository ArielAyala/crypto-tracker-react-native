import React from 'react';
import { View, Text } from 'react-native';

const CoinsItem = (props) => {
    const { item } = props;
    return (
        <View>
            <Text>{item.name}</Text>
            <Text>{item.symbol}</Text>
        </View>
    );
}

export default CoinsItem;