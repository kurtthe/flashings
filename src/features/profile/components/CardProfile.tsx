import React from 'react';
import { Box, Card, Icon, Text } from "@ui/components";
import { CompanyIcon, MailIcon, PhoneIcon, ProfileIcon, WorldIcon } from "@assets/icons";

type Props = {
}

const CardProfile: React.FC<Props> = ()=> {
	return (
		<Card>
			<Box my="s" flexDirection="row" alignItems="center">
				<Icon as={ProfileIcon} color="black" size={20} />
				<Text variant="bodyRegular" mx="s">Name: </Text>
			</Box>

			<Box my="xs" flexDirection="row" alignItems="center">
				<Icon as={MailIcon} color="black" size={20} />
				<Text variant="bodyRegular" mx="s">Email: </Text>
			</Box>

			<Box my="xs" flexDirection="row" alignItems="center">
				<Icon as={PhoneIcon} color="black" size={22} />
				<Text variant="bodyRegular" mx="s">Phone Number: </Text>
			</Box>

			<Box my="xs" flexDirection="row" alignItems="center">
				<Icon as={CompanyIcon} color="black" size={20} />
				<Text variant="bodyRegular" mx="s">Company Name: </Text>
			</Box>

			<Box my="xs" flexDirection="row" alignItems="center">
				<Icon as={WorldIcon} size={20} />
				<Text variant="bodyRegular" mx="s">Time Zone: </Text>
			</Box>

		</Card>
	)
}

export default  CardProfile
