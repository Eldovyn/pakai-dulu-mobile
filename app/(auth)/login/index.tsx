import { useWindowDimensions } from 'react-native';
import LoginResponsive from '@/responsives/login/tablet-desktop';
import LoginMobile from '@/responsives/login/mobile';

export default function Login() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <LoginMobile />
    }
    return <LoginResponsive />
}
