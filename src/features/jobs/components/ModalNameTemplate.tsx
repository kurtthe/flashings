import React from 'react';
import { Modal } from 'react-native';
import { Box, Button, Input, BaseTouchable } from '@ui/components';
import { TemplateType } from '@models/templates';
import { getRandomInt } from '@shared/utils';
import { actions as templateActions } from '@store/templates/actions';
import alertService from '@services/general-request/alert';
import { useAppDispatch } from '@hooks/useStore';
import { FLASHINGS_DATA } from '@models';
type Props = {
  visible: boolean;
  onClose: () => void;
  data: FLASHINGS_DATA | TemplateType;
};
const ModalNameTemplate: React.FC<Props> = ({ visible, data, onClose }) => {
  const dispatch = useAppDispatch();
  const [nameTemplate, setNameTemplate] = React.useState<string>('');

  React.useEffect(() => {
    if (!data.name) return;
    setNameTemplate(data.name);
  }, [data.name]);

  const handleSaveAsTemplate = () => {
    const dataTemplate: TemplateType = {
      id: getRandomInt(100, 200),
      dataLines: data.dataLines,
      angles: data.angles,
      parallelRight: data.parallelRight,
      name: nameTemplate,
      endType: data.endType,
      startType: data.startType,
      imgPreview: data.imgPreview,
    };

    dispatch(templateActions.addTemplate({ template: dataTemplate }));
    alertService.show('Success!', 'The flashing save as template.');
    onClose();
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <Box
        as={BaseTouchable}
        onPress={() => onClose && onClose()}
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <Box p="m" backgroundColor="white" borderRadius="s">
          <Input
            label="Template name"
            onChangeText={text => setNameTemplate(text)}
            value={nameTemplate}
            style={{ width: 300 }}
            mr="s"
            isRequired
          />
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            py="m">
            <Button variant="delete" onPress={() => onClose()}>
              Cancel
            </Button>
            <Button onPress={handleSaveAsTemplate}>Save</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default ModalNameTemplate;
