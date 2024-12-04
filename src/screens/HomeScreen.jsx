import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput } from 'react-native';
import { Text, Card, Button, useTheme } from 'react-native-paper';
import ProductCard from "@/src/components/ProductCard";

const products = require('../../mock-data/products.json');

export default function HomeScreen ({ navigation }) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const discountedProducts = products.filter(product => product.discount > 0);

  return (
      <ScrollView style={[styles.scrollContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.bannerContainer, { backgroundColor: colors.primary }]}>
          <Text variant="headlineLarge" style={[styles.bannerText, { color: colors.onPrimary }]}>
            Добро пожаловать в StyleExpress!
          </Text>
          <Button mode="contained" onPress={() => alert('Откройте наши предложения!')}>
            Посмотреть акции
          </Button>
        </View>

        <TextInput
            style={[styles.searchInput, { backgroundColor: colors.surface, color: colors.text }]}
            placeholder="Поиск по товарам..."
            placeholderTextColor={colors.outline}
            value={searchQuery}
            onChangeText={setSearchQuery}
        />

        <View style={styles.section}>
          <Text variant="titleLarge" style={[styles.sectionTitle, { color: colors.primary }]}>
            Товары со скидкой
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {discountedProducts.map((product, index) => (
                <Card
                    key={index}
                    style={[styles.horizontalCard, { backgroundColor: colors.surface }]}
                    onPress={() => navigation.navigate('Product', { product })}
                >
                  <Card.Content>
                    <Text style={{ color: colors.text }}>{product.name}</Text>
                    <Text style={{ color: colors.accent }}>
                      скидка {product?.discount}%
                    </Text>
                    <Text style={{ color: colors.accent }}>
                      {(product.price - (product.price * product.discount) / 100).toFixed(2)} ₽
                    </Text>
                  </Card.Content>
                </Card>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={[styles.sectionTitle, { color: colors.primary }]}>
            Все товары
          </Text>
          <View style={styles.productsContainer}>
            {filteredProducts.map((product, index) => (
                <ProductCard key={index} navigation={navigation} product={product} />
            ))}
          </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  bannerContainer: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  bannerText: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    paddingBottom: 10,
  },
  horizontalCard: {
    width: 150,
    marginRight: 10,
    borderRadius: 8,
    elevation: 3,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'space-between',
  },
});