import { useState, useEffect } from 'react';
import type { TransformedCountry, countriesData } from '../../types/tableTypes';
import { countryTransform, fetchHelper } from '../../utils/fetchHelper';
// import fetchHelper from '../../utils/fetchHelper';
// import { COUNTRIES_API } from '../../shared/constants';
// import countriesData from '../data/countries.json';
// import data from '../../../public/owid-co2-data.json'

export const Table = () => {
  const [countryEntries, setCountryEntries] = useState<TransformedCountry[]>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchHelper<Record<string, countriesData>>({
        url: '/data.json',
      });
      // const response = await fetch(
      //   'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
      // );
      // const data = await response;
      const transformedData = countryTransform(response);
      setCountryEntries(transformedData);
    };
    fetchData();
  }, []);
  const singleHeadersObj = countryEntries?.slice(0, 1)[0]?.data[0];

  const singleHeadersArr = singleHeadersObj
    ? ['-'].concat(Object.keys(singleHeadersObj))
    : ['-'];

  const tableBody = countryEntries
    ?.map((country) => {
      const dataArrays = Object.entries(country.data);
      const flattedData = dataArrays.map((entry) => {
        return Object.values(entry[1]);
      });
      return flattedData;
    })
    .flat();
  console.log(tableBody);

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск..."
        className="w-full p-2 mb-4 rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-300"
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full border border-collapse">
        <thead>
          <tr className="p-2 text-left border">
            {singleHeadersArr?.map((header) => {
              return (
                <th key={header} className="p-2 text-left border">
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableBody?.map((item) => {
            return item.map((el, elind) => {
              return (
                <tr key={elind}>
                  <td className="p-2 border">{el}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};
