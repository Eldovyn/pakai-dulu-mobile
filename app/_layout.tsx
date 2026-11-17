import '@/global.css';
import queryClient from '@/lib/queryClient';
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from 'expo-router/react-navigation';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />

        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}