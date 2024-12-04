import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from "@/src/screens/ProductDetailsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileScreen from "@/src/screens/ProfileScreen";
import CartScreen from "@/src/screens/CartScreen";
import {useTheme} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SafeAreaView} from "react-native";
import DeliveryScreen from "@/src/screens/DeliveryScreen";
import OrderDetailsScreen from "@/src/screens/OrderDetailsScreen";
import CreateOrderScreen from "@/src/screens/CreateOrderScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen
                name="Product"
                component={ProductDetailsScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function DeliveryStack() {
    return (
        <Stack.Navigator initialRouteName="Delivery">
            <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ headerShown: false }}/>
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetailsScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function CartStack() {
    return (
        <Stack.Navigator initialRouteName="Cart">
            <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }}/>
            <Stack.Screen
                name="CreateOrder"
                component={CreateOrderScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function AppNavigation() {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarStyle: { backgroundColor: colors.surface },
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.onSurface,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (route.name === 'Cart') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        } else if (route.name === 'Delivery') {
                            iconName = focused ? 'bicycle' : 'bicycle-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Главная' }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Профиль' }}/>
                <Tab.Screen name="Cart" component={CartStack} options={{ tabBarLabel: 'Корзина' }}/>
                <Tab.Screen name="Delivery" component={DeliveryStack} options={{ tabBarLabel: 'Доставка' }} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}