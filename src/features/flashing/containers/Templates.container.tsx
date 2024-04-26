import React from 'react';
import { FlatList } from 'react-native';
import { useAppSelector } from '@hooks/useStore';
import { templatesList } from '@store/templates/selectors';
import { TemplateType } from '@models/templates';
import CardTemplate from '@features/flashing/components/CardTemplate/CardTemplate';

const TemplatesContainer = () => {
  const templatesData = useAppSelector(state => templatesList(state));

  const _renderItems = ({ item }: { item: TemplateType }) => {
    return <CardTemplate template={item} />;
  };

  return (
    <FlatList
      contentContainerStyle={{
        paddingVertical: 25,
      }}
      data={templatesData}
      keyExtractor={(item, index) => `${index}_template-card-${item.id}`}
      renderItem={_renderItems}
      numColumns={2}
    />
  );
};
export default TemplatesContainer;
