import { useWindowDimensions } from 'react-native';
import PengaturanAlamatResponsive from '@/responsives/profile/pengaturan-alamat/tablet-desktop';
import PengaturanAlamatMobile from '@/responsives/profile/pengaturan-alamat/mobile';

export default function PengaturanAlamatPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <PengaturanAlamatMobile />
    }
    return <PengaturanAlamatResponsive />
}
