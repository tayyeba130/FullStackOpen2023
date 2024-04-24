import { useState, useEffect } from "react";
import countryApi from "./services/countries";
import { Countries } from "./components/Countries";
import "./App.css";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        const getAll = async () => {
            const response = await countryApi.getAll();
            setCountries(response);
        };
        getAll();
    }, []);

    useEffect(() => {
        if (searchTerm.length > 0) {
            const filteredCountries = countries.filter((country) =>
                country.name.common
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
            setFilteredCountries(filteredCountries);
        }
    }, [searchTerm, countries]);

    const onSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <span>find countries</span>{" "}
            <input type="text" value={searchTerm} onChange={onSearchChange} />
            <Countries countries={filteredCountries} />
        </div>
    );
}

export default App;
