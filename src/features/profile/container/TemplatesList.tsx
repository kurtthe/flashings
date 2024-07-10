import React from 'react';
import { useAppSelector } from '@hooks/useStore';
import { allTemplatesList } from '@store/templates/selectors';
import { TemplateType } from '@models/templates';
import CardTemplate from '@features/flashing/components/CardTemplate/CardTemplate';
import { FlatList } from 'react-native';

const TemplatesList = () => {
  const templatesData = useAppSelector(state => allTemplatesList(state));

  const _renderItems = ({ item }: { item: TemplateType }) => {
    return <CardTemplate template={item} showActions />;
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

export default TemplatesList;
