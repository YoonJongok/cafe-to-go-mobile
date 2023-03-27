import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				const fontsToLoad = [Ionicons.font];
				const fontPromises = fontsToLoad.map(async (font) =>
					Font.loadAsync(font)
				);
				const imagesToLoad = [
					"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
				];
				const imagePromises = imagesToLoad.map((image) =>
					Asset.loadAsync(image)
				);

				await Promise.all([...fontPromises, ...imagePromises]);
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return <StatusBar />;
	}

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
			onLayout={onLayoutRootView}
		>
			<Text>SplashScreen Demo! 👋</Text>
			<Entypo name="rocket" size={30} />
		</View>
	);
}
