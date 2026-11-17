import * as React from 'react';
import { View, ScrollView, Pressable, StatusBar, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Search, CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

type InboxMobileProps = {
    embedded?: boolean;
};

export default function InboxMobile({ embedded }: InboxMobileProps) {
    const insets = useSafeAreaInsets();

    const [activeTab, setActiveTab] = React.useState('Semua');
    const tabs = ['Semua', 'Pemilik Barang', 'Penyewa', 'Bantuan'];

    const messages = [
        {
            id: 1,
            name: 'Fitriany Wirayuda',
            initials: 'FI',
            avatarBg: '#16783A', // Hijau Tua
            product: 'Kamera DSLR Canon EOS 2000D',
            message: 'Barangnya ready dan baterai sudah ter...',
            time: '10:03',
            unread: 1,
            isOnline: true,
            isVerified: false,
        },
        {
            id: 2,
            name: 'Budi Pratama',
            initials: 'BU',
            avatarBg: '#16783A',
            product: 'Proyektor Epson EB-E500',
            message: 'Halo kak, proyektornya bisa saya ambil...',
            time: '09:42',
            unread: 2,
            isOnline: true,
            isVerified: false,
        },
        {
            id: 3,
            name: 'Dimas Outdoor Camp',
            initials: 'DI',
            avatarBg: '#16783A',
            product: 'Tenda Camping Kapasitas 4 Orang',
            message: 'Tenda dome kapasitas 4 orang sudah siap ...',
            time: 'Kemarin',
            unread: 0,
            isOnline: false,
            isVerified: false,
        },
        {
            id: 4,
            name: 'Siti Nurhaliza',
            initials: 'SI',
            avatarBg: '#16783A',
            product: 'Stroller Bayi Lipat Compact',
            message: 'Stroller sudah disterilkan dan dicuci bersih ...',
            time: '28 Apr',
            unread: 0,
            isOnline: false,
            isVerified: false,
        },
        {
            id: 5,
            name: 'Layanan Bantuan PakaiDulu',
            initials: 'PA',
            avatarBg: '#F97316', // Oranye
            product: 'Pusat Bantuan & Konfirmasi',
            message: 'Deposit sewa BBQ Grill Anda sebesar Rp 30...',
            time: '26 Apr',
            unread: 0,
            isOnline: true,
            isVerified: true, // Centang Oranye
        },
    ];

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF8EE" translucent={false} />

            {/* === HEADER === */}
            <Stack.Screen
                options={{
                    headerShown: !embedded,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerStyle: { backgroundColor: '#FFF8EE' },
                    headerTitle: () => (
                        <View>
                            <Text className="text-lg font-bold text-gray-900">Kotak Masuk</Text>
                            <Text className="text-xs text-gray-500 font-normal mt-0.5">
                                Percakapan seputar sewa & konfirmasi barang
                            </Text>
                        </View>
                    ),
                    headerTitleAlign: 'left',
                }}
            />

            <View className="flex-1 bg-[#FFF8EE]">
                {/* === SEARCH BAR === */}
                <View className="px-4 pt-2 pb-3">
                    <View className="flex-row items-center bg-white border border-gray-200 rounded-full px-4 h-11">
                        <Search size={18} color="#9CA3AF" />
                        <TextInput
                            placeholder="Cari pesan atau nama orang..."
                            placeholderTextColor="#9CA3AF"
                            className="flex-1 ml-2 text-sm text-gray-900"
                            style={{ outlineStyle: 'none' } as any}
                        />
                    </View>
                </View>

                {/* === TABS (CHIPS) === */}
                <View className="mb-3">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
                    >
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <Pressable
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-full border ${isActive
                                        ? 'bg-[#16783A] border-[#16783A]'
                                        : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <Text className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-600'
                                        }`}>
                                        {tab}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* === DAFTAR PESAN === */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 20 }}
                >
                    {messages.map((msg) => (
                        <Pressable
                            key={msg.id}
                            className="bg-white rounded-2xl p-4 mb-3 border border-gray-100 flex-row items-center active:bg-gray-50"
                            onPress={() => console.log('Buka chat:', msg.name)}
                        >
                            {/* Avatar Section */}
                            <View className="relative mr-3">
                                <View
                                    className="w-12 h-12 rounded-full items-center justify-center"
                                    style={{ backgroundColor: msg.avatarBg }}
                                >
                                    {msg.isVerified ? (
                                        // Jika layanan bantuan, pakai icon custom (simulasi logo)
                                        <Text className="text-white font-bold text-lg">PA</Text>
                                    ) : (
                                        <Text className="text-white font-bold text-sm">{msg.initials}</Text>
                                    )}
                                </View>
                                {/* Indikator Online */}
                                {msg.isOnline && (
                                    <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#22C55E] rounded-full border-2 border-white" />
                                )}
                            </View>

                            {/* Konten Chat */}
                            <View className="flex-1 mr-2">
                                {/* Baris Nama & Waktu */}
                                <View className="flex-row items-center justify-between mb-1">
                                    <View className="flex-row items-center flex-1 mr-2">
                                        <Text className="text-sm font-bold text-gray-900 mr-1" numberOfLines={1}>
                                            {msg.name}
                                        </Text>
                                        {msg.isVerified && (
                                            <CheckCircle2 size={14} color="#F97316" fill="#F97316" />
                                        )}
                                    </View>
                                    <Text className={`text-[11px] ${msg.unread > 0 ? 'text-[#16783A] font-bold' : 'text-gray-400'}`}>
                                        {msg.time}
                                    </Text>
                                </View>

                                {/* Badge Produk */}
                                <View className="bg-[#F3F4F6] self-start px-2 py-0.5 rounded-md mb-1.5">
                                    <Text className="text-[10px] font-medium text-gray-600" numberOfLines={1}>
                                        {msg.product}
                                    </Text>
                                </View>

                                {/* Pesan Terakhir & Unread Badge */}
                                <View className="flex-row items-center justify-between">
                                    <Text
                                        className={`text-xs flex-1 mr-3 ${msg.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}
                                        numberOfLines={1}
                                    >
                                        {msg.message}
                                    </Text>
                                    {msg.unread > 0 && (
                                        <View className="bg-[#16783A] min-w-[20px] h-5 rounded-full items-center justify-center px-1.5">
                                            <Text className="text-white text-[10px] font-bold">
                                                {msg.unread}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}