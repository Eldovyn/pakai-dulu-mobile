import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { View, Image, useWindowDimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const SCREEN_OPTIONS = {
    title: 'React Native Reusables',
    headerTransparent: true,
};

const MOBILE_MAX_WIDTH = 400;
const FRAME_BORDER = 12;       // tebal bingkai kiri/kanan
const FRAME_RADIUS = 36;       // sudut melengkung device

export default function HomeResponsive() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const isWide = width > MOBILE_MAX_WIDTH;

    // Konten utama (dipakai baik di mobile asli maupun di dalam frame)
    const content = (
        <View className="bg-[#fff7eb] h-full flex flex-col justify-center items-center w-full">
            <Image
                source={require('@/assets/images/icon.png')}
                style={{ width: 210, height: 210 }}
                resizeMode="contain"
            />
            <Text className="-translate-y-8">Nggak harus punya. Pakai dulu.</Text>
            <Button
                onPress={() => router.push('/step')}
                className="bg-[#1e7930] hover:bg-[#1e7930] active:bg-[#1e7930] w-[230px] rounded-2xl"
            >
                <Text>Mulai</Text>
            </Button>
        </View>
    );

    // Jika layar sempit (mobile asli), tampilkan langsung
    if (!isWide) {
        return (
            <>
                <Stack.Screen options={SCREEN_OPTIONS} />
                <View className="h-screen w-full">{content}</View>
            </>
        );
    }

    // Jika layar lebar: bungkus dengan frame device Android
    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS} />
            {/* Latar luar (area di luar device) */}
            <View className="h-screen w-full items-center justify-center bg-neutral-200 py-8">
                {/* Bingkai device */}
                <View
                    style={{
                        width: MOBILE_MAX_WIDTH,
                        height: '100%',
                        maxHeight: 820,
                        borderLeftWidth: FRAME_BORDER,
                        borderRightWidth: FRAME_BORDER,
                        borderTopWidth: FRAME_BORDER,
                        borderBottomWidth: FRAME_BORDER,
                        borderColor: '#1a1a1a',
                        borderRadius: FRAME_RADIUS,
                        overflow: 'hidden',
                        backgroundColor: '#1a1a1a',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.25,
                        shadowRadius: 24,
                        elevation: 12,
                    }}
                >
                    {/* Status bar palsu (opsional, kesan Android) */}
                    <View
                        style={{
                            height: 24,
                            backgroundColor: '#1a1a1a',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: 90,
                                height: 14,
                                borderRadius: 7,
                                backgroundColor: '#000',
                            }}
                        />
                    </View>

                    {/* Konten layar */}
                    <View className="flex-1 overflow-hidden rounded-[10px]">
                        {content}
                    </View>
                </View>
            </View>
        </>
    );
}