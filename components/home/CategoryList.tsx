import { useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Pressable,
    Image,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { Text } from '../ui/text';
import { getCategories } from '@/api/product/product';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export function CategoryList({
    onSelectCategory,
}: CategoryListProps) {
    const scrollViewRef = useRef<ScrollView>(null);
    const [scrollX, setScrollX] = useState(0);

    const {
        data: dataCategories,
        isLoading,
        isError,
        error,
    } = useQuery<CategoryItem[]>({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    console.log(dataCategories)

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        setScrollX(event.nativeEvent.contentOffset.x);
    };

    const scrollRight = () => {
        scrollViewRef.current?.scrollTo({
            x: scrollX + 160,
            animated: true,
        });
    };

    if (isLoading) {
        return <Text>Loading categories...</Text>;
    }

    if (isError) {
        return (
            <Text>
                Gagal memuat kategori: {error.message}
            </Text>
        );
    }

    return (
        <View
            style={{ width: SCREEN_WIDTH }}
            className="relative flex-row items-center overflow-hidden self-center"
        >
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={{
                    width: '100%',
                    flexGrow: 0,
                }}
                contentContainerStyle={{
                    paddingLeft: 16,
                    paddingRight: 44,
                    paddingVertical: 4,
                    gap: 12,
                    alignItems: 'flex-start',
                }}
            >
                {dataCategories?.map((item) => (
                    <Pressable
                        key={item.id}
                        onPress={() => onSelectCategory?.(item.id)}
                        className="items-center w-[72px]"
                    >
                        <View className="w-[60px] h-[60px] rounded-[18px] bg-[#FF823A] items-center justify-center mb-1.5 overflow-hidden">
                            <Image
                                source={{
                                    uri: item.image_url,
                                }}
                                className="w-9 h-9"
                                resizeMode="contain"
                            />
                        </View>

                        <Text
                            numberOfLines={2}
                            className="text-[11px] font-medium text-zinc-900 text-center leading-3.5"
                        >
                            {item.name}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

            <Pressable
                onPress={scrollRight}
                className="absolute right-2 top-[18px] w-7 h-7 rounded-full bg-white/90 items-center justify-center shadow-sm border border-zinc-200"
            >
                <ChevronRight size={18} color="#18181b" />
            </Pressable>
        </View>
    );
}