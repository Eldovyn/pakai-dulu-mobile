import * as React from 'react';
import { View, ScrollView, Pressable, StatusBar, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { ChevronLeft, ChevronDown, Camera } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function LaporMasalahPage() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [description, setDescription] = React.useState('');
    const maxLength = 500;

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF8EE" translucent={false} />

            {/* === HEADER === */}
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitle: '',
                    headerStyle: { backgroundColor: '#FFF8EE' },
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.back()}
                            className="p-1 -ml-1"
                            hitSlop={10}
                        >
                            <ChevronLeft size={24} color="#16783A" strokeWidth={2.5} />
                        </Pressable>
                    ),
                }}
            />

            <View className="flex-1 bg-[#FFF8EE]">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    // Padding dipertipis dari 20 ke 16
                    contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
                >
                    {/* === STEP 1: PILIH TRANSAKSI === */}
                    {/* Margin bottom diubah dari mb-6 ke mb-5 */}
                    <View className="flex-row items-start mb-5">
                        <View className="w-7 h-7 rounded-full bg-[#16783A] items-center justify-center mr-3 mt-0.5">
                            <Text className="text-white font-bold text-xs">1</Text>
                        </View>
                        <View className="flex-1">
                            {/* Mengurangi margin bawah teks judul */}
                            <Text className="text-sm font-bold text-gray-900 mb-0.5">
                                Pilih Transaksi
                            </Text>
                            <Text className="text-xs text-gray-500 mb-2.5">
                                Pilih transaksi yang bermasalah
                            </Text>

                            {/* Card Dropdown lebih tipis (p-2.5) */}
                            <Pressable className="bg-[#E8EDF2] rounded-xl p-2.5 flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <View className="w-10 h-10 bg-gray-300 rounded-lg mr-3 overflow-hidden">
                                        <View className="w-full h-full items-center justify-center bg-gray-400">
                                            <Camera size={20} color="#9CA3AF" />
                                        </View>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-xs font-bold text-gray-900 mb-0.5">
                                            Kamera DSLR Canon
                                        </Text>
                                        <Text className="text-[11px] text-gray-500">
                                            11 Mei 2026
                                        </Text>
                                    </View>
                                </View>
                                <ChevronDown size={18} color="#374151" />
                            </Pressable>
                        </View>
                    </View>

                    {/* === STEP 2: UNGGAH BUKTI === */}
                    <View className="flex-row items-start mb-5">
                        <View className="w-7 h-7 rounded-full bg-[#16783A] items-center justify-center mr-3 mt-0.5">
                            <Text className="text-white font-bold text-xs">2</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-gray-900 mb-0.5">
                                Unggah Bukti
                            </Text>
                            <Text className="text-xs text-gray-500 mb-2.5">
                                Tambahkan foto/Video dan deskripsi masalah
                            </Text>

                            {/* Box Container Upload lebih padat (p-3) */}
                            <View className="bg-[#E8EDF2] rounded-xl p-3">
                                {/* 3 Kotak Upload Foto dengan gap lebih kecil */}
                                <View className="flex-row gap-2 mb-3">
                                    {[1, 2, 3].map((item) => (
                                        <Pressable
                                            key={item}
                                            // aspect-square tetap, tapi container lebih kecil karena padding
                                            className="flex-1 aspect-square bg-[#D9E0E8] rounded-lg items-center justify-center border border-gray-300/50"
                                        >
                                            <Camera size={24} color="#6B7280" />
                                        </Pressable>
                                    ))}
                                </View>

                                {/* Text Area Deskripsi lebih pendek (h-24) */}
                                <View className="bg-white rounded-lg border border-gray-200 p-2.5 h-24">
                                    <TextInput
                                        value={description}
                                        onChangeText={setDescription}
                                        placeholder="Tulis deskripsi masalah.."
                                        placeholderTextColor="#9CA3AF"
                                        multiline
                                        maxLength={maxLength}
                                        textAlignVertical="top"
                                        className="flex-1 text-xs text-gray-900"
                                        style={{ outlineStyle: 'none' } as any}
                                    />
                                    <Text className="text-right text-[10px] text-gray-400 mt-1">
                                        {description.length}/{maxLength}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* === STEP 3: KIRIM LAPORAN === */}
                    <View className="flex-row items-start mb-6">
                        <View className="w-7 h-7 rounded-full bg-[#16783A] items-center justify-center mr-3 mt-0.5">
                            <Text className="text-white font-bold text-xs">3</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-sm font-bold text-gray-900 mb-0.5">
                                Kirim Laporan
                            </Text>
                            <Text className="text-xs text-gray-500 leading-4 pr-4">
                                Tim kami akan meninjau laporan dalam 1-3 hari kerja
                            </Text>
                        </View>
                    </View>

                    {/* === TOMBOL KIRIM === */}
                    <Button
                        className="w-full h-12 bg-[#16783A] active:bg-[#16783A] rounded-full"
                        onPress={() => console.log('Kirim Laporan')}
                    >
                        <Text className="text-sm font-bold text-white">
                            Kirim Laporan
                        </Text>
                    </Button>
                </ScrollView>
            </View>
        </>
    );
}