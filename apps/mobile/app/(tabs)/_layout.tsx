import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,

      }}>
      <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#FF7A21', // Laranja do design
    headerShown: false,
  }}>
  {/* O 'name' deve ser idêntico ao nome do arquivo .tsx */}
  <Tabs.Screen
    name="feed" 
    options={{ title: 'Home' }}
  />
  <Tabs.Screen
    name="ranking"
    options={{ title: 'Ranking' }}
  />
  <Tabs.Screen
    name="Notifications"
    options={{ title: 'Notificações' }}
  />
  <Tabs.Screen
    name="profile"
    options={{ title: 'Perfil' }}
  />
</Tabs>
    </Tabs>
  );
}
