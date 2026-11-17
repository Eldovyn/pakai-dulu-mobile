import * as React from 'react';
import { View, ScrollView, Pressable, StatusBar, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { ChevronLeft, User, AtSign, Mail, Phone, Camera, MapPin, AlignLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

export default function EditProfilPage() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [nama, setNama] = React.useState("Ahmad Syafi'i");
    const [username, setUsername] = React.useState('@ ahmadsyafii');
    const [email, setEmail] = React.useState('ahmadsyafii@email.com');
    const [phone, setPhone] = React.useState('0812-3456-7890');
    const [domisili, setDomisili] = React.useState('Depok, Jawa Barat');
    const [bio, setBio] = React.useState('Pecinta alam dan pengguna aktif layanan sewa barang.');

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF8EE" translucent={false} />

            {/* === HEADER === */}
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitle: 'Edit Profil',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontWeight: 'bold', fontSize: 16, color: '#111827' },
                    headerStyle: { backgroundColor: '#FFF8EE' },
                    headerLeft: () => (
                        <Pressable
                            onPress={() => router.back()}
                            className="p-1 -ml-1"
                            hitSlop={10}
                        >
                            <ChevronLeft size={24} color="#16783A" strokeWidth={2.5} />
                        </Pressable>
                    ),
                }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 bg-[#FFF8EE]"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                >
                    {/* === BAGIAN FOTO PROFIL === */}
                    <View className="items-center mt-6 mb-8">
                        <View className="relative">
                            {/* Avatar Lingkaran */}
                            <View className="w-28 h-28 rounded-full border-2 border-[#16783A] items-center justify-center bg-[#E8F5E9]">
                                <User size={56} color="#16783A" fill="#16783A" className="opacity-80 mt-2" />
                            </View>

                            {/* Tombol Kamera di pojok kanan bawah */}
                            <Pressable
                                className="absolute bottom-0 right-0 bg-[#16783A] w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm"
                                onPress={() => console.log('Ganti Foto')}
                            >
                                <Camera size={16} color="white" />
                            </Pressable>
                        </View>

                        <Pressable className="mt-3" onPress={() => console.log('Ubah Foto')}>
                            <Text className="text-sm font-bold text-[#16783A]">
                                Ubah Foto Profil
                            </Text>
                        </Pressable>
                    </View>

                    {/* === FORM CONTAINER === */}
                    <View className="bg-white rounded-lg ms-2 me-2 px-5 pt-6 pb-8 flex-1 min-h-[400px]">

                        {/* 1. Nama Lengkap */}
                        <View className="mb-4">
                            <Text className="text-xs font-bold text-gray-900 mb-2">
                                Nama Lengkap
                            </Text>
                            <View className="flex-row items-center bg-[#F3F4F6] rounded-xl px-4 h-12 border border-gray-200">
                                <User size={18} color="#6B7280" />
                                <TextInput
                                    value={nama}
                                    onChangeText={setNama}
                                    className="flex-1 ml-3 text-sm text-gray-900"
                                    style={{ outlineStyle: 'none' } as any}
                                    placeholder="Masukkan nama lengkap"
                                />
                            </View>
                        </View>

                        {/* 2. Username */}
                        <View className="mb-4">
                            <Text className="text-xs font-bold text-gray-900 mb-2">
                                Username
                            </Text>
                            <View className="flex-row items-center bg-[#F3F4F6] rounded-xl px-4 h-12 border border-gray-200">
                                <AtSign size={18} color="#6B7280" />
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    className="flex-1 ml-3 text-sm text-gray-900"
                                    style={{ outlineStyle: 'none' } as any}
                                    placeholder="Masukkan username"
                                />
                            </View>
                        </View>

                        {/* 3. Email */}
                        <View className="mb-4">
                            <Text className="text-xs font-bold text-gray-900 mb-2">
                                Email
                            </Text>
                            <View className="flex-row items-center bg-[#F3F4F6] rounded-xl px-4 h-12 border border-gray-200">
                                <Mail size={18} color="#6B7280" />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    className="flex-1 ml-3 text-sm text-gray-900"
                                    style={{ outlineStyle: 'none' } as any}
                                    placeholder="Masukkan email"
                                />
                            </View>
                        </View>

                        {/* 4. Nomor WhatsApp / HP */}
                        <View className="mb-4">
                            <Text className="text-xs font-bold text-gray-900 mb-2">
                                Nomor WhatsApp / HP
                            </Text>
                            <View className="flex-row items-center bg-[#F3F4F6] rounded-xl px-4 h-12 border border-gray-200">
                                <Phone size={18} color="#6B7280" />
                                <TextInput
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    className="flex-1 ml-3 text-sm text-gray-900"
                                    style={{ outlineStyle: 'none' } as any}
                                    placeholder="Masukkan nomor HP"
                                />
                            </View>
                        </View>

                        {/* 5. Domisili */}
                        <View className="mb-4">
                            <Text className="text-xs font-bold text-gray-900 mb-2">
                                Domisili
                            </Text>
                            <View className="flex-row items-center bg-[#F3F4F6] rounded-xl px-4 h-12 border border-gray-200">
                                <MapPin size={18} color="#6B7280" />
                                <TextInput
                                    value={domisili}
                                    onChangeText={setDomisili}
                                    className="flex-1 ml-3 text-sm text-gray-900"
                                    style={{ outlineStyle: 'none' } as any}
                                    placeholder="Kota, Provinsi"
                                />
                            </View>
                        </View>

                        {/* 6. Bio */}
                        <View className="mb-6">
                            <Text className="text-xs font-bold text-gray-900 mb-2">
                                Bio
                            </Text>
                            <View className="flex-row bg-[#F3F4F6] rounded-xl px-4 py-3 h-28 border border-gray-200">
                                <AlignLeft size={18} color="#6B7280" className="mt-0.5" />
                                <TextInput
                                    value={bio}
                                    onChangeText={setBio}
                                    multiline
                                    textAlignVertical="top"
                                    className="flex-1 ml-3 text-sm text-gray-900"
                                    style={{ outlineStyle: 'none' } as any}
                                    placeholder="Ceritakan sedikit tentang Anda..."
                                />
                            </View>
                        </View>

                        <Button
                            className="w-full h-14 bg-[#16783A] active:bg-[#16783A] rounded-full"
                            onPress={() => {
                                console.log('Simpan Perubahan', { nama, username, email, phone, domisili, bio });
                                // Tambahkan logika API atau router.back() di sini
                            }}
                        >
                            <Text className="text-base font-bold text-white">
                                Simpan Perubahan
                            </Text>
                        </Button>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}