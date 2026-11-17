
import { Tabs, usePathname } from 'expo-router';
import {
    Home,
    ShoppingCart,
    Receipt,
    Inbox,
    UserRound,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    const pathname = usePathname();

    let hideTabBar = false;

    if (pathname.startsWith('/home/') && pathname !== '/home') {
        hideTabBar = true;
    } else {
        hideTabBar = false;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#1e7930',
                tabBarInactiveTintColor: '#484848',

                tabBarButton: (props) => {
                    const { ref, ...rest } = props;

                    return (
                        <Pressable
                            {...rest}
                            ref={ref as React.Ref<View>}
                            android_ripple={null}
                        />
                    );
                },

                tabBarStyle: {
                    display: hideTabBar ? 'none' : 'flex',
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom + 5,
                    paddingTop: 5,
                    backgroundColor: '#aceba7',
                },
            }}
        >
            <Tabs.Screen
                name="transaction"
                options={{
                    title: 'Transaction',
                    tabBarIcon: ({ color, size }) => (
                        <Receipt color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, size }) => (
                        <ShoppingCart color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Home color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="inbox"
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color, size }) => (
                        <Inbox color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <UserRound color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="home/[id_product]"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="home/[id_product]/sewa"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="home/[id_product]/pembayaran/[id_tx]"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="home/[id_product]/pembayaran/[id_tx]/transaction/[payment_type]"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="profile/edit"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="profile/pengaturan-alamat"
                options={{ href: null }}
            />
        </Tabs>
    );
}
