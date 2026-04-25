import { useState, useEffect } from "react"
import Article from "./Article"
import Header from "./Header"

function Countries() {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("");
    const regions = [
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Oceania",
    },
    {
      name: "Americas",
    },
    
  ];


    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await fetch(
                    "https://restcountries.com/v3.1/all?fields=name,cca3,capital,currencies,languages,flags,population,region,subregion,borders"
                )

                if (!res.ok) {
                    throw new Error("Failed to fetch countries")
                }

                const data = await res.json()

                // 👇 ochrana proti špatným datům
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format")
                }

                setCountries(data)
            } catch (err) {
                console.error(err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        getCountries()
    }, [])

    // 🔄 loading state
    if (loading) {
        return (
            <h1 className="flex items-center justify-center h-screen text-gray-500 font-bold uppercase">
                Loading...
            </h1>
        )
    }

    // ❌ error state
    if (error) {
        return (
            <h1 className="flex items-center justify-center h-screen text-red-500 font-bold">
                Error: {error}
            </h1>
        )
    }

    async function searchCountry() {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${search}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  async function filterByRegion(region) {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion();
  }



    // 🌍 data
    return (
        <>
        <Header />
        <section className="container mx-auto p-8">
        <div className="flex flex-col gap-4 my-5 md:flex-row md:items-center md:justify-between">
            <form className="relative md:flex-1"
            onSubmit={handleSearchCountry}>
                <input 
                    type="text" 
                    name="search"
                id="search"
                    placeholder="Search for a country..." 
                     value={search}
                onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 text-gray-400 md:w-1/3 p-3 rounded bg-gray-50 shadow-md focus:outline-none focus:ring-1 focus:ring-gray-100 dark:bg-gray-700 dark:text-white"
                />
                <svg className="absolute left-3 top-3" width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
<path fillRule="evenodd" clipRule="evenodd" d="M11.25 2.75C6.14154 2.75 2 6.89029 2 11.998C2 17.1056 6.14154 21.2459 11.25 21.2459C13.5335 21.2459 15.6238 20.4187 17.2373 19.0475L20.7182 22.5287C21.011 22.8216 21.4859 22.8217 21.7788 22.5288C22.0717 22.2359 22.0718 21.761 21.7789 21.4681L18.2983 17.9872C19.6714 16.3736 20.5 14.2826 20.5 11.998C20.5 6.89029 16.3585 2.75 11.25 2.75ZM3.5 11.998C3.5 7.71905 6.96962 4.25 11.25 4.25C15.5304 4.25 19 7.71905 19 11.998C19 16.2769 15.5304 19.7459 11.25 19.7459C6.96962 19.7459 3.5 16.2769 3.5 11.998Z" fill="#9ca3af"/>
</svg>

            </form>
            <form onSubmit={handleFilterByRegion}>
            
                <select name="search-by-region" 
                placeholder="Filter by Region"
                id="filter-by-region" 
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
                className="bg-gray-50 w-52 text-gray-400 p-3 rounded shadow-md focus:outline-none focus:ring-1 focus:ring-gray-100 dark:bg-gray-700 dark:text-white">
                    <option value="">Filter by Region</option>
                    {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
                </select>
            </form>
        </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {countries.map((country) => (
                    <Article 
                        key={country.cca3} 
                        {...country}
                    />
                ))}
            </div>
        </section>
        </>
    )
}

export default Countries