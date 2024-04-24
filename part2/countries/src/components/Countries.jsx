import { useState } from "react";
import { Country } from "./Country";

export const Countries = ({ countries }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    if (countries.length === 0) {
        return null;
    }
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    }
    if (countries.length === 1) {
        const country = countries[0];
        return <Country country={country} />;
    }
    return countries.map((country) => (
        <div key={country.cca3}>
            <span>{country.name.official}</span>{" "}
            <button
                onClick={() => {
                    if (selectedCountry?.cca3 === country.cca3) {
                        setSelectedCountry(null);
                    } else {
                        setSelectedCountry(country);
                    }
                }}
            >
                {selectedCountry?.cca3 === country.cca3 ? "hide" : "show"}
            </button>
            {selectedCountry?.cca3 === country.cca3 && (
                <Country country={country} />
            )}
        </div>
    ));
};
