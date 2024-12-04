import React, {useContext, useEffect, useState} from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import {Button, Text, useTheme} from "react-native-paper";
import CartContext from "@/src/context/CartContext";
import orderContext from "@/src/context/OrderContext";

export default function CreateOrderScreen({ route, navigation }) {
    const { cart, clearCart } = useContext(CartContext);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState("");
    const { colors } = useTheme();
    const { addOrder } = useContext(orderContext);
    const {getTotalPrice} = route.params;

    useEffect(() => {
        cart.length === 0 && navigation.navigate("Cart");
    }, [cart]);

    const handleCheckout = async () => {

        if (!name || !address) {
            Alert.alert("Ошибка", "Пожалуйста, заполните все поля.");
            return;
        }

        await addOrder({ name, address, items: cart });
        await clearCart();
        alert('Заказ успешно оформлен!');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={styles.title}>Оформление заказа</Text>
            <TextInput
                style={[styles.input, {color: colors.text}]}
                placeholderTextColor={colors.outline}
                placeholder="Ваше имя"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={[styles.input, {color: colors.text}]}
                placeholderTextColor={colors.outline}
                placeholder="Адрес доставки"
                value={address}
                onChangeText={setAddress}
            />
            <Text style={styles.total}>Итоговая сумма: {getTotalPrice().toFixed(2)} ₽</Text>
            <Button mode="contained" onPress={handleCheckout} style={styles.button}>
                Подтвердить заказ
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        height: "100%",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    total: {
        fontSize: 18,
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});