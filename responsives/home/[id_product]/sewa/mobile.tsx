
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import {
    View,
    TouchableOpacity,
    Pressable,
    ScrollView,
} from 'react-native';
import { StatusBar } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    MapPin,
    CircleHelp,
    TicketPercent,
    CircleDollarSign,
    Check,
} from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SewaPageProps = {
    embedded?: boolean;
};

const SewaPage = ({ embedded }: SewaPageProps) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { id_product } = useLocalSearchParams<{ id_product: string }>();

    const [shippingMethod, setShippingMethod] = useState('delivery');
    const [usePoints, setUsePoints] = useState(false);

    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [selectedDuration, setSelectedDuration] = useState(3);

    const handleCustomBack = () => {
        router.replace(`/(main)/home/${id_product}`);
    };

    const durations = [
        { id: 1, label: '1 Hari', price: 'Rp. 150.000' },
        { id: 3, label: '3 Hari', price: 'Rp. 400.000' },
        { id: 7, label: '7 Hari', price: 'Rp. 990.830' },
    ];

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#fff7eb"
                translucent={false}
            />
            <Stack.Screen
                options={{
                    headerShown: !embedded,
                    headerTransparent: false,
                    headerTitleAlign: 'center',
                    headerTitle: 'Sewa Barang',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff7eb',
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={handleCustomBack}
                            className="p-2"
                            hitSlop={10}
                        >
                            <ChevronLeft size={22} color="#000000" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <View className="flex-1 bg-[#fff7eb]">
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="p-4 pb-28"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Lokasi */}
                    <View className="flex-row justify-between items-center pb-5">
                        <View className="flex-row items-center gap-1.5">
                            <MapPin size={22} color="#199f37" />

                            <View className="flex-col">
                                <Text className="text-[10px] text-[#7a7373]">
                                    Lokasi Kamu
                                </Text>

                                <View className="flex-row items-center gap-1">
                                    <Text className="text-[10px] font-bold">
                                        Depok, Jawa Barat
                                    </Text>
                                    <ChevronDown size={14} color="black" />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Kalender */}
                    <View className="rounded-2xl overflow-hidden">
                        <Calendar
                            current={date}
                            minDate={today}
                            onDayPress={(day) => setDate(day.dateString)}
                            markedDates={{
                                [date]: {
                                    selected: true,
                                    selectedColor: '#2563eb',
                                },
                            }}
                            renderArrow={(direction) =>
                                direction === 'left' ? (
                                    <ChevronLeft size={20} color="#2563eb" />
                                ) : (
                                    <ChevronRight size={20} color="#2563eb" />
                                )
                            }
                            theme={{
                                calendarBackground: 'white',
                                monthTextColor: '#111827',
                                textSectionTitleColor: '#6B7280',
                                todayTextColor: '#2563eb',
                                dayTextColor: '#111827',
                                textDisabledColor: '#D1D5DB',
                                arrowColor: '#2563eb',
                                selectedDayBackgroundColor: '#2563eb',
                                selectedDayTextColor: '#ffffff',
                            }}
                        />
                    </View>

                    {/* Durasi Sewa */}
                    <View className="gap-3 pt-5">
                        <Text className="text-base font-semibold text-[#292929]">
                            Durasi Sewa
                        </Text>

                        <View className="flex-row gap-2.5">
                            {durations.map((item) => {
                                const isSelected = selectedDuration === item.id;

                                return (
                                    <Pressable
                                        key={item.id}
                                        onPress={() => setSelectedDuration(item.id)}
                                        className={`flex-1 items-center justify-center rounded-2xl border bg-white py-4 ${isSelected
                                            ? 'border-[#16833B]'
                                            : 'border-transparent'
                                            }`}
                                    >
                                        <Text
                                            className={`text-sm font-semibold ${isSelected
                                                ? 'text-[#16833B]'
                                                : 'text-[#292929]'
                                                }`}
                                        >
                                            {item.label}
                                        </Text>

                                        <Text className="mt-1 text-xs text-[#64748B]">
                                            {item.price}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>

                        <Pressable
                            className="h-12 items-center justify-center rounded-2xl border border-[#91C7A2] bg-white"
                            onPress={() => console.log('Sesuaikan waktu')}
                        >
                            <Text className="text-sm font-semibold text-[#16833B]">
                                Sesuaikan waktu peminjamanmu
                            </Text>
                        </Pressable>

                        <Pressable
                            className="h-12 flex-row items-center justify-between rounded-2xl border border-[#91C7A2] bg-white px-4"
                            onPress={() => console.log('Pesan untuk penjual')}
                        >
                            <Text className="text-sm text-[#16833B]">
                                Pesan untuk Penjual
                            </Text>

                            <View className="flex-row items-center gap-1">
                                <Text className="text-xs text-[#94A3B8]">
                                    Tinggalkan pesan
                                </Text>
                                <ChevronRight size={17} color="#94A3B8" />
                            </View>
                        </Pressable>
                    </View>

                    {/* Opsi Pengiriman */}
                    <View className="mt-5 gap-3">
                        <View className="flex-row items-center justify-between">
                            <Text className="text-base font-semibold text-[#292929]">
                                Opsi Pengiriman
                            </Text>

                            <Pressable className="flex-row items-center gap-1">
                                <Text className="text-xs text-[#64748B]">
                                    Lihat Semua
                                </Text>
                                <ChevronRight size={16} color="#64748B" />
                            </Pressable>
                        </View>

                        {/* Langsung Kirim */}
                        <Pressable
                            onPress={() => setShippingMethod('delivery')}
                            className={`rounded-2xl border bg-white p-3.5 ${shippingMethod === 'delivery'
                                ? 'border-[#16833B]'
                                : 'border-[#E2E8F0]'
                                }`}
                        >
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-1">
                                    <Text className="text-sm font-semibold text-[#292929]">
                                        Langsung Kirim
                                    </Text>
                                    <CircleHelp size={13} color="#94A3B8" />
                                </View>

                                <View className="flex-row items-center gap-1">
                                    <Text className="text-xs text-[#94A3B8] line-through">
                                        Rp. 15.000
                                    </Text>
                                    <Text className="text-sm font-semibold text-[#16833B]">
                                        Rp.0
                                    </Text>
                                </View>
                            </View>

                            <Text className="mt-1 text-xs text-[#16833B]">
                                Kamu mendapatkan gratis ongkir!
                            </Text>
                        </Pressable>

                        {/* Bertemu Langsung */}
                        <Pressable
                            onPress={() => setShippingMethod('meeting')}
                            className={`rounded-2xl border bg-white p-3.5 ${shippingMethod === 'meeting'
                                ? 'border-[#16833B]'
                                : 'border-[#E2E8F0]'
                                }`}
                        >
                            <View className="flex-row items-center justify-between">
                                <View>
                                    <Text className="text-sm font-semibold text-[#292929]">
                                        Bertemu langsung
                                    </Text>

                                    <Text className="mt-1 text-xs text-[#94A3B8]">
                                        Janji ketemu di mana?
                                    </Text>
                                </View>

                                <Text className="text-sm font-semibold text-[#292929]">
                                    Rp.0
                                </Text>
                            </View>
                        </Pressable>

                        {/* Voucher */}
                        <Pressable
                            onPress={() => console.log('Pilih voucher')}
                            className="h-12 flex-row items-center gap-3 rounded-2xl border border-[#FF814A] bg-white px-4"
                        >
                            <TicketPercent size={21} color="#FF6B2C" />

                            <Text className="text-sm font-semibold text-[#FF6B2C]">
                                Voucher
                            </Text>

                            <View className="ml-auto">
                                <ChevronRight size={17} color="#FF6B2C" />
                            </View>
                        </Pressable>

                        {/* Tukarkan Point */}
                        <Pressable
                            onPress={() => setUsePoints(!usePoints)}
                            className="h-12 flex-row items-center justify-between rounded-2xl border border-[#FF814A] bg-white px-4"
                        >
                            <View className="flex-row items-center gap-3">
                                <View className="h-6 w-6 items-center justify-center rounded-full bg-[#FFB800]">
                                    <CircleDollarSign size={19} color="white" />
                                </View>

                                <Text className="text-sm font-semibold text-[#FF6B2C]">
                                    Tukarkan 50 point
                                </Text>
                            </View>

                            <View
                                className={`h-7 w-[52px] justify-center rounded-full border-2 px-1 ${usePoints
                                    ? 'border-[#16833B] bg-[#16833B]'
                                    : 'border-[#858D82] bg-[#E1E5DC]'
                                    }`}
                            >
                                <View
                                    className={`h-5 w-5 rounded-full ${usePoints
                                        ? 'self-end bg-white'
                                        : 'self-start bg-[#737B70]'
                                        }`}
                                />
                            </View>
                        </Pressable>

                        {/* Pengingat */}
                        <View className="flex-row items-center gap-3 rounded-2xl bg-[#C5E6C9] p-4">
                            <View className="h-5 w-5 items-center justify-center rounded-full bg-[#218044]">
                                <Check
                                    size={14}
                                    color="white"
                                    strokeWidth={3}
                                />
                            </View>

                            <Text className="flex-1 text-xs font-semibold leading-4 text-[#16783A]">
                                Kamu akan mendapat pengingat sebelum tanggal
                                pengembalian
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Payment Bar */}
                <View
                    className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between bg-white border-t border-gray-200 px-4 pt-3"
                    style={{
                        paddingBottom: insets.bottom + 12,
                    }}
                >
                    <View>
                        <Text className="text-xs">
                            Total Pembayaran
                        </Text>
                        <Text className="text-sm text-[#16783A] font-semibold">
                            Rp. 900.000
                        </Text>
                    </View>

                    <Button
                        className="bg-[#16783A] active:bg-[#16783A] hover:bg-[#16783A]"
                        onPress={() => {
                            router.push(`/(main)/home/${id_product}/pembayaran/002`);
                        }}
                    >
                        <Text className="font-semibold text-white">
                            Lanjut ke Pembayaran
                        </Text>
                    </Button>
                </View>
            </View>
        </>
    );
};

export default SewaPage;
