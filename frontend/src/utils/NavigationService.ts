import type { NavigateFunction } from "react-router-dom";

let navigator: NavigateFunction | null = null;

export const NavigationService = {
  setNavigator: (nav: NavigateFunction) => {
    navigator = nav;
  },
  navigate: (path: string) => {
    if (navigator) {
      navigator(path);
    } else {
      console.warn("NavigationService not initialized yet");
    }
  },
};
