import { useState } from "react";
import { View, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";

const slides = [
    {
        title: "Akses Barang\nTanpa Harus Membeli",
        description:
            "Temukan dan sewa barang yang kamu butuhkan, kapan saja dan di mana saja.",
        image: require("@/assets/images/step-1.png"),
    },
    {
        title: "Sewakan Barang\nJarang Terpakai",
        description:
            "Ubah barang yang jarang dipakai menjadi penghasilan tambahan. Daftarkan barangmu, atur harga, dan terima penyewa terverifikasi.",
        image: require("@/assets/images/step-2.png"),
    },
    {
        title: "Aman & Terpercaya",
        description:
            "Verifikasi identitas, sistem deposit dan dokumentasi barang untuk transaksi yang lebih aman.",
        image: require("@/assets/images/step-3.png"),
    },
    {
        title: "Bersama untuk Masa\nDepan yang Lebih Hijau",
        description:
            "Manfaatkan barang yang ada, kurangi pembelian baru, perpanjang masa guna aset.",
        image: require("@/assets/images/step-4.png"),
    },
];

const DEVICE_WIDTH = 400;
const FRAME_BORDER = 12;
const FRAME_RADIUS = 36;
const SCREEN_RADIUS = 24;

export default function StepResponsive() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentSlide = slides[currentIndex];
    const isLastSlide = currentIndex === slides.length - 1;

    const handleNext = () => {
        if (isLastSlide) {
            router.push("/(auth)/login");
            return;
        }

        setCurrentIndex((prev) => prev + 1);
    };

    const handleSkip = () => {
        setCurrentIndex(slides.length - 1);
    };

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
                        backgroundColor: '#fff7eb',
                    }}
                >
                    <View className="bg-[#fff7eb] h-full flex flex-col justify-center items-center w-full">
                        <Image
                            source={currentSlide.image}
                            resizeMode="cover"
                        />

                        <Text className="pt-10 font-bold text-center">
                            {currentSlide.title}
                        </Text>

                        <Text className="pt-5 text-center ms-5 me-5">
                            {currentSlide.description}
                        </Text>

                        <View className="flex-row gap-3 pt-5">
                            {slides.map((_, index) => (
                                <View
                                    key={index}
                                    className={`w-2 h-2 rounded-full ${currentIndex === index
                                        ? "bg-[#1a8630]"
                                        : "bg-[#dfdfdf]"
                                        }`}
                                />
                            ))}
                        </View>

                        <Button
                            onPress={handleNext}
                            className="bg-[#1e7930] mt-5 hover:bg-[#1e7930] active:bg-[#1e7930] w-[230px] rounded-2xl"
                        >
                            <Text>
                                {isLastSlide ? "Mulai" : "Lanjut"}
                            </Text>
                        </Button>

                        {!isLastSlide && (
                            <Text
                                onPress={handleSkip}
                                className="text-sm font-semibold text-[#1e7930] mt-5"
                            >
                                Lewati
                            </Text>
                        )}

                    </View>
                </View>
            </View>
        </View>
    );
}
