import { useState } from 'react';
import { View, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { headerStyle } from '@/constant/headerStyle';
import {
    Truck,
    QrCode,
    Wallet,
    Circle,
    Smartphone,
    ArrowLeftRight,
    CreditCard,
    Store,
    HelpCircle,
    Shield,
    ChevronLeft,
} from 'lucide-react-native';

const PAYMENT_METHODS: PaymentItem[] = [
    {
        id: 'cod',
        label: 'COD',
        hasInfo: true,
        bgClass: 'bg-[#FFF0EA]',
        icon: <Truck size={20} color="#EE4D2D" />,
    },
    {
        id: 'qris',
        label: 'QRIS',
        bgClass: 'bg-[#E2E2E2]',
        icon: <QrCode size={20} color="#262626" />,
    },
    {
        id: 'gopay',
        label: 'GoPay',
        bgClass: 'bg-[#E5F7FA]',
        icon: <Wallet size={20} color="#00AED6" />,
    },
    {
        id: 'ovo',
        label: 'OVO',
        bgClass: 'bg-[#EFEBF6]',
        icon: <Circle size={18} color="#4C3494" fill="#4C3494" />,
    },
    {
        id: 'dana',
        label: 'Dana',
        bgClass: 'bg-[#E6F3FC]',
        icon: <Smartphone size={20} color="#118EEA" />,
    },
    {
        id: 'transfer',
        label: 'Transfer Bank',
        hasInfo: true,
        bgClass: 'bg-[#FFF0EA]',
        icon: <ArrowLeftRight size={20} color="#EE4D2D" />,
    },
    {
        id: 'card',
        label: 'Kartu Kredit/Debit',
        hasInfo: true,
        bgClass: 'bg-[#FFF0EA]',
        icon: <CreditCard size={20} color="#EE4D2D" />,
    },
    {
        id: 'mitra',
        label: 'Bayar Tunai di Mitra/Agen',
        hasInfo: true,
        bgClass: 'bg-[#FFF0EA]',
        icon: <Store size={20} color="#EE4D2D" />,
    },
];

type PembayaranPageProps = {
    embedded?: boolean;
};

const PembayaranPage = ({ embedded }: PembayaranPageProps) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const { id_product, id_tx } = useLocalSearchParams<{ id_product: string, id_tx: string }>();

    const [selected, setSelected] = useState<string>('dana');

    const handleCustomBack = () => {
        router.replace(`/(main)/home/${id_product}/sewa`);
    };

    const handlePayment = () => {
        if (!id_product || !id_tx) {
            console.log('Parameter tidak lengkap:', {
                id_product,
                id_tx,
            });
            return;
        }

        router.push({
            pathname:
                '/(main)/home/[id_product]/pembayaran/[id_tx]/transaction/[payment_type]',
            params: {
                id_product: String(id_product),
                id_tx: String(id_tx),
                payment_type: selected,
            },
        });
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Text className="text-sm font-semibold text-black">
                            Pembayaran
                        </Text>
                    ),
                    headerShown: !embedded,
                    headerShadowVisible: false,
                    headerStyle: headerStyle,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={handleCustomBack}
                            className="p-2"
                        >
                            <ChevronLeft
                                size={22}
                                color="#000000"
                                strokeWidth={2}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />

            <View className="flex-1 bg-[#fff7eb]">
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="p-4 pb-32 gap-6"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Daftar Metode Pembayaran */}
                    <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
                        {PAYMENT_METHODS.map((item, index) => {
                            const isSelected = selected === item.id;
                            const isLast = index === PAYMENT_METHODS.length - 1;

                            return (
                                <Pressable
                                    key={item.id}
                                    onPress={() => setSelected(item.id)}
                                    className={`flex-row items-center justify-between px-4 py-3.5 active:bg-slate-50 ${!isLast
                                        ? 'border-b border-slate-100'
                                        : ''
                                        }`}
                                >
                                    {/* Bagian Kiri */}
                                    <View className="flex-row items-center gap-3.5">
                                        <View
                                            className={`h-10 w-12 items-center justify-center rounded-xl ${item.bgClass}`}
                                        >
                                            {item.icon}
                                        </View>

                                        <View className="flex-row items-center gap-1.5">
                                            <Text className="text-[15px] font-medium text-slate-800">
                                                {item.label}
                                            </Text>

                                            {item.hasInfo && (
                                                <Pressable
                                                    hitSlop={8}
                                                    onPress={() =>
                                                        console.log(
                                                            `Info: ${item.label}`
                                                        )
                                                    }
                                                >
                                                    <HelpCircle
                                                        size={15}
                                                        color="#94A3B8"
                                                    />
                                                </Pressable>
                                            )}
                                        </View>
                                    </View>

                                    {/* Custom Radio Button */}
                                    <View
                                        className={`h-6 w-6 items-center justify-center rounded-full border-2 ${isSelected
                                            ? 'border-[#1E7836]'
                                            : 'border-slate-300'
                                            }`}
                                    >
                                        {isSelected && (
                                            <View className="h-3 w-3 rounded-full bg-[#1E7836]" />
                                        )}
                                    </View>
                                </Pressable>
                            );
                        })}
                    </Card>

                    {/* Banner Informasi Deposit */}
                    <Card className="flex-row items-start rounded-2xl border border-[#82B887] bg-[#CBE7CD] p-4 gap-3.5 shadow-none">
                        <View className="mt-0.5 h-10 w-10 items-center justify-center rounded-full bg-[#D5C39A]">
                            <Shield
                                size={20}
                                color="#E65100"
                                strokeWidth={2.2}
                            />
                        </View>

                        <View className="flex-1 gap-1">
                            <Text className="text-base font-bold text-[#1E2923]">
                                Informasi Deposit
                            </Text>

                            <Text className="text-sm leading-5 text-[#356839]">
                                Deposit akan ditahan oleh platform dan
                                dikembalikan setelah barang diverifikasi dalam
                                keadaan baik dan telah dikembalikan.
                            </Text>
                        </View>
                    </Card>

                    {/* Rincian Pembayaran */}
                    <View className="gap-3 px-1">
                        <Text className="mb-1 text-lg font-bold text-[#1E2923]">
                            Rincian pembayaran
                        </Text>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-sm text-slate-600">
                                Harga Sewa
                            </Text>
                            <Text className="text-sm font-semibold text-slate-900">
                                Rp. 400.000
                            </Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-sm text-slate-600">
                                Deposit (ditahan)
                            </Text>
                            <Text className="text-sm font-semibold text-slate-900">
                                Rp. 500.000
                            </Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-sm text-slate-600">
                                Biaya ongkir
                            </Text>
                            <Text className="text-sm font-semibold text-slate-900">
                                Rp. 0
                            </Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <Text className="text-sm text-slate-600">
                                Tukarkan 50 point
                            </Text>
                            <Text className="text-sm font-semibold text-slate-900">
                                -
                            </Text>
                        </View>

                        {/* Total */}
                        <View className="mt-1 flex-row items-center justify-between pt-2">
                            <Text className="text-lg font-bold text-slate-900">
                                Total
                            </Text>

                            <Text className="text-xl font-bold text-[#1E7836]">
                                Rp. 900.000
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Payment Bar */}
                <View
                    className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t border-gray-200 bg-white px-4 pt-3"
                    style={{
                        paddingBottom: insets.bottom + 12,
                    }}
                >
                    <View>
                        <Text className="text-xs">
                            Total Pembayaran
                        </Text>

                        <Text className="text-sm font-semibold text-[#16783A]">
                            Rp. 900.000
                        </Text>
                    </View>

                    <Button
                        className="bg-[#16783A] hover:bg-[#16783A] active:bg-[#16783A]"
                        onPress={handlePayment}
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

export default PembayaranPage;
