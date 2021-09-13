import {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems ] = useState([]);

  const [q, setQ] = useState('');
  const [searchParams, setSearchParams] = useState(['capital','name']);

  useEffect(() => {
    let url = ''
    url = 'https://restcountries.eu/rest/v2/all';
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
        console.log(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, []);

  function search(items,sub){
    return items.filter((item)=>{
      return item.name.toLowerCase().includes(sub.toLowerCase())
    })
  }

  if(error){
    return(<>An error has occured ... </>);
  }else if(!isLoaded){
    return(<>loading ... </>);
  }else{
    return (
                <div className="wrapper">

                    <div className="search-wrapper">
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for..."
                                value={q}
                                /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <span className="sr-only">Search countries here</span>
                        </label>
                    </div>

                    <ul className="card-grid">

                        {search(items,q).map((item) => (
                            <li>
                                <article className="card" key={item.callingCodes}>
                                    <div className="card-image">
                                        <img src={item.flag} alt={item.name} />
                                    </div>
                                    <div className="card-content">
                                        <h2 className="card-name">{item.name}</h2>
                                        <ol className="card-list">
                                            <li>
                                                population:{" "}
                                                <span>{item.population}</span>
                                            </li>
                                            <li>
                                                Region: <span>{item.region}</span>
                                            </li>
                                            <li>
                                                Capital: <span>{item.capital}</span>
                                            </li>
                                        </ol>
                                    </div>
                                </article>
                            </li>
                        ))}

                    </ul>
                </div>
    );
  }
}

export default App;
