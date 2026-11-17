import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { headerStyle } from '@/constant/headerStyle';
import { QrisPayment } from '@/components/payments/QrisPayment';

export default function PaymentPage() {
    const router = useRouter();

    const { id_product, id_tx, payment_type } =
        useLocalSearchParams<{
            id_product: string;
            id_tx: string;
            payment_type: string;
        }>();

    const handleBack = () => {
        router.replace({
            pathname: '/(main)/home/[id_product]/pembayaran/[id_tx]',
            params: {
                id_product,
                id_tx,
            },
        });
    };

    const paymentProps = {
        id_product,
        id_tx,
        payment_type,
    };

    let paymentComponent;

    switch (payment_type?.toLowerCase()) {
        case 'qris':
            paymentComponent = <QrisPayment {...paymentProps} />;
            break;

        default:
            paymentComponent = (
                <View className="flex-1 items-center justify-center bg-gray-50 p-5">
                    <Text className="text-base font-semibold text-gray-900">
                        Metode pembayaran {payment_type} belum tersedia
                    </Text>
                </View>
            );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <Text className="text-sm font-semibold text-black">
                            Pembayaran
                        </Text>
                    ),
                    headerShadowVisible: false,
                    headerStyle,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={handleBack}
                            className="p-2"
                        >
                            <ChevronLeft size={22} color="#000000" />
                        </TouchableOpacity>
                    ),
                }}
            />

            {paymentComponent}
        </>
    );
}