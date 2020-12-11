import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export const MessageCollection = (roomId: string) =>
  firestore().collection("message").doc(roomId).collection("messages");

export const RoomCollection = firestore().collection("room");

export type UploadConfig = {
  storagePath: string; // in firebase storage
  filePath: string; // file uri
};

export const Storage = {
  uploadFile: async (uploadConfig: UploadConfig) => {
    try {
      const uploadTask = storage()
        .ref(uploadConfig.storagePath)
        .putFile(uploadConfig.filePath);
      await uploadTask;
    } catch (error) {
      console.error(error);
    } finally {
    }
  },
  uploadFiles: async (uploadConfig: UploadConfig[]) => {
    try {
      for (let idx = 0; idx < uploadConfig.length; idx++) {
        const uploadTask = storage()
          .ref(uploadConfig[idx].storagePath)
          .putFile(uploadConfig[idx].filePath);
        await uploadTask;
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  },
  uploadFileAndGetLink: async (
    uploadConfig: UploadConfig,
    container: { [key: string]: string },
  ) => {
    try {
      const uploadTask = storage()
        .ref(uploadConfig.storagePath)
        .putFile(uploadConfig.filePath);
      await uploadTask;
      const url = await storage()
        .ref(uploadConfig.storagePath)
        .getDownloadURL();
      container.url = url;
    } catch (error) {
      console.error(error);
    } finally {
    }
  },
  uploadFilesAndGetLink: async (
    uploadConfig: UploadConfig[],
    container: { [key: string]: string }[],
  ) => {
    try {
      for (let idx = 0; idx < uploadConfig.length; idx++) {
        const uploadTask = storage()
          .ref(uploadConfig[idx].storagePath)
          .putFile(uploadConfig[idx].filePath);
        await uploadTask;
        const url = await storage()
          .ref(uploadConfig[idx].storagePath)
          .getDownloadURL();
        container.push({ url: url });
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  },
};
