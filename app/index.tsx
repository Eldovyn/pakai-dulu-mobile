import { useWindowDimensions } from 'react-native';
import LandingResponsive from '@/responsives/landing/tablet-desktop';
import LandingMobile from '@/responsives/landing/mobile';

export default function Screen() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <LandingMobile />
    }
    return <LandingResponsive />
}
