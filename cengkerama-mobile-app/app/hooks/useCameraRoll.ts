import { useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";

import { ImageType } from "../interface";

async function hasAndroidPermission(): Promise<boolean> {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === "granted";
}

type CameraRollType = {
  id: string;
  content: ImageType;
};

export default function useCameraRoll(): [
  CameraRollType[] | undefined,
  () => void,
] {
  const [image, setImage] = useState<CameraRollType[]>([]);
  const [numOfPhotos] = useState<number>(11);
  useEffect(() => {
    // using IIFE
    (async () => {
      const isHasPermission = await hasAndroidPermission();
      if (isHasPermission) {
        try {
          const result = await CameraRoll.getPhotos({
            first: numOfPhotos,
            assetType: "Photos",
            groupTypes: "All",
            include: ["imageSize", "fileSize", "filename"],
          });
          setImage(() => {
            return result.edges.map((item, index) => {
              return {
                id: String(index),
                content: {
                  ...item.node.image,
                  filename: item.node.image.filename,
                  uri: item.node.image.uri,
                },
              };
            });
          });
        } catch (error) {
          setImage([]);
        }
      }
    })();
  }, []);
  return [image, () => {}];
}
