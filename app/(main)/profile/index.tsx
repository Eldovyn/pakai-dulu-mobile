import * as React from 'react';
import { View, ScrollView, Pressable, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import {
    User,
    CheckCircle2,
    Pencil,
    ShieldCheck,
    MapPin,
    Wallet,
    Bell,
    HelpCircle,
    ChevronRight
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

export default function ProfilSayaPage() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Data Mockup untuk Menu List dengan Action masing-masing
    const menuItems = [
        {
            icon: <Pencil size={20} color="#16783A" />,
            title: 'Edit Profil',
            subtitle: 'Ubah nama, no hp, dan foto profil',
            // Navigasi ke halaman Edit Profil
            onPress: () => router.push('/(main)/profile/edit'),
        },
        {
            icon: <ShieldCheck size={20} color="#16783A" />,
            title: 'Status Verifikasi Identitas',
            subtitle: 'KTP & Wajah telah terverifikasi',
            badge: 'Lengkap',
            // Contoh action alert atau navigasi ke halaman verifikasi
            onPress: () => Alert.alert('Info', 'Halaman Verifikasi Identitas'),
        },
        {
            icon: <MapPin size={20} color="#16783A" />,
            title: 'Pengaturan Alamat',
            subtitle: 'Depok, Jawa Barat',
            // Navigasi ke halaman Alamat
            onPress: () => router.push('/(main)/profile/pengaturan-alamat'),
        },
        {
            icon: <Wallet size={20} color="#16783A" />,
            title: 'Rekening & Saldo Deposit',
            subtitle: 'Saldo Tersedia: Rp. 500.000',
            // Navigasi ke halaman Rekening
            onPress: () => router.push('/(main)/profile'),
        },
        {
            icon: <Bell size={20} color="#16783A" />,
            title: 'Pengaturan Notifikasi',
            // Contoh action alert
            onPress: () => Alert.alert('Info', 'Halaman Pengaturan Notifikasi'),
        },
        {
            icon: <HelpCircle size={20} color="#16783A" />,
            title: 'Pusat Bantuan & FAQ',
            // Contoh action alert
            onPress: () => Alert.alert('Info', 'Halaman Pusat Bantuan'),
        },
    ];

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF8EE" translucent={false} />

            {/* === HEADER === */}
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitle: 'Profil Saya',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#FFF8EE' },
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 16, color: '#111827' },
                }}
            />

            <View className="flex-1 bg-[#FFF8EE]">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 20 }}
                >
                    {/* === KARTU PROFIL === */}
                    <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100">
                        {/* Info Utama */}
                        <View className="flex-row items-center mb-5">
                            {/* Avatar */}
                            <View className="w-20 h-20 rounded-full border-[3px] border-[#16783A] items-center justify-center relative bg-gray-50">
                                <User size={40} color="#9CA3AF" fill="#E5E7EB" />
                                {/* Badge Centang Hijau */}
                                <View className="absolute bottom-0 right-0 bg-[#16783A] rounded-full border-2 border-white p-0.5">
                                    <CheckCircle2 size={16} color="white" fill="#16783A" />
                                </View>
                            </View>

                            {/* Teks Nama & Email */}
                            <View className="ml-4 flex-1">
                                <Text className="text-lg font-bold text-gray-900 mb-0.5">
                                    Ahmad Syafi'i
                                </Text>
                                <Text className="text-xs text-gray-500 mb-2">
                                    ahmadsyafii@email.com
                                </Text>
                                {/* Badge KTP */}
                                <View className="flex-row items-center bg-[#E8F5E9] self-start px-2.5 py-1 rounded-full">
                                    <ShieldCheck size={12} color="#16783A" />
                                    <Text className="text-[10px] font-bold text-[#16783A] ml-1">
                                        Akun Terverifikasi (KTP)
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Statistik */}
                        <View className="flex-row items-center justify-between pt-4 border-t border-gray-100">
                            <View className="flex-1 items-center">
                                <Text className="text-lg font-bold text-[#16783A] mb-0.5">2</Text>
                                <Text className="text-[11px] text-gray-500">Barang Disewa</Text>
                            </View>
                            <View className="w-[1px] h-8 bg-gray-200" />
                            <View className="flex-1 items-center">
                                <Text className="text-lg font-bold text-[#16783A] mb-0.5">1</Text>
                                <Text className="text-[11px] text-gray-500">Disewakan</Text>
                            </View>
                            <View className="w-[1px] h-8 bg-gray-200" />
                            <View className="flex-1 items-center">
                                <Text className="text-lg font-bold text-[#16783A] mb-0.5">250</Text>
                                <Text className="text-[11px] text-gray-500">Poin Reward</Text>
                            </View>
                        </View>
                    </View>

                    {/* === MENU LIST === */}
                    <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        {menuItems.map((item, index) => (
                            <Pressable
                                key={index}
                                className={`flex-row items-center p-4 active:bg-gray-50 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                                    }`}
                                // Memanggil fungsi onPress dari masing-masing data item
                                onPress={item.onPress}
                            >
                                {/* Ikon */}
                                <View className="w-10 h-10 rounded-xl bg-[#F0FDF4] items-center justify-center mr-4">
                                    {item.icon}
                                </View>

                                {/* Teks Konten */}
                                <View className="flex-1 mr-2">
                                    <Text className="text-sm font-bold text-gray-900 mb-0.5">
                                        {item.title}
                                    </Text>
                                    {item.subtitle && (
                                        <Text className="text-xs text-gray-500">
                                            {item.subtitle}
                                        </Text>
                                    )}
                                </View>

                                {/* Badge (Opsional) & Chevron */}
                                <View className="flex-row items-center">
                                    {item.badge && (
                                        <View className="bg-[#E8F5E9] px-2 py-1 rounded-md mr-2">
                                            <Text className="text-[10px] font-bold text-[#16783A]">
                                                {item.badge}
                                            </Text>
                                        </View>
                                    )}
                                    <ChevronRight size={18} color="#9CA3AF" />
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}