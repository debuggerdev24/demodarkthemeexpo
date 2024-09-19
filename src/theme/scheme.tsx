export type ColorScheme = {
  title_txt: string;
  background: string;
  maintitle_txt: string;
  maintitleBackground: string;
  txt_input: string;
  txt_input_placeholder: string;
  active_item: string;
  check_box: string;
};

// Light color scheme
export const LightScheme: ColorScheme = {
  title_txt: "#000",
  background: "#f2f2f2",
  maintitle_txt: "#fff",
  maintitleBackground: "#635fff",
  txt_input: "#ffffff",
  txt_input_placeholder: "#999",
  active_item: "#e8e9e8",
  check_box: "#000",
};

// Dark color scheme
export const DarkScheme: ColorScheme = {
  title_txt: "#fff", // White text for titles
  background: "#121212", // Dark background color
  maintitle_txt: "#000", // Black text on the main title
  maintitleBackground: "#3730a3", // Darker shade of the original background color
  txt_input: "#222222", // Dark gray input field background
  txt_input_placeholder: "#cccccc",
  active_item: "#404040",
  check_box: "#999",
};
