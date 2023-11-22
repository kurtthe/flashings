import React from 'react';
import CardProfile from "@features/profile/components/CardProfile";
import { Button, Card, Text } from "@ui/components";
import { actions as authActions } from "@store/auth/actions";
import { useAppDispatch } from "@hooks/useStore";

const DataUser = () => {
	const dispatch = useAppDispatch();
	const handleLogout = () => dispatch(authActions.logOut());

	return (
		<>
			<CardProfile />
			<Button mx="m" mb="m" onPress={handleLogout}>
				Logout
			</Button>
			<Card p="s"  alignItems="center" >
				<Text variant="bodySmallRegular" fontSize={13} >Version 1.0.0</Text>
			</Card>
		</>
	)
}
export default DataUser
