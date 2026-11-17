import { useWindowDimensions } from 'react-native';
import HomeResponsive from '@/responsives/landing/tablet-desktop';
import HomeMobile from '@/responsives/landing/mobile';


const SCREEN_OPTIONS = {
  title: 'React Native Reusables',
  headerTransparent: true,
};

export default function Home() {
  const { width } = useWindowDimensions();

  if (width <= 640) {
    return <HomeMobile />
  }
  return <HomeResponsive />
}
