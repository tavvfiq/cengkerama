import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  boolean,
  Dispatch<SetStateAction<number>>,
] {
  const [image, setImage] = useState<CameraRollType[]>([]);
  const [numOfPhotos, setNumOfPhotos] = useState<number>(9);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  useEffect(() => {
    // using IIFE
    (async () => {
      const isHasPermission = await hasAndroidPermission();
      if (isHasPermission) {
        try {
          if (hasNextPage) {
            setLoading(() => true);
            const result = await CameraRoll.getPhotos({
              first: numOfPhotos,
              assetType: "Photos",
              groupTypes: "All",
              include: ["imageSize", "fileSize", "filename"],
            });
            setHasNextPage(() => result.page_info.has_next_page);
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
            setLoading(() => false);
          }
        } catch (error) {
          setLoading(() => false);
          setImage([]);
        }
      }
    })();
  }, [numOfPhotos]);
  return [image, loading, setNumOfPhotos];
}
