import { useWindowDimensions } from 'react-native';
import DokumentasiBarangResponsive from '@/responsives/dokumentasi-barang/tablet-desktop';
import DokumentasiBarangMobile from '@/responsives/dokumentasi-barang/mobile';

export default function DokumentasiBarangPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <DokumentasiBarangMobile />
    }
    return <DokumentasiBarangResponsive />
}
