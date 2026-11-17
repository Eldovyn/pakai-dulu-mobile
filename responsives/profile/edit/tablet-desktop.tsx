import { View, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import EditProfileMobile from '@/responsives/profile/edit/mobile';

const DEVICE_WIDTH = 400;
const FRAME_BORDER = 12;
const FRAME_RADIUS = 36;
const SCREEN_RADIUS = 24;

export default function EditProfileResponsive() {
    const router = useRouter();

    return (
        <>
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
                            backgroundColor: '#FFF8EE',
                        }}
                    >
                        {/* Header dirender di dalam frame, bukan header native */}
                        <View className="h-16 flex-row items-center border-b border-[#E5E7EB] bg-[#FFF8EE] px-1 pt-3">
                            <Pressable
                                onPress={() => router.navigate('/(main)/profile')}
                                className="p-2"
                                hitSlop={10}
                            >
                                <ChevronLeft size={24} color="#16783A" strokeWidth={2.5} />
                            </Pressable>

                            <Text className="flex-1 pr-8 text-center text-base font-bold text-[#111827]">
                                Edit Profil
                            </Text>
                        </View>

                        <View className="flex-1">
                            <EditProfileMobile embedded />
                        </View>
                    </View>
                </View>
            </View>

            {/* Sembunyikan header native karena header sudah dirender di dalam frame */}
            <Stack.Screen options={{ headerShown: false }} />
        </>
    );
}
