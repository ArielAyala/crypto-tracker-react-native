import React, { Component } from 'react';
import { View, Text, Image, Pressable, Alert, StyleSheet, SectionList, FlatList } from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';
import Formater from '../../libs/formater';


class CoinDetailScreen extends Component {

    state = {
        coin: {},
        markets: [],
        isFavorite: false,
        cotizacionDolar: 0
    }

    toogleFavorite = () => {
        if (this.state.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }
    }

    /**
     * Save to storage as a favorite coin
     */
    addFavorite = async () => {
        const coin = JSON.stringify(this.state.coin)
        const key = `favorite-${this.state.coin.id}`;
        const stored = await Storage.instance.store(key, coin);
        if (stored) {
            this.setState({ isFavorite: true });
        }
    }

    removeFavorite = async () => {

        Alert.alert('Remove favorite', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel'
            },
            {
                text: 'Remove',
                onPress: async () => {
                    const key = `favorite-${this.state.coin.id}`;
                    await Storage.instance.remove(key);
                    this.setState({ isFavorite: false });
                },
                style: 'destructive'
            }
        ])

    }

    /**
     * Check into the storage if the coin is into the storage as a 'favorite'
     */
    checkIsFavorite = async () => {
        try {
            const key = `favorite-${this.state.coin.id}`;
            const favoriteString = await Storage.instance.get(key);
            if (favoriteString != null) {
                this.setState({ isFavorite: true })
            }

        } catch (error) {
            console.log('get favorite error', error);
        }
    }

    /**
     * Get from the images api the coin's icon/symbol
     * @param {*} name Use the coin name getted from the api
     * @returns Return a text for create uri into the Image source params.
     */
    getSymbolIcon = (name) => {
        if (name) {
            const symbol = name.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`
        }

    }

    /**
     * Create sections for SectionList
     * @param {*} coin 
     * @returns 
     */
    getSections = (coin) => {
        const sections = [
            {
                title: 'Market cap',
                data: [`$ ${Formater.formatWithThousandsSeparator(coin.market_cap_usd)}`]
            },
            {
                title: 'Volume 24h',
                // data: [coin.volume24],
                data: [`$ ${Formater.formatWithThousandsSeparator(coin.volume24)}`]
            },
            {
                title: 'Change 24h',
                data: [`${coin.percent_change_24h}%`]
            }
        ];

        return sections;
    }

    /**
     * Get markets where the selected coin is operating
     */
    getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
        const markets = await Http.instance.get(url);
        this.setState({ markets });
    }

    getCotizacionDolar = async () => {
        const cotizacion = await Http.instance.get('https://dolar.melizeche.com/api/1.0/');
        if (cotizacion) {
            const { dolarpy } = cotizacion;
            this.setState({ cotizacionDolar: dolarpy.bcp.compra })
        }
    }

    componentDidMount() {
        const { coin } = this.props.route.params;

        this.props.navigation.setOptions({ title: coin.symbol });

        this.getMarkets(coin.id);

        this.getCotizacionDolar()

        this.setState({ coin }, () => {
            this.checkIsFavorite()
        })

    }

    render() {

        const { coin, markets, isFavorite, cotizacionDolar } = this.state;
        const priceGuarani = coin.price_usd * cotizacionDolar;
        const priceGuaraniFormated = Formater.formatWithThousandsSeparator(priceGuarani);
        return (
            // SECTION COIN DETAIL
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <View style={styles.row}>
                        <Image
                            style={styles.iconImg}
                            source={{ uri: this.getSymbolIcon(coin.name) }}
                        />
                        <Text style={styles.titleText}>{coin.name}</Text>
                    </View>

                    {/* BUTTON FOR SET/REMOVE FAVORITE */}
                    <Pressable
                        onPress={this.toogleFavorite}
                        style={[
                            styles.btnFavorite,
                            isFavorite ?
                                styles.btnFavoriteRemove :
                                styles.btnFavoriteAdd
                        ]}
                    >
                        <Text style={styles.btnFavoriteText}> {isFavorite ? 'Remove favorite' : 'Add favorite'} </Text>
                    </Pressable>

                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.priceTitle}>Price</Text>
                    <Text style={styles.priceText}>{`$ ${coin.price_usd}`}</Text>
                    <Text style={styles.priceText}>{`₲ ${priceGuaraniFormated}`}</Text>
                </View>

                <SectionList
                    style={styles.section}
                    sections={this.getSections(coin)}
                    keyExtractor={(item) => item}

                    renderSectionHeader={({ section }) =>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                    renderItem={({ item }) =>
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    }

                />

                {/* SECTION MARKETS */}
                <Text style={styles.marketsTitle}>Markets</Text>
                <Text>
                    <FlatList
                        style={styles.list}
                        horizontal={true}
                        data={markets}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <CoinMarketItem item={item} />}
                    />
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    row: {
        flexDirection: 'row'
    },
    subHeader: {
        backgroundColor: "rgba(0,0,0,0.1)",
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
        marginLeft: 8
    },
    iconImg: {
        width: 25,
        height: 25
    },
    priceContainer: {
        marginTop:15,
        marginBottom: 15
    },
    priceTitle: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 17,
        fontWeight: 'bold'
    },
    priceText: {
        color: Colors.white,
        textAlign: 'center'
    },
    section: {
        maxHeight: 230,
        paddingLeft: 16,
        marginBottom: 15
    },
    list: {
        maxHeight: 100,

    },
    sectionHeader: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 8
    },
    sectionItem: {
        padding: 8,
        marginBottom: 15
    },
    itemText: {
        color: Colors.white,
        fontSize: 14
    },
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    },
    marketsTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16,
        textAlign: 'center'
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnFavoriteText: {
        color: Colors.white
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine
    }
})

export default CoinDetailScreen;