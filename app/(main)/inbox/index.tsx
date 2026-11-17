import { useWindowDimensions } from 'react-native';
import InboxResponsive from '@/responsives/inbox/tablet-desktop';
import InboxMobile from '@/responsives/inbox/mobile';

export default function InboxPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <InboxMobile />
    }
    return <InboxResponsive />
}
