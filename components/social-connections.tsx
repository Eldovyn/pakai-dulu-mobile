import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useColorScheme } from 'nativewind';
import { Image, Platform, View } from 'react-native';
import { Text } from './ui/text';

const SOCIAL_CONNECTION_STRATEGIES = [
  {
    type: 'oauth_apple',
    label: 'Apple',
    source: { uri: 'https://img.clerk.com/static/apple.png?width=160' },
    useTint: true,
  },
  {
    type: 'oauth_google',
    label: 'Google',
    source: { uri: 'https://img.clerk.com/static/google.png?width=160' },
    useTint: false,
  },
];

export function SocialConnections() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-row gap-3 w-full">
      {SOCIAL_CONNECTION_STRATEGIES.map((strategy) => (
        <Button
          key={strategy.type}
          variant="outline"
          size="sm"
          className="flex-1 flex-row gap-2"
          onPress={() => { }}
        >
          <Image
            className={cn(
              'size-4',
              strategy.useTint && Platform.select({ web: 'dark:invert' })
            )}
            source={strategy.source}
          />

          <Text>{strategy.label}</Text>
        </Button>
      ))}
    </View>
  );
}
