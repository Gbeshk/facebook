// import { useState, useEffect } from 'react';

// const getInitialTheme = () => {
//   if (typeof window === 'undefined') return false;
//   return localStorage.getItem('theme') === 'dark';
// };

// const useTheme = () => {
//   const [isDark, setIsDark] = useState(getInitialTheme);

//   useEffect(() => {
//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === 'theme') {
//         setIsDark(e.newValue === 'dark');
//       }
//     };

//     const handleCustomChange = (e: CustomEvent) => {
//       setIsDark(e.detail === 'dark');
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('themeChange', handleCustomChange as EventListener);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('themeChange', handleCustomChange as EventListener);
//     };
//   }, []);

//   const setTheme = (darkMode: boolean) => {
//     const newValue = darkMode ? 'dark' : 'light';
//     localStorage.setItem('theme', newValue);
//     setIsDark(darkMode);
//     window.dispatchEvent(
//       new CustomEvent('themeChange', { detail: newValue })
//     );
//   };

//   return [isDark, setTheme] as const;
// };

// export default useTheme;