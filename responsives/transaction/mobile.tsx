import * as React from 'react';
import { View, ScrollView, Pressable, StatusBar, Modal, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { ChevronLeft, Search, SlidersHorizontal, MessageCircle, MoreVertical } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { TransactionActionSheet } from '@/components/transactions/ActionSheet';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TransactionStatus = 'active' | 'verifying' | 'cancelled';

type Transaction = {
    id: string;
    productName: string;
    image: string;
    date: string;
    status: TransactionStatus;
};

const TRANSACTIONS: Transaction[] = [
    { id: '1', productName: 'Kamera DSLR Canon', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200', date: '11 Mei 2026', status: 'active' },
    { id: '2', productName: 'BBQ Grill', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200', date: '26 April 2026', status: 'active' },
    { id: '3', productName: 'Tenda Camping 4P', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200', date: '2 Mei 2026', status: 'active' },
    { id: '4', productName: 'Sepeda Gunung Polygon', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200', date: '18 Maret 2026', status: 'active' },
    { id: '5', productName: 'Vacuum Cleaner Dyson', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=200', date: '12 April 2026', status: 'active' },
    { id: '6', productName: 'Proyektor Epson', image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=200', date: '29 April', status: 'verifying' },
    { id: '7', productName: 'Drone DJI Mini 3', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200', date: '5 Mei 2026', status: 'verifying' },
    { id: '8', productName: 'Gitar Akustik Yamaha', image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200', date: '20 Maret 2026', status: 'verifying' },
    { id: '9', productName: 'Kipas Angin Portable', image: 'https://images.unsplash.com/photo-1591287833788-3e6913f52ff8?w=200', date: '15 November 2025', status: 'verifying' },
    { id: '10', productName: 'Setrika Uap Philips', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=200', date: '22 Januari 2026', status: 'verifying' },
    { id: '11', productName: 'Speaker JBL', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200', date: '14 Februari 2026', status: 'cancelled' },
    { id: '12', productName: 'Halloween Dress', image: 'https://images.unsplash.com/photo-1509551453743-259b7023c7b6?w=200', date: '33 Oktober 2025', status: 'cancelled' },
    { id: '13', productName: 'PS5 + 2 Stik', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200', date: '1 Januari 2026', status: 'cancelled' },
    { id: '14', productName: 'Treadmill Elektrik', image: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=200', date: '3 Desember 2025', status: 'cancelled' },
    { id: '15', productName: 'Kursi Lipat Camping', image: 'https://images.unsplash.com/photo-1580828369020-4ddef4de4c00?w=200', date: '10 Februari 2026', status: 'cancelled' },
];

type TransactionMobileProps = {
    search?: string;
    onSearchChange?: (value: string) => void;
    topOffset?: number;
    /**
     * Saat true, komponen ditanam di dalam frame tablet-desktop: header
     * native disembunyikan dan menu aksi diserahkan ke parent (lihat
     * `onActionSheetOpen`) agar overlay bisa menutupi seluruh frame.
     */
    embedded?: boolean;
    /** Dipanggil saat user menekan titik tiga ketika `embedded` (parent yang merender menu). */
    onActionSheetOpen?: () => void;
};

export default function TransactionMobile({
    search: searchProp,
    onSearchChange,
    topOffset,
    embedded,
    onActionSheetOpen,
}: TransactionMobileProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [searchState, setSearchState] = React.useState('');
    const search = searchProp ?? searchState;
    const setSearch = onSearchChange ?? setSearchState;

    const [activeTab, setActiveTab] = React.useState('semua');

    const [selectedTx, setSelectedTx] = React.useState<Transaction | null>(null);

    const TABS = [
        { id: 'semua', label: 'Semua' },
        { id: 'aktif', label: 'Aktif' },
        {
            id: 'menunggu',
            label: 'Menunggu',
            count: TRANSACTIONS.filter((t) => t.status === 'verifying').length,
        },
        { id: 'dibatalkan', label: 'Dibatalkan' },
    ];

    const filteredTransactions = TRANSACTIONS.filter((tx) => {
        const matchTab =
            activeTab === 'semua' ||
            (activeTab === 'aktif' && tx.status === 'active') ||
            (activeTab === 'menunggu' && tx.status === 'verifying') ||
            (activeTab === 'dibatalkan' && tx.status === 'cancelled');

        const matchSearch = tx.productName
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchTab && matchSearch;
    });

    const getStatusConfig = (status: TransactionStatus) => {
        switch (status) {
            case 'active':
                return { label: 'Status Aktif', bg: 'bg-[#86EFAC]', text: 'text-[#166534]', border: 'border-[#4ADE80]' };
            case 'verifying':
                return { label: 'Menunggu Verifikasi', bg: 'bg-[#FDBA74]', text: 'text-[#9A3412]', border: 'border-[#F97316]' };
            case 'cancelled':
                return { label: 'Status Dibatalkan', bg: 'bg-[#FCA5A5]', text: 'text-[#991B1B]', border: 'border-[#EF4444]' };
        }
    };

    const handleAction = (action: 'dokumentasi' | 'lapor') => {
        if (!selectedTx) return;

        setSelectedTx(null);

        if (action === 'dokumentasi') {
            router.push(`/dokumentasi-barang`);
        } else if (action === 'lapor') {
            router.push(`/lapor-barang`);
        }
    };

    const { width: screenWidth } = useWindowDimensions();
    const searchBarWidth = screenWidth * 0.7;

    const contentTopOffset = topOffset ?? insets.top + 56 + 8;

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff7eb" translucent={false} />

            <Stack.Screen
                options={{
                    headerShown: !embedded,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitleAlign: 'center',
                    headerTransparent: true,
                    headerStyle: { backgroundColor: '#fff7eb' },
                    headerTitle: () => (
                        <View
                            style={{
                                width: searchBarWidth,
                                height: 40,
                                alignSelf: 'center',
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: 999,
                                borderWidth: 1,
                                borderColor: '#E5E7EB',
                                backgroundColor: 'white',
                                paddingHorizontal: 12,
                                transform: [{ translateX: 38 }],
                            }}
                        >
                            <Search size={18} color="#9CA3AF" />
                            <Input
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Cari transaksi kamu.."
                                placeholderTextColor="#9CA3AF"
                                style={{
                                    flex: 1,
                                    height: 38,
                                    borderWidth: 0,
                                    backgroundColor: 'transparent',
                                    paddingHorizontal: 8,
                                    fontSize: 13,
                                }}
                            />
                            <Pressable
                                className="h-7 w-7 items-center justify-center rounded-md bg-gray-100"
                                style={{ flexShrink: 0 }}
                            >
                                <SlidersHorizontal size={15} color="#374151" />
                            </Pressable>
                        </View>
                    ),
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.back()}
                            className="h-9 w-9 items-center justify-center"
                            hitSlop={10}
                        >
                            <ChevronLeft size={26} color="#16783A" strokeWidth={2.5} />
                        </Pressable>
                    ),
                }}
            />

            <View className="flex-1 bg-[#fff7eb]">
                <View style={{ paddingTop: contentTopOffset }}>

                    <View className="flex-row items-center justify-between px-5 pt-2 mb-3">
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <Pressable
                                    key={tab.id}
                                    onPress={() => setActiveTab(tab.id)}
                                    className="relative items-center pb-2"
                                >
                                    <Text
                                        className={`text-sm ${isActive
                                            ? 'font-bold text-gray-900'
                                            : 'font-medium text-gray-500'
                                            }`}
                                    >
                                        {tab.label}
                                    </Text>

                                    {tab.count ? (
                                        <View className="absolute -top-1 -right-3 h-4 w-4 items-center justify-center rounded-full bg-red-500">
                                            <Text className="text-[9px] font-bold text-white">
                                                {tab.count}
                                            </Text>
                                        </View>
                                    ) : null}

                                    {isActive && (
                                        <View className="absolute bottom-0 w-full h-[3px] bg-[#16783A] rounded-t-sm" />
                                    )}
                                </Pressable>
                            );
                        })}
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 24 }}
                    >
                        <View className="px-4 gap-3 pb-8">
                            {filteredTransactions.length === 0 ? (
                                <View className="items-center py-16">
                                    <Text className="text-sm text-gray-500">
                                        Belum ada transaksi di tab ini.
                                    </Text>
                                </View>
                            ) : (
                                filteredTransactions.map((tx) => {
                                    const statusConfig = getStatusConfig(tx.status);
                                    return (
                                        <Card
                                            key={tx.id}
                                            className="rounded-2xl border-gray-100 bg-white p-4 flex-col gap-3"
                                        >
                                            <View className="flex-row items-start justify-between gap-3">
                                                <Image
                                                    source={{ uri: tx.image }}
                                                    style={{ width: 80, height: 80 }}
                                                    className="rounded-xl border border-gray-200"
                                                    resizeMode="cover"
                                                />
                                                <View className="flex-1 justify-center h-[80px]">
                                                    <Text
                                                        className="text-base font-bold text-gray-900"
                                                        numberOfLines={1}
                                                    >
                                                        {tx.productName}
                                                    </Text>
                                                    <Text className="text-sm text-gray-500 mt-1">
                                                        {tx.date}
                                                    </Text>
                                                </View>

                                                <Pressable
                                                    className="p-1 -mt-1 -mr-1"
                                                    onPress={() => {
                                                        if (embedded) {
                                                            onActionSheetOpen?.();
                                                        } else {
                                                            setSelectedTx(tx);
                                                        }
                                                    }}
                                                >
                                                    <MoreVertical size={20} color="#9CA3AF" />
                                                </Pressable>
                                            </View>

                                            <View className="flex-row items-center justify-between mt-1 pt-3 border-t border-gray-100">
                                                <Pressable onPress={() => {
                                                    router.replace(
                                                        `/chat/${tx.id}`
                                                    );
                                                }} className="flex-row items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1.5">
                                                    <MessageCircle size={16} color="#4B5563" />
                                                    <Text className="text-xs font-medium text-gray-600">
                                                        Chat
                                                    </Text>
                                                </Pressable>

                                                <View className="flex-row gap-2">
                                                    <View
                                                        className={`rounded-full border px-3 py-1.5 ${statusConfig.bg} ${statusConfig.border}`}
                                                    >
                                                        <Text
                                                            className={`text-xs font-bold ${statusConfig.text}`}
                                                        >
                                                            {statusConfig.label}
                                                        </Text>
                                                    </View>

                                                    <Pressable className="rounded-full border border-[#86EFAC] bg-white px-4 py-1.5">
                                                        <Text className="text-xs font-bold text-[#16783A]">
                                                            Detail
                                                        </Text>
                                                    </Pressable>
                                                </View>
                                            </View>
                                        </Card>
                                    );
                                })
                            )}
                        </View>
                    </ScrollView>
                </View>
            </View>

            {/* Pure mobile: tetap pakai Modal native (full-screen) */}
            {!embedded && (
                <Modal
                    visible={!!selectedTx}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setSelectedTx(null)}
                >
                    <TouchableWithoutFeedback onPress={() => setSelectedTx(null)}>
                        <View className="flex-1 bg-black/40 justify-end">
                            <TouchableWithoutFeedback>
                                <View>
                                    <TransactionActionSheet
                                        onClose={() => setSelectedTx(null)}
                                        onDokumentasi={() => handleAction('dokumentasi')}
                                        onLapor={() => handleAction('lapor')}
                                        bottomInset={insets.bottom}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </>
    );
}
