import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import CartContext from "@/src/context/CartContext";

export default function ProductDetailsScreen({ route, navigation }) {
    const { product } = route.params;
    const { addToCart } = useContext(CartContext);
    const { colors } = useTheme();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (quantity <= 0) {
            alert("Количество должно быть больше 0!");
            return;
        }
        addToCart({ ...product, quantity });
        alert(`${product.name} (${quantity} шт.) добавлен в корзину!`);
    };

    const calculateDiscountedPrice = () => {
        return product.price - (product.price * (product.discount / 100));
    };

    const reviews = [
        { id: '1', user: 'Иван', rating: 4, comment: 'Отличный товар, быстрая доставка!' },
        { id: '2', user: 'Мария', rating: 5, comment: 'Очень довольна покупкой!' },
        { id: '3', user: 'Сергей', rating: 3, comment: 'Качество хорошее, но упаковка была повреждена.' },
    ];

    const renderStarRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesome
                    key={i}
                    name={i <= rating ? 'star' : 'star-o'}
                    size={20}
                    color={colors.accent}
                />
            );
        }
        return <View style={styles.starContainer}>{stars}</View>;
    };

    const renderItem = ({ item }) => {
        if (item.type === 'product') {
            return (
                <Card style={styles.card}>
                    <Card.Content>
                        <Image source={{ uri: product.image }} style={styles.image} />
                        <Text variant="headlineMedium" style={styles.title}>
                            {product.name}
                        </Text>
                        {renderStarRating(product.rating)}
                        <Text variant="bodyMedium" style={styles.description}>
                            {product.description}
                        </Text>
                        {product.discount ? (
                            <View style={styles.priceContainer}>
                                <Text style={[styles.oldPrice, { color: colors.text }]}>
                                    {product.price.toFixed(2)} ₽
                                </Text>
                                <Text style={[styles.discountPrice, { color: colors.accent }]}>
                                    {calculateDiscountedPrice().toFixed(2)} ₽
                                </Text>
                            </View>
                        ) : (
                            <Text variant="titleLarge" style={[styles.price, { color: colors.accent }]}>
                                {product.price.toFixed(2)} ₽
                            </Text>
                        )}
                        <Text variant="bodySmall" style={styles.availability}>
                            {product.inStock ? 'В наличии' : 'Нет в наличии'}
                        </Text>
                        <TextInput
                            style={[styles.quantityInput, { color: colors.text }]}
                            keyboardType="numeric"
                            value={quantity.toString()}
                            onChangeText={(text) => setQuantity(Number(text) || 0)}
                            placeholder="Количество"
                        />
                    </Card.Content>
                    <Card.Actions>
                        <Button mode="contained" onPress={handleAddToCart} disabled={!product.inStock}>
                            Добавить в корзину
                        </Button>
                        <Button mode="text" onPress={() => navigation.goBack()} style={styles.backButton}>
                            Вернуться
                        </Button>
                    </Card.Actions>
                </Card>
            );
        }

        if (item.type === 'review') {
            return (
                <View style={styles.reviewItem}>
                    <Text style={styles.reviewUser}>{item.user}</Text>
                    {renderStarRating(item.rating)}
                    <Text style={styles.reviewComment}>{item.comment}</Text>
                </View>
            );
        }
    };

    const combinedData = [
        { type: 'product' },
        ...reviews.map((review) => ({ ...review, type: 'review' })),
    ];

    return (
        <FlatList
            data={combinedData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={[styles.container, { backgroundColor: colors.background }]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        width: '100%',
        elevation: 4,
        borderRadius: 8,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        marginBottom: 16,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        marginRight: 8,
        fontSize: 16,
    },
    discountPrice: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    availability: {
        marginBottom: 16,
        color: 'green',
        fontWeight: 'bold',
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        textAlign: 'center',
    },
    backButton: {
        marginLeft: 8,
    },
    reviewItem: {
        marginBottom: 16,
    },
    reviewUser: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    reviewComment: {
        marginBottom: 4,
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
});