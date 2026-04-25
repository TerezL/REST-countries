import { useNavigate } from "react-router-dom"

function Article ({flags, name, population, region, capital, cca3}) {

const navigate = useNavigate()

    return(
        <>
            <div onClick={() => navigate(`/country/${cca3}`)} 
            
            className="bg-white rounded-lg shadow-md w-full md:w-80 overflow-hidden cursor-pointer hover:scale-105 transition dark:bg-gray-700 ">

  <div className="w-full md:h-60 md:w-80 bg-gray-100 flex items-stretch content-stretch justify-center">
    <img 
      src={flags?.svg} 
      alt="flag" 
      className="h-full w-full object-cover"
    />
  </div>

  <div className="p-4">
    <h1 className="text-xl font-bold mb-3 dark:text-white">{name.common}</h1>

    <ul className="flex flex-col gap-1">
      <li className="text-gray-800 font-semibold dark:text-gray-300">
        Population: <span className="text-gray-600 font-normal dark:text-gray-400">
          {population?.toLocaleString()}
        </span>
      </li>
      <li className="text-gray-800 font-semibold dark:text-gray-300">
        Region: <span className="text-gray-600 font-normal dark:text-gray-400">{region}</span>
      </li>
      <li className="text-gray-800 font-semibold dark:text-gray-300">
        Capital: <span className="text-gray-600 font-normal dark:text-gray-400">{capital}</span>
      </li>
    </ul>
  </div>

</div>
        </>
    )
}

export default Article