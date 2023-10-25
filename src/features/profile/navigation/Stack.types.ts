import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';

export type ProfileParamsList = {
	[Routes.PROFILE]: undefined;
};

export type ProfileStackProps = StackNavigationProp<ProfileParamsList>;
