import { Storage, useMMKVStorage } from "@services";
import { ThemeOptions } from "@theme";


const useTheme = () => useMMKVStorage<ThemeOptions>('Theme', Storage, 'System');

export default useTheme;

