import React from 'react';
import { Box, Card, Icon, Text } from '@ui/components';
import {
  CompanyIcon,
  MailIcon,
  PhoneIcon,
  ProfileIcon,
  WorldIcon,
} from '@assets/icons';
import { useAppSelector } from '@hooks/useStore';
import { dataUserSelector } from '@store/auth/selectors';
import { isTablet } from '@shared/platform';

type Props = {};

const SIZE_ICON_PHONE_LOCAL = 20;
const SIZE_ICON_TABLET_LOCAL = 22;

const CardProfile: React.FC<Props> = () => {
  const dataUser = useAppSelector(dataUserSelector);

  return (
    <Card>
      <Box my="s" flexDirection="row" alignItems="center">
        <Icon
          as={ProfileIcon}
          color="black"
          size={isTablet ? SIZE_ICON_TABLET_LOCAL : SIZE_ICON_PHONE_LOCAL}
        />
        <Text variant="bodyRegular" mx="s">
          Name: {`${dataUser?.first_name} ${dataUser?.last_name}`}{' '}
        </Text>
      </Box>

      <Box my="xs" flexDirection="row" alignItems="center">
        <Icon
          as={MailIcon}
          color="black"
          size={isTablet ? SIZE_ICON_TABLET_LOCAL : SIZE_ICON_PHONE_LOCAL}
        />
        <Text variant="bodyRegular" mx="s">
          Email: {dataUser?.email}
        </Text>
      </Box>

      <Box my="xs" flexDirection="row" alignItems="center">
        <Icon
          as={PhoneIcon}
          color="black"
          size={isTablet ? SIZE_ICON_TABLET_LOCAL : SIZE_ICON_PHONE_LOCAL}
        />
        <Text variant="bodyRegular" mx="s">
          Phone Number: {dataUser?.phone_number}
        </Text>
      </Box>

      <Box my="xs" flexDirection="row" alignItems="center">
        <Icon
          as={CompanyIcon}
          color="black"
          size={isTablet ? SIZE_ICON_TABLET_LOCAL : SIZE_ICON_PHONE_LOCAL}
        />
        <Text variant="bodyRegular" mx="s">
          Company Name: {dataUser?.company}
        </Text>
      </Box>

      <Box my="xs" flexDirection="row" alignItems="center">
        <Icon
          as={WorldIcon}
          size={isTablet ? SIZE_ICON_TABLET_LOCAL : SIZE_ICON_PHONE_LOCAL}
        />
        <Text variant="bodyRegular" mx="s">
          Time Zone: {dataUser?.time_zone}
        </Text>
      </Box>
    </Card>
  );
};

export default CardProfile;
