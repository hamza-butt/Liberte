declare module "react-native-video" {
  import * as React from "react";
  import { ViewProps } from "react-native";

  export type VideoResizeMode = "contain" | "cover" | "stretch" | "none";

  export interface VideoProperties extends ViewProps {
    source: any;
    paused?: boolean;
    muted?: boolean;
    repeat?: boolean;
    resizeMode?: VideoResizeMode;
    controls?: boolean;
    rate?: number;
    volume?: number;
    playWhenInactive?: boolean;
    ignoreSilentSwitch?: "inherit" | "ignore" | "obey";
    progressUpdateInterval?: number;
    onLoad?: () => void;
    onEnd?: () => void;
  }

  export default class Video extends React.Component<VideoProperties> {}
}
