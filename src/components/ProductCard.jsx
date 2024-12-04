import React, {useContext} from 'react';
import { Button, Card, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import ViewedProductsContext from "@/src/context/ViewedProductsContext";

export default function ProductCard({ navigation, product }) {
    const { addViewedProduct } = useContext(ViewedProductsContext);
    const { name, description } = product;
    const { colors } = useTheme();

    return (
        <Card style={[styles.card, { backgroundColor: colors.surface }]}>
            <Card.Title
                title={name}
                subtitle={description}
                titleStyle={{ color: colors.text }}
                subtitleStyle={{ color: colors.text }}
            />

            <Card.Actions>
                <Button
                    onPress={() => {
                        addViewedProduct(product)
                        navigation.navigate('Product', {product})
                    }}
                >
                    Подробнее
                </Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        elevation: 4,
        borderRadius: 8,
    },
});