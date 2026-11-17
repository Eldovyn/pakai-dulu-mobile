import { useWindowDimensions } from 'react-native';
import LaporBarangResponsive from '@/responsives/lapor-barang/tablet-desktop';
import LaporBarangMobile from '@/responsives/lapor-barang/mobile';

export default function LaporBarangPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <LaporBarangMobile />
    }
    return <LaporBarangResponsive />
}
