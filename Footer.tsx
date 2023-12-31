

import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { isStationTooFar } from '@shootismoke/ui';

import { Button, CircleButton } from '../../../components';
import { t } from '../../../localization';
import { ApiContext, CurrentLocationContext } from '../../../stores';
import { track } from '../../../util/amplitude';
import * as theme from '../../../util/theme';
import { aboutSections } from '../../About';
import { RootStackParams } from '../../routeParams';
import { SelectNotifications } from './SelectNotifications';
import { ShareButton } from './ShareButton';

interface FooterProps extends ViewProps {
	navigation: StackNavigationProp<RootStackParams, 'Home'>;
}

const styles = StyleSheet.create({
	secondLine: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: theme.spacing.small,
	},
	share: {
		marginRight: theme.spacing.small,
	},
});

export function Footer(props: FooterProps): React.ReactElement {
	const { api } = useContext(ApiContext);
	const { currentLocation } = useContext(CurrentLocationContext);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { navigation, style, ...rest } = props;

	if (!currentLocation) {
		throw new Error(
			'Home/Footer/Footer.tsx only gets calculate the `distanceToStation` when `currentLocation` is defined.'
		);
	} else if (!api) {
		throw new Error(
			'Home/Footer/Footer.tsx only gets calculate the `distanceToStation` when `api` is defined.'
		);
	}

	const isTooFar = isStationTooFar(currentLocation, api.pm25);

	function goToAbout(): void {
		track('HOME_SCREEN_ABOUT_CLICK');
		navigation.navigate('About');
	}

	function goToAboutWhySoFar(): void {
		track('HOME_SCREEN_ABOUT_WHY_SO_FAR_CLICK');
		navigation.navigate('About', {
			scrollInto: aboutSections.aboutWhyIsTheStationSoFarTitle,
		});
	}

	function goToDetails(): void {
		track('HOME_SCREEN_DETAILS_CLICK');
		navigation.navigate('Details');
	}

	function renderBigButton(): React.ReactElement {
		return isTooFar ? (
			<Button onPress={goToAboutWhySoFar}>
				{t('home_btn_why_is_station_so_far').toUpperCase()}
			</Button>
		) : (
			<Button onPress={goToDetails}>
				{t('home_btn_see_detailed_info').toUpperCase()}
			</Button>
		);
	}

	function renderSmallButtons(): React.ReactElement {
		return (
			<>
				<ShareButton style={styles.share} />
				{isTooFar ? (
					<CircleButton onPress={goToDetails} text="DET" />
				) : (
					<CircleButton onPress={goToAbout} text="FAQ" />
				)}
			</>
		);
	}

	return (
		<View style={[theme.withPadding, style]} {...rest}>
			{renderBigButton()}
			<View style={styles.secondLine}>
				<SelectNotifications />
				<View style={{ flexGrow: 1 }} />
				{renderSmallButtons()}
			</View>
		</View>
	);
}
