import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import CartContext from '@/src/context/CartContext';

export default function CartScreen({ navigation }) {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const { colors } = useTheme();

    const calculateDiscountedPrice = (product) => {
        const { price, discount } = product;
        if (!discount) return price;

        if (typeof discount === 'string' && discount.endsWith('%')) {
            const percentage = parseFloat(discount) / 100;
            return price - price * percentage;
        }

        if (typeof discount === 'number') {
            return Math.max((price / 100) * (100 - discount), 0);
        }

        return price;
    };

    const getTotalPrice = () =>
        cart.reduce(
            (total, product) =>
                total + calculateDiscountedPrice(product) * product.quantity,
            0
        );

    const addOrder = () => {
        navigation.navigate('CreateOrder', { getTotalPrice });
    };

    const gotoProduct = (product) => {
        navigation.navigate('Home', {Screen: 'Stack', params: product});
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {cart.length > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item?.id.toString()}
                        renderItem={({ item }) => {
                            const discountedPrice = calculateDiscountedPrice(item);

                            return (
                                <Card style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => gotoProduct(item)}>
                                    <Card.Title
                                        titleStyle={{ color: colors.text }}
                                        subtitleStyle={{ color: colors.text }}
                                        title={item.name}
                                        subtitle={`Цена: ${item.price.toFixed(2)} ₽${
                                            item.discount
                                                ? ` (со скидкой: ${discountedPrice.toFixed(2)} ₽)`
                                                : ''
                                        } | Количество: ${item.quantity}`}
                                    />
                                    <Card.Actions>
                                        <Button onPress={() => removeFromCart(item.id)}>
                                            Удалить
                                        </Button>
                                    </Card.Actions>
                                </Card>
                            );
                        }}
                    />
                    <Text style={styles.total}>
                        Общая стоимость:{' '}
                        <Text style={[styles.total, { color: colors.accent }]}>
                            {getTotalPrice().toFixed(2)} ₽
                        </Text>
                    </Text>
                    <Button mode="contained" onPress={addOrder} style={styles.button}>
                        Создать заказ
                    </Button>
                    <Button mode="contained" onPress={clearCart} style={styles.button}>
                        Очистить корзину
                    </Button>
                </>
            ) : (
                <Text style={styles.emptyText}>Ваша корзина пуста.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        margin: 10,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    button: {
        marginTop: 16,
    },
    emptyText: {
        textAlign: 'center',
        margin: 'auto',
        fontSize: 18,
        color: '#555',
    },
});