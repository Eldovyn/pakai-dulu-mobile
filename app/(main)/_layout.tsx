
import { Tabs } from 'expo-router';
import { Home, ShoppingCart, Receipt, Inbox, UserRound } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#1e7930',
                tabBarInactiveTintColor: '#484848',

                tabBarStyle: {
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom + 5,
                    paddingTop: 5,
                    backgroundColor: '#aceba7',
                },
            }}
        >
            <Tabs.Screen
                name="transaction/index"
                options={{
                    title: 'Transaction',
                    tabBarIcon: ({ color, size }) => (
                        <Receipt color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="cart/index"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, size }) => (
                        <ShoppingCart color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="home/index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Home color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="inbox/index"
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color, size }) => (
                        <Inbox color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile/index"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <UserRound color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
