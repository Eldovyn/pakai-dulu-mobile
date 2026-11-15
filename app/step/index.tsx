
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

const Step1Page = () => {
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
        console.log(isLastSlide)
        setCurrentIndex(slides.length - 1);
    };

    return (
        <View className="bg-[#fff7eb] h-screen flex flex-col justify-center items-center">
            <Image
                source={currentSlide.image}
                className="w-40 h-40 rounded-xl"
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
    );
};

export default Step1Page;
