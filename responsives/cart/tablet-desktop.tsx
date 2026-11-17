import { View, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '@/components/ui/text';
import { BottomTabBar } from '@/components/home/BottomTabBar';
import CartMobile from '@/responsives/cart/mobile';

const DEVICE_WIDTH = 400;
const FRAME_BORDER = 12;
const FRAME_RADIUS = 36;
const SCREEN_RADIUS = 24;

export default function CartResponsive() {
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
                        <View className="h-16 flex-row items-center justify-between bg-[#FFF8EE] px-4 pt-3">
                            <View>
                                <Text className="text-lg font-bold text-gray-900">
                                    Keranjang Sewa
                                </Text>
                                <Text className="text-xs text-gray-500 font-normal mt-0.5">
                                    Rencana paket & gabungan barang sewa
                                </Text>
                            </View>

                            <Pressable hitSlop={10} onPress={() => console.log('Hapus Semua')}>
                                <Text className="text-sm font-bold text-red-500">
                                    Hapus Semua
                                </Text>
                            </Pressable>
                        </View>

                        <View className="flex-1">
                            <CartMobile embedded />
                        </View>

                        <BottomTabBar />
                    </View>
                </View>
            </View>

            {/* Sembunyikan header native karena header sudah dirender di dalam frame */}
            <Stack.Screen options={{ headerShown: false }} />
        </>
    );
}
