import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Country from "./components/Country";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService
      .getAll()
      .then((allCountries) => {
        console.log(allCountries);
        setAllCountries(allCountries);
      })
      .catch((error) => {
        console.log("Error fetching countries:", error);
      });
  }, []);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
    setSelectedCountry(null);
  };

  const searchCountries = allCountries?.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  console.log("search countries: ", searchCountries);

  const sortedCountries = searchCountries
    ?.slice()
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  console.log("sorted country", sortedCountries);

  const handleShowCountry = (officialName) => {
    console.log("the button is pushed");
    
    const showCountry = sortedCountries?.find(
      (c) => c.name.official === officialName
    );
    setSelectedCountry(showCountry);
  };

  const displayCountries = () => {
    if (selectedCountry) {
      return <CountryDetail country={selectedCountry} />;
    } else if (sortedCountries?.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (sortedCountries?.length === 1) {
      return <CountryDetail country={sortedCountries[0]} />;
    } else if (sortedCountries?.length < 1) {
      return <div>There is no country, try another filter</div>;
    } else {
      return sortedCountries?.map((c) => (
        <Country
          key={c.name.official}
          country={c.name.common}
          onShow={() => handleShowCountry(c.name.official)}
        />
      ));
    }
  };

  return (
    <div>
      <div>
        <span>Find countries </span>
        <input value={search} onChange={handleSearch} />
      </div>
      {displayCountries()}
    </div>
  );
};

export default App;
