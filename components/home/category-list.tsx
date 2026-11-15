import React from 'react';
import { View, ScrollView, Pressable, Image, ImageSourcePropType } from 'react-native';
import { Text } from '../ui/text';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react-native';

const CATEGORIES: CategoryItem[] = [
    {
        id: 'camping',
        label: 'Camping/\nOutdoor',
        // Sesuaikan path folder assets kamu
        icon: require('@/assets/images/category-1.png'),
    },
    {
        id: 'event',
        label: 'Acara/\nKegiatan',
        icon: require('@/assets/images/category-2.png'),
    },
    {
        id: 'household',
        label: 'Rumah\nTangga',
        icon: require('@/assets/images/category-3.png'),
    },
    {
        id: 'electronics',
        label: 'Elektronik',
        icon: require('@/assets/images/category-4.png'),
    },
];

export function CategoryList({
    onSelectCategory,
}: {
    onSelectCategory?: (id: string) => void;
}) {
    return (
        <View className="w-full bg-[#FFF8F3] -translate-y-20 relative">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4 gap-4 items-start"
            >
                {CATEGORIES.map((item) => (
                    <Pressable
                        key={item.id}
                        onPress={() => onSelectCategory?.(item.id)}
                        className="items-center w-[76px] active:opacity-75"
                    >
                        <View
                            className={cn(
                                'w-[68px] h-[68px] rounded-[22px] bg-[#FF823A]',
                                'items-center justify-center mb-2 shadow-sm'
                            )}
                        >
                            <Image
                                source={item.icon}
                                className="w-11 h-11"
                                resizeMode="contain"
                            />
                        </View>

                        <Text className="text-[12px] font-medium text-zinc-900 text-center leading-4">
                            {item.label}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

            <View className="absolute right-1.5 top-0 h-[68px] justify-center pointer-events-none">
                <ChevronRight size={14} color="#71717a" />
            </View>
        </View>
    );
}