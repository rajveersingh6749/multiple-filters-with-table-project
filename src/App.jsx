import { useState } from "react";
import "./App.css";

const DATA = [
  { name: "Raj", age: 25, city: "Delhi", country: "India", gender: "Male" },
  { name: "Raj", age: 26, city: "Delhi", country: "India", gender: "Male" },
  { name: "Ram", age: 27, city: "Mumbai", country: "India", gender: "Male" },
  { name: "Dan", age: 26, city: "New York", country: "USA", gender: "Male" },
  {
    name: "Anita",
    age: 30,
    city: "Mumbai",
    country: "India",
    gender: "Female",
    zipcode: "233333",
    DOB: "14-12-2002",
    fullname: "Anita Singh",
  },
  { name: "John", age: 28, city: "New York", country: "USA", gender: "Male" },
  { name: "Sara", age: 28, city: "New York", country: "USA", gender: "Female", fullname: "Sara Khan" },
  {
    name: "Jasmine",
    age: 24,
    city: "Delhi",
    country: "India",
    gender: "Female",
  },
  { name: "Jane", age: 28, city: "New York", country: "USA", gender: "Female" },
  { name: "Dan", age: 28, city: "New York", country: "USA", gender: "Male" },
];

const AGE_GROUPS = [
  { label: "18-25", min: 18, max: 25 },
  { label: "26-30", min: 26, max: 30 },
  { label: "31-40", min: 31, max: 40 },
];

function App() {
  const [search, setSearch] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  // const [filters, setFilters] = useState({})

  const searchedData = DATA.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const cities = [...new Set(DATA.map((person) => person.city))];
  // console.log(cities)

  const cityFilteredData = searchedData.filter((person) =>
    selectedCities.length ? selectedCities.includes(person.city) : true,
  );

  const genders = [...new Set(DATA.map((person) => person.gender))];
  // console.log(genders);

  const genderFilteredData = cityFilteredData.filter((person) =>
    selectedGender ? person.gender === selectedGender : true,
  );

  const countries = [...new Set(DATA.map((person) => person.country))];
  // console.log(countries);

  const countryFilteredData = genderFilteredData.filter((person) =>
    selectedCountries.length
      ? selectedCountries.includes(person.country)
      : true,
  );

  // const ages = searchedData.map((a) => a.age);
  // console.log(ages);

  const ageFilteredData = countryFilteredData.filter((person) => {
    if (!selectedAges.length) return true;
    return selectedAges.some(
      (group) => person.age >= group.min && person.age <= group.max,
    );
  });

  // const columns = Object.keys(DATA[0]);
  const columns = [...new Set(DATA.flatMap((obj) => Object.keys(obj)))];
  // console.log(columns)

  // const filterOptions = {};
  // columns.forEach((col) => {

  //   filterOptions[col] = [...new Set(DATA.map((p) => p[col]).filter(Boolean))];
  // });
  // console.log(filterOptions);


  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedCities([]);
          setSelectedGender("");
          setSelectedCountries([]);
        }}
        placeholder="Search by name..."
      />

      <br />
      <br />

      <div className="filterContainer">
        <div>
          {
            <div>
              <h4>City</h4>
              {cities.map((city) => (
                <div key={city}>
                  <input
                    type="checkbox"
                    onChange={() => {
                      setSelectedCities((prev) =>
                        prev.includes(city)
                          ? prev.filter((c) => c !== city)
                          : [...prev, city],
                      );
                    }}
                  />
                  {city}
                </div>
              ))}
            </div>
          }

          {
            <div>
              <h4>Gender</h4>
              {genders.map((gender) => (
                <div key={gender}>
                  <input
                    type="radio"
                    name="gender"
                    onChange={() => setSelectedGender(gender)}
                  />
                  {gender}
                </div>
              ))}
            </div>
          }

          {
            <div>
              <h4>Country</h4>
              {countries.map((country) => (
                <div key={country}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSelectedCountries((prev) =>
                        prev.includes(country)
                          ? prev.filter((p) => p !== country)
                          : [...prev, country],
                      )
                    }
                  />
                  {country}
                </div>
              ))}
            </div>
          }

          {
            <div>
              <h4>Age Group</h4>
              {AGE_GROUPS.map((group) => (
                <div key={group.label}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      setSelectedAges((prev) =>
                        prev.includes(group)
                          ? prev.filter((g) => g !== group)
                          : [...prev, group],
                      )
                    }
                  />
                  {group.label}
                </div>
              ))}
            </div>
          }
        </div>

        <table border="1">
          <thead>
            <tr>
              {/* <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>City</th>
              <th>Country</th> */}
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ageFilteredData.map((person, index) => (
              <tr key={index}>
                {/* <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.gender}</td>
                <td>{person.city}</td>
                <td>{person.country}</td> */}
                {columns.map((col) => (
                  <td key={col}>{person[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
