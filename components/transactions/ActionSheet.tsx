import { Pressable, View } from 'react-native';
import { AlertTriangle, Camera, X } from 'lucide-react-native';
import { Text } from '@/components/ui/text';

type TransactionActionSheetProps = {
    onClose: () => void;
    onDokumentasi: () => void;
    onLapor: () => void;
    bottomInset?: number;
};

export function TransactionActionSheet({
    onClose,
    onDokumentasi,
    onLapor,
    bottomInset = 24,
}: TransactionActionSheetProps) {
    return (
        <View
            className="bg-white rounded-t-3xl p-6"
            style={{ paddingBottom: Math.max(bottomInset, 24) }}
        >
            <View className="flex-row items-center justify-between mb-6">
                <Text className="text-lg font-bold text-gray-900">Pilih Aksi</Text>
                <Pressable onPress={onClose} className="p-2 -mr-2">
                    <X size={24} color="#6B7280" />
                </Pressable>
            </View>

            <Pressable
                onPress={onDokumentasi}
                className="flex-row items-center gap-4 p-4 mb-3 rounded-2xl bg-gray-50 border border-gray-100 active:bg-gray-100"
            >
                <View className="h-10 w-10 rounded-full bg-[#16783A]/10 items-center justify-center">
                    <Camera size={20} color="#16783A" />
                </View>
                <View className="flex-1">
                    <Text className="text-base font-bold text-gray-900">Dokumentasi Barang</Text>
                    <Text className="text-xs text-gray-500 mt-0.5">Unggah foto kondisi barang</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={onLapor}
                className="flex-row items-center gap-4 p-4 rounded-2xl bg-red-50 border border-red-100 active:bg-red-100"
            >
                <View className="h-10 w-10 rounded-full bg-red-100 items-center justify-center">
                    <AlertTriangle size={20} color="#DC2626" />
                </View>
                <View className="flex-1">
                    <Text className="text-base font-bold text-red-700">Lapor Barang Bermasalah</Text>
                    <Text className="text-xs text-red-500 mt-0.5">Laporkan jika ada kerusakan</Text>
                </View>
            </Pressable>
        </View>
    );
}
