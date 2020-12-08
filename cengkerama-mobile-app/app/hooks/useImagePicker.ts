import { useState } from "react";
// eslint-disable-next-line react-native/split-platform-components
import { Platform, ToastAndroid } from "react-native";
import ImagePicker, { ImagePickerOptions } from "react-native-image-picker";

import { ImageType } from "../interface";

const options: ImagePickerOptions = {
  title: "Select image",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
  mediaType: "photo",
  // quality: 50,
};

function useImagePicker(): [ImageType | undefined, () => void] {
  const [image, setImage] = useState<ImageType>();

  const openImagePicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravity(
            `Failed: ${response.error}`,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
      } else {
        setImage({
          uri: response.uri,
          fileName: response.fileName as string,
          fileSize: response.fileSize as number,
          type: response.type as string,
        });
      }
    });
  };
  return [image, openImagePicker];
}

export default useImagePicker;
