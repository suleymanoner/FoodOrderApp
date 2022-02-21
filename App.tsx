import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { LandingScreen } from './src/screens/LandingScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { HomeScreen } from './src/screens/HomeScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux'
import { SearchScreen } from './src/screens/SearchScreen';
import { RestaurantScreen } from './src/screens/RestaurantScreen';
import { FoodDetailsScreen } from './src/screens/FoodDetailsScreen';
import { CartScreen } from './src/screens/CartScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { OrderScreen } from './src/screens/OrderScreen';
import { OrderDetailScreen } from './src/screens/OrderDetailScreen';
import { AccountScreen } from './src/screens/AccountScreen';
import { OfferScreen } from './src/screens/OfferScreen';
import { LocationScreen } from './src/screens/LocationScreen';


const switchNavigator = createSwitchNavigator({

  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen,
      LocationPage: LocationScreen
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    }) 
  },
  homeStack: createBottomTabNavigator({

    Home: {
      screen: createStackNavigator({
        HomePage: HomeScreen,
        SearchPage: SearchScreen,
        RestaurantPage: RestaurantScreen,
        FoodDetailsPage: FoodDetailsScreen
      }, {
        defaultNavigationOptions: {
          headerShown: false
      }
    }),
      
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Offer: {
      screen: createStackNavigator({
        OfferPage: OfferScreen
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Cart: {
      screen: createStackNavigator({
        CartPage: CartScreen,
        LoginPage: LoginScreen,
        OrderPage: OrderScreen,
        OrderDetailPage: OrderDetailScreen,
        CartOfferPage: OfferScreen
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Account: {
      screen: createStackNavigator({
        AccountPage: AccountScreen,
        LoginPage: LoginScreen,
        AccountOrderPage: OrderScreen,
        OrderDetailPage: OrderDetailScreen
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
  })
})


const AppNavigation = createAppContainer(switchNavigator)

const App = () => {
  return(
    <Provider store={store} >
      <AppNavigation />
    </Provider>
  )
}

export default App;


const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30
  }
})