import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

function CountryDetail() {
    const navigate = useNavigate()
    const { code } = useParams()
    const [country, setCountry] = useState(null)
    const [borders, setBorders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
    const getCountry = async () => {
        try {
            setLoading(true)

            const res = await fetch(
                `https://restcountries.com/v3.1/alpha/${code}`
            )

            if (!res.ok) {
                throw new Error("Failed to fetch country")
            }

            const data = await res.json()

            setCountry(data[0])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    getCountry()
}, [code])

  
useEffect(() => {
    const getBorders = async () => {
        if (!country?.borders?.length) {
            setBorders([])
            return
        }

        try {
            const results = await Promise.all(
                country.borders.map(async (code) => {
                    const res = await fetch(
                        `https://restcountries.com/v3.1/alpha/${code}`
                    )
                    const data = await res.json()
                    return data[0]
                })
            )

            setBorders(results)
        } catch (error) {
            console.error(error)
            setBorders([])
        }
    }

    getBorders()
}, [country])

    // 👇 guard musí být dřív
    useEffect(() =>{
        setLoading(true)
        setCountry(null)
        setBorders([])
    }, [code])
    if (loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>
    

    // 👇 až tady můžeš bezpečně sahat na data
    const native = country.name.nativeName
    const nativeName = native 
        ? Object.values(native)[0].common
        : country.name.common

        const currencies = country.currencies
  ? Object.values(country.currencies)
      .map(c => `${c.name} (${c.symbol})`)
      .join(", ")
  : "N/A"

  const languages = country.languages
  ? Object.values(country.languages)
      .sort()
      .join(", ")
  : "N/A"

    return (
        <>
        <Header />
        <div className="p-8 w-full mx-auto md:w-[80%]">
        <button onClick={() => navigate(-1)}
        className="flex flex-row justify-center gap-2 my-10 px-3 py-1 bg-gray-100 rounded shadow-xl cursor-pointer hover:scale-105 transition dark:bg-gray-700 dark:text-white">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
<path className="dark:stroke-white" d="M4 11.9966L20.0014 11.9966M9.99599 6L4 11.9998L9.99599 18" stroke="#343C54" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg> Back
</button>
<div className="flex flex-col w-full gap-10 md:flex-row md:justify-between md:px-0">
            <img 
                src={country.flags?.svg} 
                alt="flag"
                className="w-full max-w-md"
            />
<div>
            <h1 className="text-xl font-bold md:text-2xl lg:text-3xl my-5 dark:text-white">
                {country.name.common}
            </h1>
<div className="flex flex-col md:gap-10 md:flex-row">
            <div>
                <p className="font-semibold text-gray-800 dark:text-gray-300">Native name: <span className="font-normal text-gray-600 dark:text-gray-400">{nativeName}</span></p>
                <p className="font-semibold text-gray-800 dark:text-gray-300">Population: <span className="font-normal text-gray-600 dark:text-gray-400">{country.population?.toLocaleString()}</span></p>
                <p className="font-semibold text-gray-800 dark:text-gray-300">Region: <span className="font-normal text-gray-600 dark:text-gray-400">{country.region}</span></p>
                <p className="font-semibold text-gray-800 dark:text-gray-300">Sub Region: <span className="font-normal text-gray-600 dark:text-gray-400">{country.subregion}</span></p>
                <p className="font-semibold text-gray-800 dark:text-gray-300">Capital: <span className="font-normal text-gray-600 dark:text-gray-400">{country.capital?.join(",")}</span></p>
            </div>
            <div className="my-5">
                <p className="font-semibold text-gray-800 dark:text-gray-300">Top Level Domain: <span className="font-normal text-gray-600 dark:text-gray-400">{country.tld?.join(",")}</span></p>
                <p className="font-semibold text-gray-800 dark:text-gray-300">Currencies: <span className="font-normal text-gray-600 dark:text-gray-400">{currencies}</span></p>
                <p className="font-semibold text-gray-800 dark:text-gray-300">Languages: <span className="font-normal text-gray-600 dark:text-gray-400">{languages}</span></p>
            </div>
            </div>
            <div className="mt-6">
  <p className="font-semibold mb-2 text-gray-800 dark:text-gray-300">Border Countries:</p>

  <div className="flex flex-wrap gap-2">
    {borders.length > 0 ? (
      borders.map((b) => (
        <span 
          key={b.cca3}
          onClick={() => navigate(`/country/${b.cca3}`)}
          className="px-3 py-1 bg-gray-100 rounded shadow-md text-sm cursor-pointer hover:scale-103 transition dark:bg-gray-700 dark:text-gray-300"
        >
          {b.name.common}
        </span>
      ))
    ) : (
      <span className="text-gray-800 dark:text-gray-300">N/A</span>
    )}
  </div>
</div>
</div>
</div>
        </div>
        </>
    )
}

export default CountryDetail