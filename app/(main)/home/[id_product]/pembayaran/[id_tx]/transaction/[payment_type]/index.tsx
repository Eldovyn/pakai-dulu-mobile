import { useWindowDimensions } from 'react-native';
import PaymentPageResponsive from '@/responsives/home/[id_product]/pembayaran/[id_tx]/transaction/[payment_type]/tablet-desktop';
import PaymentPageMobile from '@/responsives/home/[id_product]/pembayaran/[id_tx]/transaction/[payment_type]/mobile';

export default function PaymentPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <PaymentPageMobile />;
    }
    return <PaymentPageResponsive />;
}
