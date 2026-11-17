import { useWindowDimensions } from 'react-native';
import CartResponsive from '@/responsives/cart/tablet-desktop';
import CartMobile from '@/responsives/cart/mobile';

export default function CartPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <CartMobile />
    }
    return <CartResponsive />
}
