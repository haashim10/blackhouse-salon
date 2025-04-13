"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ServiceColorScheme {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  isActive: boolean;
}

interface ServiceContextType {
  serviceColors: ServiceColorScheme;
  setServiceColors: (colors: ServiceColorScheme) => void;
}

const defaultColorScheme: ServiceColorScheme = {
  backgroundColor: "transparent",
  textColor: "var(--foreground)",
  accentColor: "#000000",
  isActive: false
};

const ServiceContext = createContext<ServiceContextType>({
  serviceColors: defaultColorScheme,
  setServiceColors: () => {}
});

export const useServiceContext = () => useContext(ServiceContext);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [serviceColors, setServiceColors] = useState<ServiceColorScheme>(defaultColorScheme);

  return (
    <ServiceContext.Provider value={{ serviceColors, setServiceColors }}>
      {children}
    </ServiceContext.Provider>
  );
}