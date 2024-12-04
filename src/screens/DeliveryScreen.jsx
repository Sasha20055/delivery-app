import React, {useContext} from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import OrderContext from "@/src/context/OrderContext";
import OrderCard from "@/src/components/OrderCard";

export default function DeliveryScreen({navigation}) {


    const {orders} = useContext(OrderContext);
    const { colors } = useTheme();

    const handleViewDetails = (order) => {
        navigation.navigate('OrderDetails', { order });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <OrderCard handleViewDetails={handleViewDetails} order={item} />
                )}                contentContainerStyle={styles.list}
            />
        </View>
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