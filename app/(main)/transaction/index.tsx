import { useWindowDimensions } from 'react-native';
import TransactionResponsive from '@/responsives/transaction/tablet-desktop';
import TransactionMobile from '@/responsives/transaction/mobile';

export default function TransactionPage() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <TransactionMobile />
    }
    return <TransactionResponsive />
}
