import { atom, selector } from "recoil";

import { User } from "../../interface";
import StorageWrapper from "../../utils/asyncStorageWrapper";

export type AuthState = {
  token?: string;
  user?: User;
  isLoggedIn?: boolean;
};

const initialState: AuthState = {
  token: "",
  user: {},
  isLoggedIn: false,
};

export const authAtom = atom<AuthState | null>({
  key: "auth",
  default: null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        const payload = JSON.stringify(newValue);
        StorageWrapper.write("authState", payload);
      });
    },
  ],
});

export const auth = selector<AuthState>({
  key: "authSelector",
  get: async ({ get }) => {
    const authState = get(authAtom);
    if (authState) {
      return authState;
    }
    const localValue = await StorageWrapper.read("authState");
    if (localValue !== null) {
      return JSON.parse(localValue);
    } else {
      return initialState;
    }
  },
});
