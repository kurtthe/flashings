import React from 'react';
import Pdf from 'react-native-pdf';
import { Button, Icon, IconButton } from '@ui/components';
import Share from 'react-native-share';
import { ShareIcon } from '@assets/icons';
import { isAndroid, isTablet } from '@shared/platform';
import { SIZE_ICON_PHONE, SIZE_ICON_TABLET } from '@theme';

type Props = {
  urlIdPdf: string;
  namePdf: string;
  shareSmall?: boolean;
  height?: any;
};
const PDFShared: React.FC<Props> = ({
  namePdf,
  urlIdPdf,
  shareSmall,
  height = 500,
}) => {
  const [urlPdfLocal, setUrlPdfLocal] = React.useState<string>();

  const handleShare = () => {
    Share.open({
      title: 'Share PDF flashing',
      url: isAndroid ? urlIdPdf : urlPdfLocal,
      type: 'pdf',
      filename: `${namePdf}.pdf`,
      showAppsToView: true,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <>
      {shareSmall && (
        <IconButton
          style={{ marginBottom: 20 }}
          onPress={handleShare}
          icon={
            <Icon
              as={ShareIcon}
              color="black"
              size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
            />
          }
        />
      )}
      <Pdf
        trustAllCerts={false}
        scale={1.7}
        minScale={1}
        maxScale={3}
        source={{
          uri: urlIdPdf,
          cache: true,
        }}
        style={{
          height: height,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
          setUrlPdfLocal(filePath);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
      />
      {!shareSmall && (
        <Button
          variant="outlineWhite"
          onPress={handleShare}
          borderRadius="unset">
          Share
        </Button>
      )}
    </>
  );
};

export default PDFShared;
