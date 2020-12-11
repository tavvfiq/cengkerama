import ImageResizer from "react-native-image-resizer";

import { ImageType } from "../interface";

export type CompressConfig = {
  widthRatio: number;
  heightRatio: number;
  quality: number;
};

export const CompressImage = async (
  image: ImageType,
  config: CompressConfig,
  container: { [key: string]: string },
) => {
  if (image.width && image.height) {
    const compressedImage = await ImageResizer.createResizedImage(
      image.uri,
      config.widthRatio * image.width,
      config.heightRatio * image.height,
      "JPEG",
      config.quality,
    );
    container.filename = compressedImage.name;
    container.uri = compressedImage.uri;
  } else {
    return new Error("please provide height and width");
  }
};

export const CompressImages = async (
  images: ImageType[],
  config: CompressConfig,
  container: { [key: string]: string }[],
) => {
  for (let idx = 0; idx < images.length; idx++) {
    if (images[idx].width && images[idx].height) {
      const compressedImage = await ImageResizer.createResizedImage(
        images[idx].uri,
        config.widthRatio * images[idx].width,
        config.heightRatio * images[idx].height,
        "JPEG",
        config.quality,
      );
      container.push({
        uri: compressedImage.uri,
        filename: compressedImage.name,
      });
    } else {
      return new Error("please provide height and width");
    }
  }
};
