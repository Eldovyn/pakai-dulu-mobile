import { View, ScrollView, Pressable, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function LaporanSengketaPage() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF8EE" translucent={false} />

            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBackVisible: false,
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
                    headerTitle: () => (
                        <View className="items-start justify-center ml-2">
                            <Text className="text-sm font-bold text-gray-900">Laporan Sengketa</Text>
                            <Text className="text-xs font-semibold text-gray-900 mt-0.5">
                                Kamera DSLR Canon EOS 2000D
                            </Text>
                        </View>
                    ),
                    headerTitleAlign: 'left',
                }}
            />

            <View className="flex-1 bg-[#FFF8EE]">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 20, flexGrow: 1 }}
                >

                    {/* === STATUS CARD === */}
                    <View className="bg-[#A7F3D0] rounded-xl border border-[#6EE7B7] p-4 mb-8 flex-row items-start">
                        <View className="mt-0.5 mr-3">
                            {/* Ikon Check menggunakan warna hijau gelap */}
                            <CheckCircle2 size={24} color="#047857" strokeWidth={2.5} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-bold text-[#047857] mb-1">
                                Dalam Peninjauan
                            </Text>
                            <Text className="text-sm text-[#047857] opacity-80 leading-5">
                                Tim PakalDulu sedang meninjau laporan kamu. Kami akan memberikan update maksimal 1-3 hari kerja
                            </Text>
                        </View>
                    </View>

                    {/* === TIMELINE === */}
                    <View className="ml-2 mb-auto">

                        {/* Step 1: Laporan Dikirim (Aktif) */}
                        <View className="flex-row">
                            {/* Kolom Kiri (Garis & Titik) */}
                            <View className="items-center mr-4">
                                <View className="w-5 h-5 rounded-full border-[3px] border-[#16783A] bg-[#FFF8EE] items-center justify-center" />
                                <View className="w-[2px] flex-1 bg-[#16783A] my-1" />
                            </View>
                            {/* Kolom Kanan (Konten) */}
                            <View className="pb-6 flex-1">
                                <Text className="text-sm font-bold text-gray-900 mb-1">
                                    Laporan Dikirim
                                </Text>
                                <Text className="text-xs text-gray-500">
                                    11 Mei 2026, 14.20
                                </Text>
                            </View>
                        </View>

                        {/* Step 2: Sedang Ditinjau (Aktif) */}
                        <View className="flex-row">
                            <View className="items-center mr-4">
                                <View className="w-5 h-5 rounded-full border-[3px] border-[#16783A] bg-[#FFF8EE] items-center justify-center" />
                                <View className="w-[2px] flex-1 bg-[#E5E7EB] my-1" />
                            </View>
                            <View className="pb-6 flex-1">
                                <Text className="text-sm font-bold text-gray-900 mb-1">
                                    Sedang Ditinjau
                                </Text>
                                <Text className="text-xs text-gray-500">
                                    12 Mei 2026, 15.10
                                </Text>
                            </View>
                        </View>

                        {/* Step 3: Keputusan (Menunggu) */}
                        <View className="flex-row">
                            <View className="items-center mr-4">
                                <View className="w-5 h-5 rounded-full border-[3px] border-gray-300 bg-[#FFF8EE] items-center justify-center" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-sm font-bold text-gray-900 mb-1">
                                    Keputusan
                                </Text>
                                <Text className="text-xs text-gray-500">
                                    Menunggu
                                </Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>

                {/* === FOOTER BUTTON === */}
                {/* Memastikan tombol tetap di bawah jika layar panjang, atau ikut scroll jika layar pendek */}
                <View
                    className="px-4 pt-2 bg-[#FFF8EE]"
                    style={{ paddingBottom: Math.max(insets.bottom, 20) }}
                >
                    <Button
                        variant="outline" // Asumsi ada varian outline di shadcn setup Anda
                        className="w-full h-12 rounded-lg bg-transparent border border-[#16783A] active:bg-[#16783A]/10"
                        onPress={() => console.log('Lihat Detail Laporan')}
                    >
                        <Text className="text-sm font-bold text-[#16783A]">
                            Lihat Detail Laporan
                        </Text>
                    </Button>
                </View>
            </View>
        </>
    );
}