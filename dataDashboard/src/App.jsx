import { useState } from 'react'
import { useEffect } from 'react';
import viteLogo from '/vite.svg'
import JobTitles from './components/jobs'

import './App.css'


function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
    
      
      const filteredData = Object.keys(list).filter((item) => 
     
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      console.log(filteredData)
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list));
    }
  };
  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        // how do we call an API using fetch? 
        'https://data.cityofnewyork.us/resource/nzjr-3966.json'
      
      );
      const json = await response.json();
      setList(json);
    };
    fetchAllCoinData().catch(console.error);

  }, []);

  console.log(list)


  return (
   <div>
    <div className="whole-page">
  <h1>Civil Service Jobs</h1>
  <input
    type="text"
    placeholder="Search..."
    onChange={(inputString) => searchItems(inputString.target.value)}
  />
  
      <ul>{searchInput.length > 0
      ? filteredResults.map((job) => 
      list[job].descr!=null ? 
            <JobTitles
            descr={list[job].descr}
            titlecode={list[job].titlecode}
            asg_lvl={list[job].asg_lvl}
            min_rate={list[job].min_rate}
            max_rate={list[job].max_rate}
            />
            : null
        )
      :list && Object.entries(list).map(([job]) =>
  list[job].descr!=null ? (
    <JobTitles
    descr={list[job].descr}
            titlecode={list[job].titlecode}
            asg_lvl={list[job].asg_lvl}
            min_rate={list[job].min_rate}
            max_rate={list[job].max_rate}
    />
      
    ) : null
)}
      </ul>
</div>
   </div>
  )
}

export default App
