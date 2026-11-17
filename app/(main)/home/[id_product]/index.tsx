import { useWindowDimensions } from 'react-native';
import ProductPageResponsive from '@/responsives/home/[id_product]/tablet-desktop';
import ProductPageMobile from '@/responsives/home/[id_product]/mobile';

export default function ProductPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <ProductPageMobile />;
    }
    return <ProductPageResponsive />;
}
