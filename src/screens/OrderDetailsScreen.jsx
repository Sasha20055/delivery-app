import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";

const OrderDetailsScreen = ({ route, navigation }) => {
    const { colors } = useTheme();
    const { order } = route.params;
    const [isConfirmed, setIsConfirmed] = useState(order.isConfirmed || false);

    const calculateTotal = (items) => {
        return items
            .reduce((total, item) => {
                const { price, quantity, discount } = item;

                if (!discount) {
                    return total + price * quantity;
                }

                let discountedPrice = price;

                if (typeof discount === 'string' && discount.endsWith('%')) {
                    const percentage = parseFloat(discount) / 100;
                    discountedPrice = price - price * percentage;
                }

                if (typeof discount === 'number') {
                    discountedPrice = Math.max(price / 100 * (100 - discount), 0);
                }

                return total + discountedPrice * quantity;
            }, 0)
            .toFixed(2);
    };

    const handleConfirmOrder = () => {
        setIsConfirmed(true);
        alert("Заказ подтверждён");
    };

    const handleCancelOrder = () => {
        setIsConfirmed(false);
        alert("Подтверждение заказа отменено");
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text variant="headlineLarge" style={[styles.title, { color: colors.text }]}>
                Подробно о заказе
            </Text>

            <View style={styles.section}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.primary }]}>
                    Товары в заказе:
                </Text>
                {order.items.map((item, index) => (
                    <Card key={index} style={[styles.card, { backgroundColor: colors.surface }]}>
                        <Card.Content>
                            <Text variant="bodyLarge" style={[styles.itemName, { color: colors.text }]}>
                                {item.name}
                            </Text>
                            <Text variant="bodyMedium" style={[styles.itemQuantity, { color: colors.text }]}>
                                Количество: {item.quantity}
                            </Text>
                            <Text variant="bodyMedium" style={[styles.itemPrice, { color: colors.text }]}>
                                Цена: {item.price} ₽
                            </Text>
                        </Card.Content>
                    </Card>
                ))}
            </View>

            <View style={styles.section}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.primary }]}>
                    Информация о доставке:
                </Text>
                <Card style={[styles.card, { backgroundColor: colors.surface }]}>
                    <Card.Content>
                        <Text variant="bodyLarge" style={[styles.deliveryInfo, { color: colors.text }]}>
                            Имя получателя: {order.name}
                        </Text>
                        <Text variant="bodyLarge" style={[styles.deliveryInfo, { color: colors.text }]}>
                            Адрес доставки: {order.address}
                        </Text>
                        <Text variant="bodyMedium" style={[styles.deliveryInfo, { color: colors.text }]}>
                            Способ доставки: Курьером
                        </Text>
                    </Card.Content>
                </Card>
            </View>

            <View style={styles.section}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.primary }]}>
                    Общая стоимость:
                </Text>
                <Text variant="headlineSmall" style={[styles.totalPrice, { color: colors.accent }]}>
                    {calculateTotal(order.items)} ₽
                </Text>
            </View>

            <View style={styles.section}>
                <Text variant="titleMedium" style={[styles.sectionTitle, { color: colors.primary }]}>
                    Статус подтверждения:
                </Text>
                <Text variant="bodyLarge" style={[styles.confirmationStatus, { color: colors.text }]}>
                    {isConfirmed ? "Заказ подтверждён" : "Заказ не подтверждён"}
                </Text>
            </View>

            <View style={styles.actions}>
                <Button mode="contained" style={styles.button} onPress={() => navigation.goBack()}>
                    Вернуться
                </Button>
                {!isConfirmed ? (
                    <Button mode="contained" style={styles.button} onPress={handleConfirmOrder}>
                        Подтвердить заказ
                    </Button>
                ) : (
                    <Button mode="contained" style={styles.button} onPress={handleCancelOrder}>
                        Отменить подтверждение
                    </Button>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        marginBottom: 20,
        fontWeight: "bold",
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    card: {
        marginBottom: 10,
        borderRadius: 8,
        elevation: 3,
    },
    itemName: {
        fontWeight: "bold",
    },
    itemQuantity: {
        marginTop: 4,
    },
    itemPrice: {
        marginTop: 4,
    },
    deliveryInfo: {
        marginBottom: 4,
    },
    totalPrice: {
        fontWeight: "bold",
    },
    confirmationStatus: {
        fontWeight: "bold",
    },
    actions: {
        marginTop: 20,
    },
    button: {
        marginBottom: 16,
    },
});

export default OrderDetailsScreen;