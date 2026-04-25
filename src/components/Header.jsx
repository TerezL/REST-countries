import { useEffect, useState } from "react"

function Header() {
    const [dark, setDark] = useState(false)

    // načtení při startu
    useEffect(() => {
        const saved = localStorage.getItem("darkMode") === "true"
        setDark(saved)
        document.documentElement.classList.toggle("dark", saved)
    }, [])

    const toggleDarkMode = () => {
        const newValue = !dark

        setDark(newValue)
        document.documentElement.classList.toggle("dark", newValue)
        localStorage.setItem("darkMode", newValue)
    }

    return (
        <div className="flex justify-between p-8 mx-auto w-full bg-gray-50 dark:bg-gray-700 transition-colors shadow-md">
            
            <h1 className="text-xl font-bold text-black dark:text-white">
                Where in the world?
            </h1>

            <button 
                onClick={toggleDarkMode}
                className="flex gap-2 items-center text-black dark:text-white"
            >
                <svg width="30" height="30" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90 0 0)">
<path className="dark:fill-white" fillRule="evenodd" clipRule="evenodd" d="M13.7437 3.16931C13.5722 3.45567 13.6105 3.82095 13.8378 4.06542C15.0419 5.36059 15.7773 7.09456 15.7773 9.00196C15.7773 13.0071 12.5305 16.2539 8.52539 16.2539C6.61799 16.2539 4.88402 15.5185 3.58886 14.3144C3.34438 14.0871 2.97911 14.0487 2.69275 14.2203C2.40639 14.3918 2.26788 14.732 2.35295 15.0548C3.48212 19.3396 7.38274 22.5 12.0234 22.5C17.5463 22.5 22.0234 18.0229 22.0234 12.5C22.0234 7.85931 18.863 3.95868 14.5782 2.82951C14.2554 2.74444 13.9153 2.88296 13.7437 3.16931ZM16.4225 5.22521C18.881 6.71513 20.5234 9.41634 20.5234 12.5C20.5234 17.1944 16.7179 21 12.0234 21C8.93977 21 6.23857 19.3575 4.74865 16.8991C5.89214 17.4469 7.17321 17.7539 8.52539 17.7539C13.359 17.7539 17.2773 13.8355 17.2773 9.00196C17.2773 7.64977 16.9704 6.36871 16.4225 5.22521Z" fill="#343C54"/>
</svg>
        Dark Mode
            </button>
            </div>
        
    )
}

export default Header