import { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import {
    Clock,
    CheckCircle2,
    Check,
    Hourglass,
} from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Portal } from '@rn-primitives/portal';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getPayment } from '@/api/product/product';

const PAYMENT_DURATION = 15 * 60;

const formatRupiah = (amount?: number | string | null) => {
    const num = typeof amount === 'string' ? Number(amount) : amount;
    if (num == null || Number.isNaN(num)) return 'Rp 0';
    return `Rp ${num.toLocaleString('id-ID')}`;
};

const formatTime = (seconds: number) => {
    const safe = Number(seconds) || 0;
    const minutes = Math.floor(safe / 60);
    const remainingSeconds = safe % 60;

    return `${String(minutes).padStart(2, '0')}:${String(
        remainingSeconds
    ).padStart(2, '0')}`;
};

export const PAYMENT_OVERLAY_HOST = 'payment-overlay';

export function QrisPayment({
    id_product,
    id_tx,
    payment_type,
    embedded,
}: QrisPaymentProps) {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const {
        data: dataPaymentList,
        isLoading,
        isError,
        error,
    } = useQuery<PaymentData[]>({
        queryKey: ['dataPayment', id_tx],
        queryFn: () => getPayment(id_tx ?? ''),
        enabled: !!id_tx,
    });

    const dataPayment = dataPaymentList?.[0];

    const [paid, setPaid] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [remainingTime, setRemainingTime] = useState(PAYMENT_DURATION);

    const isExpired = remainingTime <= 0;

    useEffect(() => {
        if (dataPayment) {
            setPaid(Boolean(dataPayment.paid));
            setRemainingTime(Number(dataPayment.remaining_time) || 0);
        }
    }, [dataPayment]);

    useEffect(() => {
        if (isExpired || paid) return;

        const timer = setInterval(() => {
            setRemainingTime((previous) => Math.max(previous - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isExpired, paid]);

    const handleRegenerateQR = () => {
        setRemainingTime(PAYMENT_DURATION);
        setPaid(false);
    };

    const handleCheckPayment = () => {
        console.log('Cek pembayaran:', {
            id_product,
            id_tx,
            payment_type,
            orderId: dataPayment?.order_id,
        });

        setPaid(true);
        setIsDialogVisible(true);
    };

    const goToHome = () => {
        setIsDialogVisible(false);
        setTimeout(() => {
            router.replace('/(main)/home');
        }, 300);
    };

    const instructions = [
        {
            title: 'Buka aplikasi pembayaran',
            description:
                'Buka aplikasi mobile banking atau e-wallet yang mendukung QRIS.',
        },
        {
            title: 'Scan kode QR',
            description:
                'Pilih menu scan QRIS dan arahkan kamera ke kode QR.',
        },
        {
            title: 'Konfirmasi pembayaran',
            description:
                'Pastikan nominal pembayaran sesuai, kemudian selesaikan transaksi.',
        },
    ];

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50">
                <ActivityIndicator size="large" color="#16783A" />
                <Text className="mt-3 text-sm text-gray-500">
                    Memuat data pembayaran...
                </Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50 px-6">
                <Text className="text-center text-base font-semibold text-red-600">
                    Gagal memuat data pembayaran
                </Text>
                <Text className="mt-2 text-center text-sm text-gray-500">
                    {(error as Error)?.message ?? 'Terjadi kesalahan'}
                </Text>
                <Button
                    className="mt-4 bg-[#16783A]"
                    onPress={() => router.replace(`/(main)/home/${id_product}/pembayaran/${id_tx}`)}
                >
                    <Text className="font-semibold text-white">Kembali</Text>
                </Button>
            </View>
        );
    }

    if (!dataPayment) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-50 px-6">
                <Text className="text-center text-base font-semibold text-gray-800">
                    Data pembayaran tidak ditemukan
                </Text>
                <Text className="mt-2 text-center text-sm text-gray-500">
                    Transaksi dengan ID "{id_tx}" tidak tersedia.
                </Text>
                <Button
                    className="mt-4 bg-[#16783A]"
                    onPress={() => router.back()}
                >
                    <Text className="font-semibold text-white">Kembali</Text>
                </Button>
            </View>
        );
    }

    const totalPayment = Number(dataPayment.total_payment) || 0;
    const orderId = dataPayment.order_id ?? '-';
    const qrValue =
        dataPayment.qr_value ??
        `DEMO-QRIS|ORDER-${orderId}|AMOUNT-${totalPayment}`;
    const rentFee = Number(dataPayment.rent_fee) || 0;
    const deposit = Number(dataPayment.deposit) || 0;
    const sellerName = dataPayment.seller_name ?? 'Pemilik barang';
    const itemName = dataPayment.item_name ?? '-';
    const paymentType = dataPayment.payment_type ?? 'QRIS';

    // Konten dialog sukses (dipakai di AlertDialog native & overlay in-frame)
    const successContent = (
        <>
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-[#16783A]">
                    <Check size={28} color="white" strokeWidth={3} />
                </View>
            </View>

            <AlertDialogHeader className="items-center">
                <Text className="text-xl font-bold text-gray-800">
                    Pembayaran Berhasil!
                </Text>
            </AlertDialogHeader>

            <View className="my-4 w-full flex-row items-center rounded-xl border border-orange-200 bg-orange-50 p-4">
                <Hourglass size={20} color="#D97706" />
                <Text className="ml-3 flex-1 text-sm leading-5 text-orange-700">
                    Menunggu konfirmasi dari pihak pemilik barang ({sellerName}).
                </Text>
            </View>

            {/* Kotak Rincian */}
            <View className="mb-6 w-full gap-3 rounded-xl bg-gray-100 p-4">
                <View className="flex-row items-start justify-between">
                    <Text className="w-1/3 text-sm text-gray-500">
                        Barang
                    </Text>
                    <Text className="flex-1 text-right text-sm font-medium text-gray-800">
                        {itemName}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-gray-500">
                        Metode
                    </Text>
                    <Text className="text-sm font-medium text-gray-800">
                        {paymentType}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-gray-500">
                        Total Bayar
                    </Text>
                    <Text className="text-sm font-bold text-[#16783A]">
                        {formatRupiah(totalPayment)}
                    </Text>
                </View>
            </View>

            <AlertDialogFooter className="w-full">
                <Button
                    className="w-full h-12 bg-[#16783A] active:bg-[#16783A] hover:bg-[#16783A] rounded-xl"
                    onPress={goToHome}
                >
                    <Text className="text-base font-bold text-white text-center">
                        Kembali ke Beranda
                    </Text>
                </Button>
            </AlertDialogFooter>
        </>
    );

    return (
        <View className="flex-1 bg-gray-50">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 24,
                }}
            >
                <View className="mb-5 items-center">
                    <Text className="text-sm text-gray-500">
                        Total Pembayaran
                    </Text>

                    <Text className="mt-1 text-2xl font-bold text-gray-900">
                        {formatRupiah(totalPayment)}
                    </Text>

                    <View
                        className={`mt-3 flex-row items-center rounded-full px-3 py-2 ${paid ? 'bg-green-100' : 'bg-orange-100'
                            }`}
                    >
                        <Clock size={15} color={paid ? '#16A34A' : '#EA580C'} />

                        <Text
                            className={`ml-2 text-sm font-medium ${paid ? 'text-green-700' : 'text-orange-700'
                                }`}
                        >
                            {paid
                                ? 'Pembayaran telah diterima'
                                : isExpired
                                    ? 'QRIS kedaluwarsa'
                                    : `Bayar dalam ${formatTime(remainingTime)}`}
                        </Text>
                    </View>
                </View>

                <Card className="items-center p-5">
                    <Text className="mb-1 text-lg font-semibold text-gray-900">
                        Scan QRIS
                    </Text>

                    <Text className="mb-5 text-center text-sm text-gray-500">
                        Scan kode QR menggunakan aplikasi pembayaran
                        yang mendukung QRIS.
                    </Text>

                    <View
                        className={`rounded-xl bg-white p-4 ${isExpired || paid ? 'opacity-30' : ''}`}
                    >
                        <QRCode
                            value={qrValue}
                            size={220}
                            backgroundColor="white"
                            color="black"
                        />
                    </View>

                    {isExpired ? (
                        <View className="mt-4 items-center">
                            <Text className="text-sm font-medium text-red-600">
                                Waktu pembayaran telah habis.
                            </Text>

                            <Button
                                className="mt-3"
                                onPress={handleRegenerateQR}
                            >
                                <Text className="font-semibold text-white">
                                    Buat Ulang QR
                                </Text>
                            </Button>
                        </View>
                    ) : (
                        <View className="mt-5 flex-row items-center">
                            <CheckCircle2 size={16} color="#16A34A" />

                            <Text className="ml-2 text-xs text-gray-500">
                                {paid
                                    ? 'Pembayaran telah diterima'
                                    : 'Menunggu pembayaran'}
                            </Text>
                        </View>
                    )}
                </Card>

                <View className="mt-5 rounded-xl bg-white p-4">
                    <Text className="text-xs text-gray-500">
                        No. Pemesanan
                    </Text>

                    <Text className="mt-1 font-semibold text-gray-900">
                        {orderId}
                    </Text>
                </View>

                <View className="mt-6">
                    <Text className="mb-3 text-base font-semibold text-gray-900">
                        Cara Pembayaran
                    </Text>

                    {instructions.map((instruction, index) => (
                        <View key={index} className="mb-4 flex-row">
                            <View className="mr-3 h-7 w-7 items-center justify-center rounded-full bg-green-100">
                                <Text className="font-semibold text-green-700">
                                    {index + 1}
                                </Text>
                            </View>

                            <View className="flex-1">
                                <Text className="font-medium text-gray-900">
                                    {instruction.title}
                                </Text>

                                <Text className="mt-1 text-sm text-gray-500">
                                    {instruction.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View className="mt-6">
                    <Text className="mb-3 text-base font-semibold text-gray-900">
                        Rincian Pembayaran
                    </Text>

                    <Card className="flex flex-col gap-1 p-4">
                        <View className="flex-row justify-between">
                            <Text className="text-sm text-gray-500">
                                Biaya Sewa
                            </Text>

                            <Text className="text-sm font-medium text-gray-900">
                                {formatRupiah(rentFee)}
                            </Text>
                        </View>

                        <View className="mt-3 flex-row justify-between">
                            <Text className="text-sm text-gray-500">
                                Deposit
                            </Text>

                            <Text className="text-sm font-medium text-gray-900">
                                {formatRupiah(deposit)}
                            </Text>
                        </View>

                        <View className="my-4 border-t border-dashed border-gray-200" />

                        <View className="flex-row justify-between">
                            <Text className="font-semibold text-gray-900">
                                Total Pembayaran
                            </Text>

                            <Text className="font-bold text-[#16783A]">
                                {formatRupiah(totalPayment)}
                            </Text>
                        </View>
                    </Card>
                </View>
            </ScrollView>

            <View
                className="border-t border-gray-200 bg-white px-4 pt-3"
                style={{
                    paddingBottom: Math.max(insets.bottom, 12),
                }}
            >
                <Button
                    className="h-12 bg-[#16783A] hover:bg-[#16783A] active:bg-[#16783A]"
                    disabled={isExpired || paid}
                    onPress={handleCheckPayment}
                >
                    <Text className="font-semibold text-white">
                        {paid
                            ? 'Pembayaran Telah Diterima'
                            : 'Cek Pembayaran'}
                    </Text>
                </Button>
            </View>

            <AlertDialog open={isDialogVisible && !embedded} onOpenChange={setIsDialogVisible}>
                <AlertDialogContent className="items-center rounded-2xl">
                    {successContent}
                </AlertDialogContent>
            </AlertDialog>

            {/* === OVERLAY IN-FRAME (EMBEDDED) ===
                Di-render lewat Portal ke level frame (lihat tablet-desktop) supaya
                dialog menutupi seluruh area frame, bukan hanya area konten. */}
            {embedded && (
                <Portal hostName={PAYMENT_OVERLAY_HOST} name="payment-success">
                    {isDialogVisible && (
                        <View className="absolute inset-0 z-50 items-center justify-center bg-black/50 p-2">
                            <View
                                className="w-full items-center rounded-2xl border border-border bg-background p-6"
                                style={{ maxWidth: 360 }}
                            >
                                {successContent}
                            </View>
                        </View>
                    )}
                </Portal>
            )}
        </View>
    );
}