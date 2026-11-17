import * as React from 'react';
import { View, ScrollView, Pressable, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import {
    Check,
    Store,
    Trash2,
    Minus,
    Plus,
    Square
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function KeranjangSewaPage() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // State Mockup (bisa disesuaikan dengan data asli)
    const [isAllSelected, setIsAllSelected] = React.useState(false);
    const [items, setItems] = React.useState([
        {
            id: 1,
            name: 'Tenda Camping Dome 4P',
            store: 'Dimas Outdoor Camp',
            pricePerDay: 50000,
            deposit: 100000,
            duration: 2,
            image: 'https://via.placeholder.com/150', // Ganti dengan require('...') asli
            selected: true,
        },
        {
            id: 2,
            name: 'Kompor Portable Camping',
            store: 'Dimas Outdoor Camp',
            pricePerDay: 20000,
            deposit: 50000,
            duration: 2,
            image: 'https://via.placeholder.com/150',
            selected: true,
        }
    ]);

    // Perhitungan Total (Hanya menghitung item yang selected = true)
    const selectedItems = items.filter(item => item.selected);
    const totalItems = selectedItems.length;

    const totalSewa = selectedItems.reduce((acc, item) => acc + (item.pricePerDay * item.duration), 0);
    const totalDeposit = selectedItems.reduce((acc, item) => acc + item.deposit, 0);
    const grandTotal = totalSewa + totalDeposit;

    // Handler Durasi
    const updateDuration = (id: number, type: 'add' | 'min') => {
        setItems(items.map(item => {
            if (item.id === id) {
                const newDuration = type === 'add' ? item.duration + 1 : Math.max(1, item.duration - 1);
                return { ...item, duration: newDuration };
            }
            return item;
        }));
    };

    // Handler Checkbox
    const toggleItem = (id: number) => {
        setItems(items.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
    };

    const toggleAll = () => {
        const newValue = !isAllSelected;
        setIsAllSelected(newValue);
        setItems(items.map(item => ({ ...item, selected: newValue })));
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF8EE" translucent={false} />

            {/* === HEADER === */}
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerStyle: { backgroundColor: '#FFF8EE' },
                    headerTitle: () => (
                        <View>
                            <Text className="text-lg font-bold text-gray-900">Keranjang Sewa</Text>
                            <Text className="text-xs text-gray-500 font-normal mt-0.5">
                                Rencana paket & gabungan barang sewa
                            </Text>
                        </View>
                    ),
                    headerTitleAlign: 'left',
                    headerRight: () => (
                        <Pressable hitSlop={10} onPress={() => console.log('Hapus Semua')}>
                            <Text className="text-sm font-bold text-red-500">Hapus Semua</Text>
                        </Pressable>
                    ),
                }}
            />

            <View className="flex-1 bg-[#FFF8EE]">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                >
                    {/* === PILIH SEMUA === */}
                    <View className="bg-white rounded-2xl p-4 flex-row items-center mb-4 shadow-sm border border-gray-100">
                        <Pressable
                            onPress={toggleAll}
                            className="flex-row items-center flex-1"
                        >
                            <View className={`w-6 h-6 rounded border-2 items-center justify-center mr-3 ${isAllSelected ? 'bg-[#16783A] border-[#16783A]' : 'bg-white border-gray-300'
                                }`}>
                                {isAllSelected && <Check size={16} color="white" strokeWidth={3} />}
                            </View>
                            <Text className="text-sm font-bold text-gray-900">
                                Pilih Semua ({items.length} Barang)
                            </Text>
                        </Pressable>
                    </View>

                    {/* === DAFTAR BARANG === */}
                    {items.map((item) => (
                        <View
                            key={item.id}
                            className={`bg-white rounded-2xl p-4 mb-4 border ${item.selected ? 'border-[#16783A]' : 'border-gray-200'
                                }`}
                        >
                            {/* Header Toko */}
                            <View className="flex-row items-center justify-between mb-3 border-b border-gray-100 pb-3">
                                <View className="flex-row items-center">
                                    <Pressable
                                        onPress={() => toggleItem(item.id)}
                                        className={`w-5 h-5 rounded items-center justify-center mr-2 ${item.selected ? 'bg-[#16783A]' : 'bg-white border border-gray-300'
                                            }`}
                                    >
                                        {item.selected && <Check size={14} color="white" strokeWidth={3} />}
                                    </Pressable>
                                    <Store size={14} color="#16783A" />
                                    <Text className="text-xs font-bold text-gray-900 ml-1.5">
                                        {item.store}
                                    </Text>
                                </View>
                                <Pressable hitSlop={10} onPress={() => console.log('Hapus', item.id)}>
                                    <Trash2 size={18} color="#9CA3AF" />
                                </Pressable>
                            </View>

                            {/* Info Barang */}
                            <View className="flex-row mb-3">
                                {/* Gambar Placeholder */}
                                <View className="w-20 h-20 bg-gray-200 rounded-xl mr-3 overflow-hidden">
                                    {/* Jika pakai gambar asli, gunakan <Image source={{ uri: item.image }} ... /> */}
                                    <View className="w-full h-full bg-green-100 items-center justify-center">
                                        <Text className="text-[10px] text-green-700">Foto</Text>
                                    </View>
                                </View>

                                <View className="flex-1">
                                    <Text className="text-sm font-bold text-gray-900 mb-1">
                                        {item.name}
                                    </Text>
                                    <Text className="text-xs font-bold text-[#16783A] mb-0.5">
                                        Biaya: Rp. {item.pricePerDay.toLocaleString('id-ID')}/hari
                                    </Text>
                                    <Text className="text-[11px] text-gray-500">
                                        Deposit: Rp. {item.deposit.toLocaleString('id-ID')} (kembali)
                                    </Text>
                                </View>
                            </View>

                            {/* Pengaturan Durasi & Harga */}
                            <View className="bg-[#F8FAFC] rounded-xl p-2.5 flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <Text className="text-xs text-gray-500 mr-2">Durasi:</Text>

                                    <Pressable
                                        onPress={() => updateDuration(item.id, 'min')}
                                        className="w-6 h-6 rounded bg-white border border-gray-300 items-center justify-center"
                                    >
                                        <Minus size={12} color="#374151" />
                                    </Pressable>

                                    <Text className="text-xs font-bold text-gray-900 mx-3 w-10 text-center">
                                        {item.duration} Hari
                                    </Text>

                                    <Pressable
                                        onPress={() => updateDuration(item.id, 'add')}
                                        className="w-6 h-6 rounded bg-white border border-gray-300 items-center justify-center"
                                    >
                                        <Plus size={12} color="#374151" />
                                    </Pressable>
                                </View>

                                <Text className="text-sm font-bold text-[#16783A]">
                                    Rp. {(item.pricePerDay * item.duration).toLocaleString('id-ID')}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* === STICKY FOOTER (RINGKASAN & CHECKOUT) === */}
                <View
                    className="bg-white px-4 pt-4 border-t border-gray-200"
                    style={{ paddingBottom: Math.max(insets.bottom, 20) }}
                >
                    <View className="flex-row justify-between mb-1">
                        <Text className="text-sm text-gray-600">Biaya Sewa ({totalItems} barang):</Text>
                        <Text className="text-sm font-bold text-gray-900">Rp. {totalSewa.toLocaleString('id-ID')}</Text>
                    </View>
                    <View className="flex-row justify-between mb-3">
                        <Text className="text-sm text-gray-600">Total Deposit (Akan Dikembalikan):</Text>
                        <Text className="text-sm font-bold text-blue-600">Rp. {totalDeposit.toLocaleString('id-ID')}</Text>
                    </View>

                    <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                        <View>
                            <Text className="text-xs text-gray-500 mb-0.5">Total Pembayaran</Text>
                            <Text className="text-xl font-bold text-gray-900">
                                Rp. {grandTotal.toLocaleString('id-ID')}
                            </Text>
                        </View>
                        <Button
                            className="bg-[#16783A] hover:bg-[#16783A] active:bg-[#16783A] rounded-xl h-12 px-6"
                            onPress={() => console.log('Checkout', selectedItems)}
                            disabled={totalItems === 0}
                        >
                            <Text className="text-sm font-bold text-white">
                                Checkout Sewa ({totalItems})
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        </>
    );
}