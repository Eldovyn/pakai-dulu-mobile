import * as React from 'react';
import { View, ScrollView, Pressable, StatusBar, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { ChevronLeft, Info, Camera, Clock, MapPin } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function DokumentasiBarangPage() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [activeTab, setActiveTab] = React.useState<'sebelum' | 'sesudah'>('sebelum');
    const [notes, setNotes] = React.useState('');

    const activeShadow = Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 2,
        },
        android: {
            elevation: 2,
        },
        default: {},
    });

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff7eb" translucent={false} />

            {/* === HEADER === */}
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitle: 'Dokumentasi Barang',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#fff7eb' },
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.back()}
                            className="p-2 -ml-2"
                            hitSlop={10}
                        >
                            <ChevronLeft size={26} color="#16783A" strokeWidth={2.5} />
                        </Pressable>
                    ),
                }}
            />

            <View className="flex-1 bg-[#fff7eb]">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 40 }}
                >
                    {/* === TABS === */}
                    <View className="flex-row bg-[#F3F4F6] rounded-full p-1 mb-6">
                        <Pressable
                            onPress={() => setActiveTab('sebelum')}
                            className={`flex-1 py-2.5 items-center justify-center rounded-full ${activeTab === 'sebelum'
                                ? 'bg-white border border-[#16783A]'
                                : 'bg-transparent'
                                }`}
                            style={activeTab === 'sebelum' ? activeShadow : undefined}
                        >
                            <Text
                                className={`text-sm ${activeTab === 'sebelum'
                                    ? 'font-bold text-gray-900'
                                    : 'font-medium text-gray-500'
                                    }`}
                            >
                                Sebelum Sewa
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setActiveTab('sesudah')}
                            className={`flex-1 py-2.5 items-center justify-center rounded-full ${activeTab === 'sesudah'
                                ? 'bg-white border border-[#16783A]'
                                : 'bg-transparent'
                                }`}
                            style={activeTab === 'sesudah' ? activeShadow : undefined}
                        >
                            <Text
                                className={`text-sm ${activeTab === 'sesudah'
                                    ? 'font-bold text-gray-900'
                                    : 'font-medium text-gray-500'
                                    }`}
                            >
                                Sesudah Sewa
                            </Text>
                        </Pressable>
                    </View>

                    {/* === AREA UPLOAD FOTO === */}
                    <View className="flex-row gap-3 mb-4">
                        {/* Kotak Foto 1 */}
                        <Pressable className="flex-1 aspect-square bg-[#EEF2F6] rounded-2xl items-center justify-center border border-gray-200 relative">
                            <View className="absolute top-3 left-3">
                                <Info size={16} color="#9CA3AF" />
                            </View>
                            <Camera size={32} color="#6B7280" />
                            <Text className="mt-3 text-sm text-gray-600 font-medium">
                                Tambahkan Foto
                            </Text>
                        </Pressable>

                        {/* Kotak Foto 2 */}
                        <Pressable className="flex-1 aspect-square bg-[#EEF2F6] rounded-2xl items-center justify-center border border-gray-200 relative">
                            <View className="absolute top-3 left-3">
                                <Info size={16} color="#9CA3AF" />
                            </View>
                            <Camera size={32} color="#6B7280" />
                            <Text className="mt-3 text-sm text-gray-600 font-medium">
                                Tambahkan Foto
                            </Text>
                        </Pressable>
                    </View>

                    {/* === INFO WAKTU & LOKASI === */}
                    <View className="flex-row items-center justify-between px-2 mb-6">
                        <View className="flex-row items-center gap-1.5">
                            <Clock size={16} color="#16783A" />
                            <Text className="text-xs text-gray-600 font-medium">
                                11 Mei 2026, 10.31
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-1.5">
                            <MapPin size={16} color="#16783A" />
                            <Text className="text-xs text-gray-600 font-medium">
                                Jl. Margonda No. 12
                            </Text>
                        </View>
                    </View>

                    {/* === TEKS INSTRUKSI === */}
                    <Text className="text-center text-xs text-gray-400 leading-5 mb-8 px-4">
                        Tambahkan foto kondisi barang sebelum diserahkan.{'\n'}
                        Minimal 3 foto (depan, samping, dan detail)
                    </Text>

                    {/* === INPUT CATATAN === */}
                    <View className="mb-8">
                        <Text className="text-sm font-bold text-gray-900 mb-3">
                            Informasi Tambahan
                        </Text>
                        <View className="bg-[#EEF2F6] rounded-2xl border border-gray-200 p-4 h-32">
                            <TextInput
                                value={notes}
                                onChangeText={setNotes}
                                placeholder="Tambahkan catatan kondisi barang (optional)"
                                placeholderTextColor="#9CA3AF"
                                multiline
                                textAlignVertical="top"
                                className="flex-1 text-sm text-gray-900"
                                style={{ outlineStyle: 'none' } as any}
                            />
                        </View>
                    </View>

                    {/* === TOMBOL SIMPAN === */}
                    <Button
                        className="w-full h-14 bg-[#16783A] active:bg-[#16783A] rounded-full mb-3"
                        onPress={() => console.log('Simpan Dokumentasi')}
                    >
                        <Text className="text-base font-bold text-white">
                            Simpan Dokumentasi
                        </Text>
                    </Button>

                    <Text className="text-center text-[11px] text-gray-400 px-8">
                        File akan dilengkapi waktu dan lokasi{'\n'}
                        untuk Keamanan bersama
                    </Text>
                </ScrollView>
            </View>
        </>
    );
}