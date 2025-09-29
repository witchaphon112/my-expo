import { useEffect } from "react";
import { router, useRootNavigationState } from "expo-router";

export default function Index() {
  const navState = useRootNavigationState();

  useEffect(() => {
    if (navState && navState.key) {
      router.replace("/book");
    }
  }, [navState]);

  if (!navState) return null;
  return null;
}