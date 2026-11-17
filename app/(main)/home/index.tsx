import {
    View,
    Image,
    StatusBar,
    ScrollView,
} from 'react-native';
import {
    Bell,
    MapPin,
    ChevronDown,
    ChevronRight,
} from 'lucide-react-native';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { CategoryList } from '@/components/home/CategoryList';
import { ProductGrid } from '@/components/home/ProductGrid';

export default function HomePage() {
    return (
        <View className="flex-1 bg-[#fff7eb]">

            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />

            <View className="h-24 w-full flex-row justify-between items-center px-5 pt-5">

                <Image
                    source={require('@/assets/images/icon-aja.png')}
                    resizeMode="contain"
                    className="h-16 w-24"
                />

                <View className="bg-[#f1f1f1] p-2 rounded-md">
                    <Bell
                        size={22}
                        color="black"
                    />
                </View>

            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 30,
                }}
            >
                <View className="flex-1">

                    {/* Search */}
                    <Input
                        className="mx-auto h-9 w-[80%] mt-1"
                    />

                    {/* Location */}
                    <View className="flex-row justify-between items-center mx-5">

                        <View className="pt-5 flex-row items-center">

                            <MapPin
                                size={25}
                                color="#199f37"
                            />

                            <View className="flex-col ml-1">

                                <Text className="text-[10px] text-[#7a7373]">
                                    Lokasi Kamu
                                </Text>

                                <Text className="text-[10px] font-bold">
                                    Depok, Jawa Barat
                                </Text>

                            </View>

                        </View>

                        <ChevronDown
                            size={22}
                            color="black"
                            style={{
                                marginTop: 16,
                            }}
                        />

                    </View>

                    {/* Banner */}
                    <View>
                        <Image
                            source={require('@/assets/images/Green Modern Food Delivery Order Mobile Design (10).png')}
                            resizeMode="stretch"
                            style={{
                                width: '90%',
                                height: 150,
                            }}
                            className="mx-auto mb-5 mt-5"
                        />
                    </View>

                    {/* Category */}
                    <CategoryList />

                    {/* Product Grid */}
                    <View className="flex-col mx-5 mt-5">

                        <View className="flex-row justify-between mb-5">

                            <Text className="text-[10px] font-semibold">
                                Pilihan Untuk Kamu
                            </Text>

                            <View className="flex-row items-center">

                                <Text className="text-[10px]">
                                    Lihat Semua
                                </Text>

                                <ChevronRight
                                    size={18}
                                    color="black"
                                />

                            </View>

                        </View>

                        <ProductGrid />

                    </View>

                </View>
            </ScrollView>

        </View>
    );
}
