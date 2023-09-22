import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Dropdown, Container, Card} from "react-bootstrap"
import routes from "./routes";
import currencyCountries from "./assets/currency.json"


function App() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [fullTitles, setFullTitles] = useState({});
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentRates, setCurrentRates] = useState(0);
  const [currentCountry, setCurrentCountry] = useState('')
  useEffect(() => {
    const getRatesData = async () => {
      try {
        const exchangeResponse = await axios.get(routes.exchangeRates(process.env.REACT_APP_SUCCESS_KEY))
        const titlesResponse = await axios.get(routes.fullTitleCountries(process.env.REACT_APP_SUCCESS_KEY))
        setExchangeRates(exchangeResponse.data.rates);
        setFullTitles(titlesResponse.data.symbols);
      } catch(e) {
        alert(e);
      }
    }
    getRatesData();
  })

  const setData = (key, value) => {
    setCurrentRates(exchangeRates[key]);
    setCurrentCountry(Object.keys(currencyCountries).find((country) => currencyCountries[country] === key));
    setCurrentTitle(value);
  }

  return (
    <Container className="d-flex w-25 vh-100 justify-content-center align-content-center flex-wrap">
      <div className="">
        <Dropdown className="row">
          <Dropdown.Toggle variant="success">
            Dropdown Button
          </Dropdown.Toggle>
          <Dropdown.Menu className="overflow-auto">
            {Object.entries(fullTitles).map(([key, value]) => (
              <Dropdown.Item key={key} onClick={() => setData(key, value)}>{value}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {currentCountry !== '' 
          ?
          <Card className="row mt-5">
            <Card.Img variant="top" src={routes.flagCountry(currentCountry.toLowerCase())} />
            <Card.Body>{currentTitle}</Card.Body>
            <Card.Footer>{currentRates}</Card.Footer>
          </Card>
          : 
          <></>
        }
      </div>
    </Container>
    
  );
}

export default App;
