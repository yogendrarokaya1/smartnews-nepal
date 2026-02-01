import { useTheme } from "next-themes"


export default function ThemeToggle() {
      const { theme, setTheme } = useTheme()
    return <>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </>


}