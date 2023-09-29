


import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { CigarettesBlock, CurrentLocation } from '../../../../../components';
import { ApiContext, CurrentLocationContext } from '../../../../../stores';
import * as theme from '../../../../../util/theme';

const styles = StyleSheet.create({
	cigaretteBlock: {
		marginBottom: theme.spacing.normal,
	},
	container: {
		alignItems: 'center',
		flexDirection: 'column',
		paddingBottom: theme.spacing.big,
		paddingTop: theme.spacing.normal,
		width: 480,
	},
	currentLocation: {
		textAlign: 'center',
	},
});

export function ShareImage(): React.ReactElement {
	const { api } = useContext(ApiContext);
	const { currentLocation } = useContext(CurrentLocationContext);

	if (!currentLocation) {
		throw new Error(
			'ShareScreen/ShareImage/ShareImage.tsx only render when `currentLocation` is defined.'
		);
	} else if (!api) {
		throw new Error(
			'ShareScreen/ShareImage/ShareImage.tsx only render when `api` is defined.'
		);
	}

	return (
		<View style={styles.container}>
			<CigarettesBlock
				cigarettes={api.shootismoke.dailyCigarettes}
				frequency="daily"
				style={styles.cigaretteBlock}
			/>
			<CurrentLocation
				currentLocation={currentLocation}
				measurement={api.pm25}
				numberOfLines={2}
				style={styles.currentLocation}
			/>
		</View>
	);
}
