import * as React from 'react';
import { View, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { ChevronLeft, Send } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

type Message = {
    id: string;
    text: string;
    time: string;
    isMe: boolean;
};

const SELLER = {
    name: 'Fitriany Wirayuda',
    isOnline: true,
    role: 'Pemilik Barang',
    avatarInitial: 'F',
};

const PRODUCT = {
    name: 'Kamera DSLR Canon EOS 2000D',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200',
    price: 'Rp. 150.000',
    duration: 'hari',
    status: 'Sewa',
};

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        text: 'Halo! Terima kasih sudah tertarik dengan Kamera DSLR Canon EOS 2000D.',
        time: '10:02',
        isMe: false,
    },
    {
        id: '2',
        text: 'Barangnya ready dan sudah dicek dalam kondisi baik ya kak.',
        time: '10:03',
        isMe: false,
    },
];

export default function ChatPage() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);
    const [inputText, setInputText] = React.useState('');

    const handleSend = () => {
        if (!inputText.trim()) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        };
        setMessages((prev) => [...prev, newMessage]);
        setInputText('');
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff7eb" translucent={false} />

            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitleAlign: 'left',
                    headerStyle: {
                        backgroundColor: '#fff7eb',
                    },
                    headerTitle: () => (
                        <View className="flex-row items-center">
                            <View className="h-9 w-9 items-center justify-center rounded-full bg-[#16783A] mr-2.5">
                                <Text className="text-base font-bold text-white">
                                    {SELLER.avatarInitial}
                                </Text>
                            </View>
                            <View className="flex-col justify-center flex-1">
                                <Text
                                    className="text-sm font-bold text-gray-900"
                                    numberOfLines={1}
                                >
                                    {SELLER.name}
                                </Text>
                                <Text
                                    className="text-[11px] text-[#16783A] mt-0.5"
                                    numberOfLines={1}
                                >
                                    {SELLER.isOnline ? 'Online' : 'Offline'} • {SELLER.role}
                                </Text>
                            </View>
                        </View>
                    ),
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.replace('/(main)/home')}
                            className="p-2 -ml-2"
                            hitSlop={10}
                        >
                            <ChevronLeft size={26} color="#000" strokeWidth={2.5} />
                        </Pressable>
                    ),
                }}
            />

            <KeyboardAvoidingView
                className="flex-1 bg-[#fff7eb]"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View className="bg-white p-4 border-b border-gray-100">
                    <View className="flex-row items-center gap-3">
                        <Image
                            source={{ uri: PRODUCT.image }}
                            style={{ width: 56, height: 56 }}
                            className="rounded-lg"
                            resizeMode="cover"
                        />
                        <View className="flex-1">
                            <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
                                {PRODUCT.name}
                            </Text>
                            <Text className="text-sm font-bold text-[#16783A] mt-0.5">
                                {PRODUCT.price}
                                <Text className="text-xs font-normal text-gray-500">/{PRODUCT.duration}</Text>
                            </Text>
                        </View>
                        <View className="rounded-full bg-[#16783A] px-3 py-1">
                            <Text className="text-xs font-medium text-white">
                                {PRODUCT.status}
                            </Text>
                        </View>
                    </View>
                </View>

                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map((msg) => (
                        <View
                            key={msg.id}
                            className={`mb-4 max-w-[80%] ${msg.isMe ? 'self-end items-end' : 'self-start items-start'
                                }`}
                        >
                            <View
                                className={`rounded-2xl px-4 py-3 ${msg.isMe
                                    ? 'bg-[#16783A] rounded-tr-sm'
                                    : 'bg-white border border-gray-100 rounded-tl-sm'
                                    }`}
                            >
                                <Text
                                    className={`text-sm leading-5 ${msg.isMe ? 'text-white' : 'text-gray-800'
                                        }`}
                                >
                                    {msg.text}
                                </Text>
                            </View>
                            <Text className="mt-1 text-[10px] text-gray-400 px-1">
                                {msg.time}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                <View
                    className="bg-[#fff7eb] px-4 pt-2"
                    style={{ paddingBottom: Math.max(insets.bottom, 12) }}
                >
                    <View className="flex-row items-center gap-2">
                        <View className="flex-1 flex-row items-center rounded-full bg-white border border-gray-200 px-4 h-12">
                            <TextInput
                                value={inputText}
                                onChangeText={setInputText}
                                placeholder="Tulis pesan..."
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 text-sm text-gray-900"
                                onSubmitEditing={handleSend}
                                returnKeyType="send"
                                multiline
                            />
                        </View>
                        <Pressable
                            onPress={handleSend}
                            className={`h-12 w-12 items-center justify-center rounded-full ${inputText.trim() ? 'bg-[#16783A]' : 'bg-[#16783A]/50'
                                }`}
                        >
                            <Send size={20} color="white" />
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}