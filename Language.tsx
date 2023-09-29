
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { i18n } from '../../../localization';
import { ApiContext } from '../../../stores';
import * as theme from '../../../util/theme';
import * as names from './names.json';

const styles = StyleSheet.create({
	container: {
		borderWidth: 0,
	},
	picker: {
		height: 1000,
		position: 'absolute',
		top: 0,
		width: 1000,
	},
});

export function Language(): React.ReactElement {
	const { reloadApp } = useContext(ApiContext);

	const handleValueChange = (itemValue: string): void => {
		i18n.locale = itemValue;

		// Reload app for changes to take effect
		reloadApp();
	};

	// Using this hack to show custom picker style
	// https://github.com/facebook/react-native/issues/7817#issuecomment-264851951
	return (
		<View style={styles.container}>
			<Text style={theme.link}>
				{names[i18n.locale as keyof typeof names].nativeName}
			</Text>
			<Picker
				itemStyle={theme.text}
				onValueChange={handleValueChange}
				selectedValue={i18n.locale}
				style={styles.picker}
			>
				{Object.keys(i18n.translations).map((lang) => (
					<Picker.Item
						key={lang}
						label={names[lang as keyof typeof names].nativeName}
						value={lang}
					/>
				))}
			</Picker>
		</View>
	);
}
