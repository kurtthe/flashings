import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';

export type AuthParamsList = {
  [Routes.FORGOT_PASSWORD_EMAIL_SENT]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
  [Routes.LOGIN]: undefined;
  [Routes.HELP_SUPPORT]: undefined;
  [Routes.SUBCONTRACTOR_LOGIN]: undefined;
  [Routes.LEARN_HOW_TO_OPEN]: undefined;
};

export type AuthStackProps = StackNavigationProp<AuthParamsList>;
