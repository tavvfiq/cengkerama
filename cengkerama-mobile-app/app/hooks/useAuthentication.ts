import { GoogleSignin } from "@react-native-community/google-signin";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { FirestoreService } from "../services";
import { authAtom } from "../store/authentication";
import { error } from "../utils/logger";
import { generateUUID } from "../utils/uuidGenerator";
import { User } from "../interface";

function useAuthentication(): [
  isError: boolean,
  loading: boolean,
  signInWithGoogle: () => Promise<void>,
  signInWithPhoneNumber: (phoneNumber: string) => Promise<void>,
  confirmCode: (code: string) => Promise<void>,
  setDisplayName: (name: string) => Promise<void>,
] {
  const setState = useSetRecoilState(authAtom);
  const [
    confirm,
    setConfirm,
  ] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const _phoneNumber = useRef("");

  const signInWithGoogle = async () => {
    setLoading(true);
    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const userData = {
        id: userInfo.user.id,
        contacts: [],
        rooms: [],
        displayName: userInfo.user.name as string,
        email: userInfo.user.email,
        profilePicture: userInfo.user.photo as string,
      };
      const result = await FirestoreService.UserCollection.doc(
        userInfo.user.id,
      ).get();
      if (result.data() === undefined) {
        await FirestoreService.UserCollection.doc(userData.id).set(userData);
      } else {
        userData.contacts = result.data()?.contacts;
        userData.rooms = result.data()?.rooms;
      }
      setState(() => {
        return {
          token: userInfo.idToken as string,
          user: {
            ...userData,
          },
          isLoggedIn: true,
        };
      });
      setError(false);
    } catch (e) {
      setError(true);
      error("Google_SignIn", e);
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    setLoading(true);
    try {
      _phoneNumber.current = phoneNumber;
      const confirmation = await auth().signInWithPhoneNumber(
        phoneNumber,
        true,
      );
      setConfirm(confirmation);
      setError(false);
    } catch (e) {
      setError(true);
      error("phone_SignIn", e);
    } finally {
      setLoading(false);
    }
  };

  const checkIfUserExist = async () => {
    try {
      const result = await FirestoreService.UserCollection.where(
        "phoneNumber",
        "==",
        _phoneNumber.current,
      ).get();
      if (result.docs.length) {
        setState({
          token: "",
          user: {
            id: result.docs[0].id,
            ...result.docs[0].data(),
          },
          isLoggedIn: true,
        });
      }
      setError(false);
    } catch (e) {
      setError(true);
      error("ERR_GetUser", e);
    }
  };

  const confirmCode = async (code: string) => {
    setLoading(true);
    try {
      const result = await confirm?.confirm(code);
      console.log(result);
      await checkIfUserExist();
      setError(false);
    } catch (e) {
      setError(true);
      error("confirm_Code", e);
    } finally {
      setLoading(false);
    }
  };

  const setDisplayName = async (name: string) => {
    setLoading(true);
    try {
      const id = generateUUID();
      const userData: User = {
        contacts: [],
        id,
        displayName: name,
        email: "",
        phoneNumber: _phoneNumber.current,
        profilePicture: "",
        rooms: [],
      };
      await FirestoreService.UserCollection.doc(id).set(userData);
      setState({
        token: "",
        user: {
          ...userData,
        },
        isLoggedIn: true,
      });
      setError(false);
    } catch (e) {
      setError(true);
      error("registering user", e);
    } finally {
      setLoading(false);
    }
  };

  return [
    isError,
    loading,
    signInWithGoogle,
    signInWithPhoneNumber,
    confirmCode,
    setDisplayName,
  ];
}

export default useAuthentication;
