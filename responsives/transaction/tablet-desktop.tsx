import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { BottomTabBar } from '@/components/home/BottomTabBar';
import { TransactionActionSheet } from '@/components/transactions/ActionSheet';
import TransactionMobile from '@/responsives/transaction/mobile';

const DEVICE_WIDTH = 400;
const FRAME_BORDER = 12;
const FRAME_RADIUS = 36;
const SCREEN_RADIUS = 24;

export default function TransactionResponsive() {
    const router = useRouter();
    const [sheetOpen, setSheetOpen] = useState(false);

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
                            backgroundColor: '#fff7eb',
                        }}
                    >
                        {/* Header dirender di dalam frame, bukan header native */}
                        <View className="h-16 flex-row items-center gap-2 bg-[#fff7eb] px-2 pt-3">
                            <Pressable
                                onPress={() => router.back()}
                                className="h-9 w-9 items-center justify-center"
                                hitSlop={10}
                            >
                                <ChevronLeft size={26} color="#16783A" strokeWidth={2.5} />
                            </Pressable>
                        </View>

                        <View className="flex-1">
                            <TransactionMobile
                                topOffset={0}
                                embedded
                                onActionSheetOpen={() => setSheetOpen(true)}
                            />
                        </View>

                        <BottomTabBar />

                        {/* Menu aksi: overlay di level frame agar header & tab bar ikut gelap */}
                        {sheetOpen && (
                            <View className="absolute bottom-0 left-0 right-0 top-0 z-50">
                                <Pressable
                                    className="flex-1 bg-black/40 justify-end"
                                    onPress={() => setSheetOpen(false)}
                                >
                                    <Pressable onPress={() => { }}>
                                        <TransactionActionSheet
                                            onClose={() => setSheetOpen(false)}
                                            onDokumentasi={() => {
                                                setSheetOpen(false);
                                                router.push('/dokumentasi-barang');
                                            }}
                                            onLapor={() => {
                                                setSheetOpen(false);
                                                router.push('/lapor-barang');
                                            }}
                                        />
                                    </Pressable>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            {/* Sembunyikan header native karena header sudah dirender di dalam frame */}
            <Stack.Screen options={{ headerShown: false }} />
        </>
    );
}
