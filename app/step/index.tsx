import { useWindowDimensions } from 'react-native';
import StepResponsive from '@/responsives/step/tablet-desktop';
import StepMobile from '@/responsives/step/mobile';

export default function Step() {
    const { width } = useWindowDimensions();

    if (width <= 640) {
        return <StepMobile />
    }
    return <StepResponsive />
}
