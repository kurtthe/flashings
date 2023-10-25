import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import { ProfileParamsList } from "@features/profile/navigation/Stack.types";
import ProfileScreen from "@features/profile/screens/Profile";
import { HeaderBackButton, HeaderBox, Icon } from "@ui/components";
import { CartIcon } from "@assets/icons";


const Stack = () => {
	const { Navigator, Screen } = createStackNavigator<ProfileParamsList>();

	return (
		<Navigator initialRouteName={Routes.PROFILE}>
			<Screen
				name={Routes.PROFILE}
				component={ProfileScreen}
				options={{
					header: () => <HeaderBox
						leftIcon={<HeaderBackButton />}
						rightIcon={<Icon as={CartIcon} color="grayIcon" />}
						title="Your Profile"
					/>,
				}}
			/>
		</Navigator>
	);
};
export default Stack;
