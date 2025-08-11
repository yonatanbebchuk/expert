import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen name="index" options={{ title: 'Game' }} />
			<Tabs.Screen name="settings" options={{ title: 'Settings' }} />
		</Tabs>
	);
}

