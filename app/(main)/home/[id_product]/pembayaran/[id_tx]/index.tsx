import { useWindowDimensions } from 'react-native';
import PembayaranPageResponsive from '@/responsives/home/[id_product]/pembayaran/[id_tx]/tablet-desktop';
import PembayaranPageMobile from '@/responsives/home/[id_product]/pembayaran/[id_tx]/mobile';

export default function PembayaranPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <PembayaranPageMobile />;
    }
    return <PembayaranPageResponsive />;
}
