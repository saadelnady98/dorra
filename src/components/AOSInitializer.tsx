"use client";

import { useLayoutEffect } from "react";
import AOS from "aos";

export default function AOSInitializer() {
  useLayoutEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: true,
      disable: window.innerWidth < 768,
    });
  }, []);

  return null;
}

