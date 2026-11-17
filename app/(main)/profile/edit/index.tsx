import { useWindowDimensions } from 'react-native';
import EditProfileResponsive from '@/responsives/profile/edit/tablet-desktop';
import EditProfileMobile from '@/responsives/profile/edit/mobile';

export default function EditProfilePage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <EditProfileMobile />
    }
    return <EditProfileResponsive />
}
