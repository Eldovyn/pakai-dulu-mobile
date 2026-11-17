import { View } from 'react-native';
import ProductPageMobile from '@/responsives/home/[id_product]/mobile';

const DEVICE_WIDTH = 400;
const FRAME_BORDER = 12;
const FRAME_RADIUS = 36;
const SCREEN_RADIUS = 24;

export default function ProductPageResponsive() {
    return (
        <View className="h-screen w-full items-center justify-center bg-neutral-200 py-8">
            <View
                style={{
                    width: DEVICE_WIDTH,
                    height: '100%',
                    maxHeight: 820,
                    borderWidth: FRAME_BORDER,
                    borderColor: '#1a1a1a',
                    borderRadius: FRAME_RADIUS,
                    overflow: 'hidden',
                    backgroundColor: '#1a1a1a',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.3,
                    shadowRadius: 28,
                    elevation: 14,
                }}
            >
                <View
                    style={{
                        height: 28,
                        backgroundColor: '#1a1a1a',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: 100,
                            height: 14,
                            borderRadius: 7,
                            backgroundColor: '#000',
                        }}
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        overflow: 'hidden',
                        borderRadius: SCREEN_RADIUS,
                        backgroundColor: '#ffffff',
                    }}
                >
                    <ProductPageMobile />
                </View>
            </View>
        </View>
    );
}
