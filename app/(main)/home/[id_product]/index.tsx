import {
    View,
    Image,
    Pressable,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import Markdown from 'react-native-markdown-display';
import {
    Heart,
    MapPin,
    ChevronLeft,
} from 'lucide-react-native';
import { getProduct } from '@/api/product/product';

const ProductPage = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const { id_product } = useLocalSearchParams<{
        id_product: string;
    }>();

    const handleCustomBack = () => {
        router.replace('/(main)/home');
    };

    const {
        data: dataProduct,
        isLoading: dataProductIsLoading,
    } = useQuery({
        queryKey: ['product', id_product],
        queryFn: () => getProduct(id_product),
        enabled: !!id_product,
    });

    return (
        <View className="flex-1 bg-white">

            <StatusBar
                translucent={false}
                backgroundColor="#ffffff"
                barStyle="dark-content"
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            {!dataProductIsLoading && dataProduct && (
                <>

                    {/* Product Image + Header */}
                    <View
                        className="w-full relative"
                        style={{
                            height: 192 + insets.top,
                        }}
                    >

                        <Image
                            source={{
                                uri: dataProduct.image_url,
                            }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />

                        {/* Back Button */}
                        <TouchableOpacity
                            onPress={handleCustomBack}
                            className="absolute left-3 p-2 rounded-full bg-white/80"
                            style={{
                                top: insets.top + 12,
                            }}
                        >
                            <ChevronLeft size={22} color="black" />
                        </TouchableOpacity>

                    </View>

                    {/* Product Content */}
                    <View className="flex-1 bg-[#fff7eb] px-3">

                        {/* Product Name */}
                        <View className="flex-row justify-between pt-2 h-10 items-center">

                            <Text
                                className="text-lg font-bold flex-1 mr-2"
                                numberOfLines={1}
                            >
                                {dataProduct.name}
                            </Text>

                            <Pressable
                                onPress={() => console.log('Favorite', dataProduct.id)}
                                className="bg-[#dfdfdf] rounded-full p-1.5"
                            >
                                <Heart size={15} color="black" />
                            </Pressable>

                        </View>

                        {/* Rating & Location */}
                        <View className="flex-row pt-2 justify-between items-center">

                            <View className="flex-row items-center">
                                <Text className="text-xs">
                                    ⭐ {dataProduct.rate}
                                </Text>

                                <Text className="text-xs text-muted-foreground ml-1">
                                    ({dataProduct.total_rate} ulasan)
                                </Text>
                            </View>

                            <View className="flex-row items-center gap-1">
                                <MapPin size={14} color="#199f37" />

                                <Text className="text-[10px] font-bold">
                                    Depok, Jawa Barat
                                </Text>
                            </View>

                        </View>

                        {/* Price */}
                        <Text className="text-sm pt-2 font-bold">
                            Rp. {dataProduct.price}
                        </Text>

                        {/* Status */}
                        <View className="flex-row gap-2 pt-2 pb-2">

                            <Button className="h-auto min-h-0 px-2 py-[5px] bg-[#b1edb5] active:bg-[#b1edb5] hover:bg-[#b1edb5] border border-[#1b9e36]">
                                <Text className="text-black text-xs">
                                    Tersedia
                                </Text>
                            </Button>

                            <Button className="h-auto min-h-0 px-2 py-[5px] bg-[#bbe5f9] hover:bg-[#bbe5f9] active:bg-[#bbe5f9] border border-[#0cc0df]">
                                <Text className="text-black text-xs">
                                    Deposit {dataProduct.price}
                                </Text>
                            </Button>

                        </View>

                        <View className="flex-1 w-full mt-2 bg-[#f1f1f1] rounded-xl">
                            <ScrollView
                                className="flex-1"
                                showsVerticalScrollIndicator={true}
                                contentContainerStyle={{
                                    padding: 8,
                                    paddingBottom: 20,
                                }}
                            >
                                <Text className="text-xs font-bold">
                                    Deskripsi
                                </Text>

                                <Text className="text-xs">
                                    {dataProduct.description}
                                </Text>

                                <Text className="text-xs font-bold mt-1">
                                    Detail Barang
                                </Text>

                                <Text className="text-xs">
                                    Kategori: {dataProduct.detail.category}
                                </Text>

                                <Text className="text-xs">
                                    Merk: {dataProduct.detail.merek}
                                </Text>

                                <Text className="text-xs">
                                    Kondisi: {dataProduct.detail.kondisi}
                                </Text>

                                <Text className="text-xs">
                                    Kelengkapan: {dataProduct.detail.kelengkapan}
                                </Text>

                                <Text className="text-xs font-bold mt-1">
                                    Spesifikasi
                                </Text>

                                <Markdown
                                    style={{
                                        body: {
                                            fontSize: 12,
                                            color: '#333333',
                                        },
                                    }}
                                >
                                    {dataProduct.specification}
                                </Markdown>
                            </ScrollView>
                        </View>

                        {/* Bottom Actions */}
                        <View
                            className="flex-row gap-3 mx-auto w-full justify-center px-2 mb-2 pt-2"
                            style={{
                                paddingBottom: Math.max(insets.bottom, 8),
                            }}
                        >
                            <Button onPress={() => {
                                router.replace(
                                    `/chat/${dataProduct.id}`
                                );
                            }} className="w-[45%] bg-[#ffa672] hover:bg-[#ffa672] active:bg-[#ffa672] border border-[#ff6c26]">
                                <Text>Chat</Text>
                            </Button>

                            <Button
                                onPress={() => {
                                    router.replace(
                                        `/(main)/home/${dataProduct.id}/sewa`
                                    );
                                }}
                                className="w-[55%] border-[#1a8630] bg-[#1a8630] hover:bg-[#1a8630] active:bg-[#1a8630]"
                            >
                                <Text>Sewa Sekarang</Text>
                            </Button>

                        </View>

                    </View>

                </>
            )}

        </View>
    );
};

export default ProductPage;
