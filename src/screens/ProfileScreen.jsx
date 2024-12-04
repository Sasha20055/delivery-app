import React, {useContext} from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Avatar, Text, Button, Card, Divider, List, useTheme } from 'react-native-paper';
import ViewedProductsContext from "@/src/context/ViewedProductsContext";

export default function ProfileScreen({ navigation }) {
    const { colors } = useTheme();
    const {recentlyViewed} = useContext(ViewedProductsContext);

    const handleEditProfile = () => {
        alert("Редактирование профиля");
    };

    const handleLogout = () => {
        alert("Выход из аккаунта");
    };

    const goToCart = () => {
        navigation.navigate('Cart');
    };

    const goToOrders = () => {
        navigation.navigate('Delivery');
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>

            <Card style={[styles.profileCard, { backgroundColor: colors.surface }]}>
                <Card.Content style={styles.cardContent}>
                    <Avatar.Text size={80} label="ИВ" style={styles.avatar} />
                    <Text variant="headlineLarge" style={[styles.name, { color: colors.text }]}>
                        Иван Васильев
                    </Text>
                    <Text variant="bodyMedium" style={[styles.email, { color: colors.text }]}>
                        ivan.vasilev@example.com
                    </Text>
                </Card.Content>
            </Card>
            <Button mode="contained" style={styles.button} onPress={handleEditProfile}>
                Редактировать профиль
            </Button>
            <Button mode="outlined" style={styles.logoutButton} onPress={handleLogout}>
                Выйти
            </Button>

            <View style={styles.navContainer}>
                <Button mode="contained" onPress={goToCart} style={styles.navButton}>
                    Корзина
                </Button>
                <Button mode="contained" onPress={goToOrders} style={styles.navButton}>
                    Заказы
                </Button>
            </View>

            <Divider style={styles.divider} />

            <Text variant="headlineMedium" style={[styles.sectionTitle, { color: colors.text }]}>
                Недавно просмотренные товары
            </Text>
            <List.Section>
                {recentlyViewed.map((product, index) => (
                    <List.Item key={index} title={product.name} description={product.description} left={() => <List.Icon icon="eye" />} />
                ))}
            </List.Section>

            <Divider style={styles.divider} />

            <Text variant="headlineMedium" style={[styles.sectionTitle, { color: colors.text }]}>
                Специальные предложения
            </Text>
            <List.Section>
                <List.Item title="Скидка на Товар 1" left={() => <List.Icon icon="tag" />} />
                <List.Item title="Подарок при покупке Товара 2" left={() => <List.Icon icon="gift" />} />
            </List.Section>

            <Divider style={styles.divider} />

            <Text variant="headlineMedium" style={[styles.sectionTitle, { color: colors.text }]}>
                Отзывы о товарах
            </Text>
            <List.Section>
                <List.Item title="Товар 1" description="Отличный продукт!" left={() => <List.Icon icon="star" />} />
                <List.Item title="Товар 2" description="Не подошел размер, но качество хорошее." left={() => <List.Icon icon="star-outline" />} />
            </List.Section>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    profileCard: {
        width: '100%',
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        elevation: 4,
    },
    cardContent: {
        alignItems: 'center',
    },
    avatar: {
        marginBottom: 16,
    },
    name: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    email: {
        color: '#555',
    },
    button: {
        width: '100%',
        marginBottom: 16,
    },
    logoutButton: {
        width: '100%',
        marginBottom: 16,
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    navButton: {
        flex: 1,
        marginHorizontal: 4,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginVertical: 8,
    },
    divider: {
        marginVertical: 16,
    },
});