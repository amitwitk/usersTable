import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('response not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const parseData = (data) => {
  return data.map(obj => ({
    ...obj,
    address: obj.address.city,
    company: obj.company.name,
  }));
};

const sortByKey = (key, acsending) => {
  const direction = acsending ? 1 : -1;
  const newData = [...data].sort((a, b) => {
    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      return a[key].localeCompare(b[key]) * direction;
    } else if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return (a[key] - b[key]) * direction;
    }
  });
  setData(newData);
};

function App() {
  const [data, setData] = useState([]);
  const [keys, seyKeys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [sortConfig, setSortConfig] = useState({ key: '', acsending: true });

  

  useEffect(() => {
    const fetchNewData = async () => {
      const data = await fetchData(
        'https://jsonplaceholder.typicode.com/users'
      );
      const newData = parseData(data);
      seyKeys(Object.keys(newData[0]));
      setData(newData);
    };
    fetchNewData();
  }, []);

  const filteredData = data.filter((obj) =>
    obj.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div>
        <div className="input-header">Search By Name</div>
        <input
          className="input-class"
          placeholder="enter name to filter by"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </div>
      <table className="table-class">
        <thead>
          <tr>
            {keys.map((key) => (
              <th
                className={sortConfig.key === key ? 'sorted' : ''}
                onClick={() => {
                  const new_ac =
                    sortConfig.key === key ? !sortConfig.acsending : true;
                  setSortConfig({ key: key, acsending: new_ac });
                  sortByKey(key, new_ac);
                }}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((obj) => (
            <tr>
              {keys.map((key) => {
                return <td>{obj[key]} </td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>the term is : {searchTerm}</div>
    </div>
  );
}

export default App;
