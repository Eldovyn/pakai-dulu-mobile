// components/filter-chips.tsx
import * as React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';

export function FilterChips({
    items,
    activeId,
    onSelect,
    contentPadding = 16,
    gap = 8,
    activeColor = '#16783A',
    className = '',
}: FilterChipsProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className={className}
            contentContainerStyle={{ paddingHorizontal: contentPadding, gap }}
        >
            {items.map((item) => {
                const isActive = activeId === item.id;

                return (
                    <Pressable
                        key={item.id}
                        onPress={() => onSelect?.(item)}
                        style={
                            isActive
                                ? { borderColor: activeColor, backgroundColor: `${activeColor}10` }
                                : undefined
                        }
                        className={`rounded-lg border px-3 py-1.5 ${isActive
                            ? 'border-[#16783A] bg-green-50'
                            : 'border-gray-200 bg-white'
                            }`}
                    >
                        <Text
                            className={`text-xs font-medium ${isActive
                                ? 'text-[#16783A]'
                                : 'text-gray-600'
                                }`}
                        >
                            {item.label}
                        </Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}