import { usePathname, useRouter } from 'expo-router';
import {
    Home,
    Inbox,
    Receipt,
    ShoppingCart,
    UserRound,
    type LucideIcon,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';

const ACTIVE_COLOR = '#1e7930';
const INACTIVE_COLOR = '#484848';

type TabName = 'transaction' | 'cart' | 'home' | 'inbox' | 'profile';

const TABS: { name: TabName; label: string; icon: LucideIcon }[] = [
    { name: 'transaction', label: 'Transaction', icon: Receipt },
    { name: 'cart', label: 'Cart', icon: ShoppingCart },
    { name: 'home', label: 'Home', icon: Home },
    { name: 'inbox', label: 'Inbox', icon: Inbox },
    { name: 'profile', label: 'Profile', icon: UserRound },
];

export function BottomTabBar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View
            className="flex-row items-center bg-[#aceba7]"
            style={{
                height: 60,
                paddingTop: 5,
                paddingBottom: 5,
            }}
        >
            {TABS.map((tab) => {
                const isActive = pathname === `/${tab.name}`;
                const color = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;
                const Icon = tab.icon;

                return (
                    <Pressable
                        key={tab.name}
                        onPress={() => router.navigate(`/(main)/${tab.name}`)}
                        className="flex-1 items-center justify-center"
                        android_ripple={null}
                    >
                        <Icon color={color} size={22} />
                        <Text style={{ color }} className="text-[10px] mt-0.5">
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
