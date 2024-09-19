import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  MD3LightTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { useColorScheme } from "react-native";
import { DarkScheme, LightScheme } from "./scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the themes
const LightTheme = {
  ...MD3LightTheme,
  colors: LightScheme,
};

const DarkTheme = {
  ...MD3DarkTheme,
  colors: DarkScheme,
};

type ThemeContextType = {
  themeChoice: string;
  setThemeChoice: (choice: string) => void;
  theme: any;
};

// Create the ThemeContext
const ThemeContext = createContext<ThemeContextType>({
  themeChoice: "system",
  setThemeChoice: () => {},
  theme: LightTheme, // Default theme
});

export const useThemeContext = () => useContext(ThemeContext);

// ThemeProvider Component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeChoice, setThemeChoice] = useState("system");
  const colorScheme = useColorScheme(); // Check system theme (light/dark)
  const [theme, setTheme] = useState(LightTheme);

  // Fetch the stored theme before rendering the component
  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem("storetheme");
      if (storedTheme) {
        setThemeChoice(storedTheme);
      }
    })();
  }, []);

  // Update theme based on stored theme or system preference
  useEffect(() => {
    const applyTheme = async () => {
      if (themeChoice === "light") {
        setTheme(LightTheme);
        console.log("Using stored light theme");
      } else if (themeChoice === "dark") {
        setTheme(DarkTheme);
        console.log("Using stored dark theme");
      } else {
        setTheme(colorScheme === "dark" ? DarkTheme : LightTheme);
        console.log("Using system theme preference");
      }
    };

    applyTheme();
  }, [themeChoice, colorScheme]);

  // Save theme whenever themeChoice changes
  useEffect(() => {
    AsyncStorage.setItem("storetheme", themeChoice);
  }, [themeChoice]);

  return (
    <ThemeContext.Provider value={{ themeChoice, setThemeChoice, theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
