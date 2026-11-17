import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';


const SCREEN_OPTIONS = {
    title: 'React Native Reusables',
    headerTransparent: true,
};

export default function HomeMobile() {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS} />
            <View className='bg-[#fff7eb] h-screen flex flex-col justify-center items-center w-full'>
                <Image
                    source={require('@/assets/images/icon.png')}
                    style={{
                        width: 210,
                        height: 210,
                    }}
                    resizeMode="contain"
                />
                <Text className='-translate-y-8'>Nggak harus punya. Pakai dulu.</Text>
                <Button onPress={() => router.push('/step')} className='bg-[#1e7930] hover:bg-[#1e7930] active:bg-[#1e7930] w-[230px] rounded-2xl'>
                    <Text>Mulai</Text>
                </Button>
            </View>
        </>
    );
}
