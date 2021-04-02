import React from "react";
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from './src/components/coins/CoinsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Colors from "./src/res/colors";
import FavoritesSack from './src/components/favorites/FavoritesStack'

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: Colors.blackPearl
          }
        }}
      >
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({ size, color }) => (<Image
              style={{ tintColor: color, width: size, height: size }}
              source={require('./src/assets/bank.png')}
            />
            )
          }}
        />
        <Tabs.Screen
          name="Favorites"
          component={FavoritesSack}
          options={{
            tabBarIcon: ({ size, color }) => (<Image
              style={{ tintColor: color, width: size, height: size }}
              source={require('./src/assets/star.png')}
            />
            )
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}


export default App;
