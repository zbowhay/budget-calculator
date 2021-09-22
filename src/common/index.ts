export const titleCase = (s: string): string => {
    return s.replace(/\w*/g, (txt) => `${txt.charAt(0)}${txt.substr(1).toLowerCase()}`);
} 