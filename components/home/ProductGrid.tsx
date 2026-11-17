import {
    View,
    FlatList,
    Pressable,
    Image,
} from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { getProducts } from '@/api/product/product';
import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function ProductGrid() {
    const router = useRouter();

    const {
        data: dataProducts,
        isLoading: dataProductsIsLoading,
        isError: dataProductsIsError,
        error: dataProductsError,
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    if (dataProductsIsLoading) {
        return <Text>Memuat produk...</Text>;
    }

    if (dataProductsIsError) {
        return <Text>Gagal memuat produk: {dataProductsError.message}</Text>;
    }

    return (
        <FlatList
            data={dataProducts ?? []}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ gap: 12 }}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => (
                <Pressable
                    className="flex-1"
                    onPress={() => {
                        router.replace(`/(main)/home/${item.id}`)
                    }}
                >
                    <Card className="border-0 bg-[#fff7eb] overflow-hidden p-0 m-0">
                        <View className="relative">
                            <Image
                                source={{ uri: item.image_url }}
                                className="w-full h-36 rounded-lg"
                                resizeMode="cover"
                            />

                            <Pressable
                                onPress={() => console.log('Favorite', item.id)}
                                className="absolute top-2 right-2 bg-[#dfdfdf] rounded-full p-2"
                            >
                                <Heart size={18} color="black" />
                            </Pressable>
                        </View>

                        <CardContent className="ps-0 -mt-2 bg-[#fff7eb]">
                            <Text className="font-bold text-sm">
                                {item.name}
                            </Text>

                            <View className="flex-row items-center mt-2">
                                <Text className="text-xs">
                                    ⭐ {item.rate}
                                </Text>

                                <Text className="text-xs text-muted-foreground ml-1">
                                    ({item.total_rate} ulasan)
                                </Text>
                            </View>

                            <View className='flex flex-row mt-1 gap-2'>
                                <Text className="text-sm font-semibold text-green-700">
                                    Rp {item.price}
                                </Text>
                                <Text className="text-sm font-normal text-black">
                                    {item.km}
                                </Text>
                            </View>
                        </CardContent>
                    </Card>
                </Pressable>
            )}
        />
    );
}
