import { useWindowDimensions } from 'react-native';
import ProfileResponsive from '@/responsives/profile/tablet-desktop';
import ProfileMobile from '@/responsives/profile/mobile';

export default function ProfilePage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <ProfileMobile />
    }
    return <ProfileResponsive />
}
