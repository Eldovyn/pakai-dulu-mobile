import { View, Image, StatusBar, ImageBackground } from 'react-native';
import { IoNotificationsOutline } from "react-icons/io5";
import { Input } from '@/components/ui/input';
import { IoLocationSharp } from "react-icons/io5";
import { Text } from '@/components/ui/text';
import { MdKeyboardArrowDown } from "react-icons/md";
import { CategoryList } from '@/components/home/category-list';

export default function LoginScreen() {
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
                <View className='bg-[#f1f1f1] p-2 rounded-md'>
                    <IoNotificationsOutline className='text-black' />
                </View>
            </View>

            <View className="flex-1">
                <Input className='mx-auto h-9 w-[80%]'></Input>
                <View className='flex flex-row justify-between items-center ms-5 me-5'>
                    <View className='pt-5 flex flex-row items-center'>
                        <IoLocationSharp className='text-[#199f37] text-[25px]' />
                        <View className='flex flex-col'>
                            <Text className='text-[10px] text[#7a7373]'>Lokasi Kamu</Text>
                            <Text className='text-[10px] font-bold'>Depok, Jawab Barat</Text>
                        </View>
                    </View>
                    <MdKeyboardArrowDown className='translate-y-4' />
                </View>
                <View className="w-full items-center justify-center pt-5">
                    <ImageBackground
                        source={require('@/assets/images/Green Modern Food Delivery Order Mobile Design (10).png')}
                        resizeMode="contain"
                        className="h-64 w-[90%] items-center justify-center"
                    >
                        <Text className="text-2xl font-bold text-white">
                            Kelola Limbah
                        </Text>

                        <Text className="text-sm text-white">
                            Solusi pengelolaan limbah modern
                        </Text>
                    </ImageBackground>
                </View>
                <CategoryList />
            </View>
        </View>
    );
}
