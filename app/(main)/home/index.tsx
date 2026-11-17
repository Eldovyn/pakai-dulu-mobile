import { useWindowDimensions } from 'react-native';
import HomePageResponsive from '@/responsives/home/tablet-desktop';
import HomePageMobile from '@/responsives/home/mobile';

export default function HomePage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <HomePageMobile />
    }
    return <HomePageResponsive />
}

