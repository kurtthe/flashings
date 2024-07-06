import React from 'react';
import { FieldInput } from '@components/forms';
import { useFormikContext } from 'formik';
import { CreateEditFormValues } from '@features/jobs/containers/types';
import { Box, Button, Divider, Text } from '@ui/components';
import { formKeys, forms } from '@features/jobs/constants';
import { formatPhone } from '@shared/helpers';
import { useAppDispatch } from '@hooks/useStore';
import { actions } from '@store/jobs/actions';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { JobStackProps } from '@features/jobs/navigation/Stack.types';
import { Routes } from '@features/jobs/navigation/routes';
import { validatePhone } from '@features/jobs/constants/jobs';

type Props = {
  labelButton: string;
  jobId?: number;
};
const CreateEditJobFormComponent: React.FC<Props> = ({
  labelButton,
  jobId,
}) => {
  const { isValid, handleSubmit, setFieldValue } =
    useFormikContext<CreateEditFormValues>();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<JobStackProps>();

  const handleEndEditing = (text: string) => {
    if (!text) return;
    const value = text;
    const numberInternational = value.includes('+');
    const isValidPhoneNumber = validatePhone(
      value,
      !numberInternational ? 'NATIONAL' : 'INTERNATIONAL',
    );

    if (isValidPhoneNumber) {
      const numberInternational = value.includes('+');
      const phoneNumber = formatPhone(value, {
        format: numberInternational ? 'INTERNATIONAL' : 'NATIONAL',
      });
      setFieldValue(formKeys.createEditJob.contactNumber, phoneNumber).catch(
        () => console.log('error'),
      );
    }
  };

  const alertDelete = () =>
    Alert.alert('Are you sure delete this job?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          if (!jobId) return;
          dispatch(actions.deleteJob({ idJob: jobId }));
          navigation.navigate(Routes.ALL_JOBS);
        },
      },
    ]);

  return (
    <>
      <Box>
        <Text variant="subheadSmallBold">Job Details</Text>
        <FieldInput
          isRequired
          name={formKeys.createEditJob.jobName}
          placeholder={
            forms.createEditJob.placeholders[formKeys.createEditJob.jobName]
          }
          label={forms.createEditJob.labels[formKeys.createEditJob.jobName]}
          returnKeyType="next"
          mt="m"
        />
        <FieldInput
          name={formKeys.createEditJob.jobNumber}
          placeholder={
            forms.createEditJob.placeholders[formKeys.createEditJob.jobNumber]
          }
          label={forms.createEditJob.labels[formKeys.createEditJob.jobNumber]}
          returnKeyType="next"
          mt="m"
        />
        <FieldInput
          name={formKeys.createEditJob.siteAddress}
          placeholder={
            forms.createEditJob.placeholders[formKeys.createEditJob.siteAddress]
          }
          label={forms.createEditJob.labels[formKeys.createEditJob.siteAddress]}
          returnKeyType="next"
          mt="m"
        />
      </Box>
      <Divider my="l" />
      <Text variant="subheadSmallBold">Contact Details</Text>
      <FieldInput
        isRequired
        name={formKeys.createEditJob.contactName}
        placeholder={
          forms.createEditJob.placeholders[formKeys.createEditJob.contactName]
        }
        label={forms.createEditJob.labels[formKeys.createEditJob.contactName]}
        returnKeyType="next"
        mt="m"
      />
      <FieldInput
        isRequired
        name={formKeys.createEditJob.contactNumber}
        placeholder={
          forms.createEditJob.placeholders[formKeys.createEditJob.contactNumber]
        }
        label={forms.createEditJob.labels[formKeys.createEditJob.contactNumber]}
        returnKeyType="next"
        keyboardType="phone-pad"
        inputMode="tel"
        textContentType="telephoneNumber"
        mt="m"
        onEndEditing={e => handleEndEditing(e.nativeEvent.text)}
      />
      <FieldInput
        isRequired
        name={formKeys.createEditJob.contactEmail}
        placeholder={
          forms.createEditJob.placeholders[formKeys.createEditJob.contactEmail]
        }
        label={forms.createEditJob.labels[formKeys.createEditJob.contactEmail]}
        returnKeyType="next"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCompleteType="email"
        mt="m"
      />
      {jobId && (
        <Button variant="delete" mt="l" onPress={alertDelete}>
          Delete
        </Button>
      )}
      <Button
        mt="s"
        mb="xl"
        isDisabled={!isValid}
        onPress={handleSubmit.bind(null, undefined)}>
        {labelButton}
      </Button>
    </>
  );
};

export default CreateEditJobFormComponent;
