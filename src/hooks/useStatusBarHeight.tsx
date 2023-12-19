import { useEffect, useState } from "react";
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  StatusBar,
} from "react-native";

const { StatusBarManager } = NativeModules;

const useStatusBarHeight = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(
    StatusBar.currentHeight || 0
  );

  useEffect(() => {
    if (Platform.OS !== "ios") return;

    const emitter = new NativeEventEmitter(StatusBarManager);

    StatusBarManager.getHeight(({ height }: { height: number }) => {
      setStatusBarHeight(height);
    });

    const listener = emitter.addListener("statusBarFrameWillChange", (data) =>
      setStatusBarHeight(data.frame.height)
    );

    return () => listener.remove();
  }, []);

  return { statusBarHeight };
};

export default useStatusBarHeight;
