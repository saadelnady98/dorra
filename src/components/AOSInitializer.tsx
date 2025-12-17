"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: true,
      disable: window.innerWidth < 768,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return null;
}
