import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';

const SCREEN_OPTIONS = {
    title: 'React Native Reusables',
    headerTransparent: true,
};

const DEVICE_WIDTH = 400;
const FRAME_BORDER = 12;
const FRAME_RADIUS = 36;
const SCREEN_RADIUS = 24;

export default function HomeResponsive() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS} />
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
                            backgroundColor: '#fff7eb',
                        }}
                    >
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
                    </View>
                </View>
            </View>
        </>
    );
}