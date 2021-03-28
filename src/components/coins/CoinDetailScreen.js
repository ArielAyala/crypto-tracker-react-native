import React, { Component } from 'react';
import { View, Text } from 'react-native';


class CoinDetailScreen extends Component {

    componentDidMount() {
        console.log('coin',this.props.route.params);
    }

    render() {
        return (
            <View>
                <Text>Coin Detail Screen</Text>
            </View>
        );
    }
}

export default CoinDetailScreen;