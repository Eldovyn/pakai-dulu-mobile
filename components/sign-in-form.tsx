import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Pressable, type TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import { Separator } from '@/components/ui/separator';
import { SocialConnections } from '@/components/social-connections';

export function SignInForm() {
  const router = useRouter()

  const passwordInputRef = React.useRef<TextInput>(null);

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onSubmit() {
    router.replace("/(main)/home")
  }

  return (
    <View className="gap-2 bg-[#fff7eb] flex flex-col justify-center items-center h-screen">
      <Image
        source={require('@/assets/images/icon-login.png')}
        style={{
          width: 210,
          height: 210,
        }}
        resizeMode="contain"
      />
      <Card className="border-border/0 bg-[#fff7eb] sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-left text-xl sm:text-left">Masuk ke Akunmu</CardTitle>
          <View className='flex flex-row gap-1'>
            <CardDescription className="text-left sm:text-left text-sm">
              Belum punya akun?
            </CardDescription>
            <Text className='text-sm text-[#1e7930]'>Daftar</Text>
          </View>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  size="sm"
                  className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}>
                </Button>
              </View>
              <Input
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={onSubmit}
              />
              <Text className="font-semibold text-right text-[#1e7930] text-sm leading-4">Lupa password?</Text>
            </View>
            <Button onPress={onSubmit}
              className="bg-[#1e7930] mt-5 hover:bg-[#1e7930] active:bg-[#1e7930] w-[250px] rounded-2xl"
            >
              <Text>
                Masuk
              </Text>
            </Button>
          </View>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
