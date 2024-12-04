import react, {useEffect} from "react";
import {Avatar, Button, Card, Text, useTheme} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import React from "react";

export default function OrderCard({ order, handleViewDetails }) {
    const { colors } = useTheme();

    return (
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Content>
                <View style={styles.header}>
                    <Avatar.Text
                        size={48}
                        label={order.orderNumber.slice(-4)}
                        style={styles.avatar}
                    />
                    <View style={styles.info}>
                        <Text variant="titleMedium" style={{ color: colors.onSurface }}>
                            Заказ: {order.orderNumber}
                        </Text>
                        <Text style={{ color: colors.primary }}>Статус: {order.status}</Text>
                        {order.estimatedTime && (
                            <Text style={{ color: colors.onSurfaceVariant }}>
                                Ориентировочное время: {order.estimatedTime}
                            </Text>
                        )}
                    </View>
                </View>
                <Text style={[styles.address, { color: colors.onSurfaceVariant }]}>
                    Адрес: {order.address}
                </Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    mode="contained"
                    onPress={() => handleViewDetails(order)}
                    style={styles.button}
                >
                    Подробнее
                </Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    list: {
        paddingBottom: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 16,
        backgroundColor: '#FF9800',
    },
    info: {
        flex: 1,
    },
    address: {
        marginTop: 8,
        fontSize: 14,
    },
    button: {
        marginLeft: 'auto',
    },
});