import { useWindowDimensions } from 'react-native';
import SewaPageResponsive from '@/responsives/home/[id_product]/sewa/tablet-desktop';
import SewaPageMobile from '@/responsives/home/[id_product]/sewa/mobile';

export default function SewaPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <SewaPageMobile />;
    }
    return <SewaPageResponsive />;
}
