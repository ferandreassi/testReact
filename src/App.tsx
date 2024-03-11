import { useEffect, useState } from 'react';
import './App.css'

// Add or remove items here
const countryList = ['India', 'USA', 'FRANCE', 'Italy'];

type CountryObject = {
  country: string;
  checked: boolean;
};

function App() {
  const [countryListObjectState, setCountryListObjectState] = useState<Array<CountryObject>>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  
  useEffect(() => {
    const countryListObject = countryList.map(country => {
      return {country, checked: false}
    });
    setCountryListObjectState(countryListObject);
  }, []);
  
  const checkSelectAll = () => {
    const initialValue = 1;
    const sumWithInitial = countryListObjectState.reduce(
      (accumulator, currentValue) => accumulator * (currentValue.checked ? 1 : 0),
      initialValue,
    );
    setSelectAll(sumWithInitial ? true : false);
  };

  const selectHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let countries = [...countryListObjectState];    
    if(index < 0) {
      countries = countries.map(country => {
        country.checked = e?.target.checked;
        return country;
      });
      setCountryListObjectState(countries);
      setSelectAll(e?.target.checked);
    } else {
      countries[index].checked =  e?.target.checked;
      setCountryListObjectState(countries);
    }
    checkSelectAll();
  }

  const Item = (country: string, index: number) => {
    return (
      <div key={country}>
        <label>
          <input type="checkbox" checked={index > -1 ? countryListObjectState[index].checked : selectAll} onChange={(e) => selectHandler(e, index)}/>
          <span>{country}</span>
        </label>
      </div>
      )
  }

  return (
    <>
      {
        countryListObjectState.length && (
          <div className="card">
          {
            Item ('Select All', -1)
          }
          {
            countryList.map((country, index) => {
              return Item (country, index);
            })
          }
          </div>  
        )
      }
    </>
  )
}

export default App
