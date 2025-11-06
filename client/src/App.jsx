import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [activeTab, setActiveTab] = useState("weather");

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial", padding: "20px" }}>
      <h1>🌐 InfoHub</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("weather")}>Weather</button>
        <button onClick={() => setActiveTab("currency")}>Currency</button>
        <button onClick={() => setActiveTab("quote")}>Quotes</button>
      </div>

      {activeTab === "weather" && <Weather />}
      {activeTab === "currency" && <CurrencyConverter />}
      {activeTab === "quote" && <QuoteGenerator />}
    </div>
  );
}

function Weather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.open-meteo.com/v1/forecast?latitude=17.385&longitude=78.4867&current_weather=true")
      .then((res) => {
        setData(res.data.current_weather);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading weather...</p>;
  return (
    <div>
      <h2>🌦️ Weather</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>Wind Speed: {data.windspeed} km/h</p>
    </div>
  );
}

function CurrencyConverter() {
  const [rate, setRate] = useState(null);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/INR")
      .then((res) => setRate(res.data.rates));
  }, []);

  if (!rate) return <p>Loading currency...</p>;

  return (
    <div>
      <h2>💱 Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <p>USD: {(amount * rate.USD).toFixed(2)}</p>
      <p>EUR: {(amount * rate.EUR).toFixed(2)}</p>
    </div>
  );
}

function QuoteGenerator() {
  const [quote, setQuote] = useState(null);

  const getQuote = () => {
    axios.get("https://api.quotable.io/random").then((res) => setQuote(res.data));
  };

  useEffect(() => {
    getQuote();
  }, []);

  if (!quote) return <p>Loading quote...</p>;

  return (
    <div>
      <h2>💬 Quote Generator</h2>
      <p>"{quote.content}"</p>
      <p>— {quote.author}</p>
      <button onClick={getQuote}>New Quote</button>
    </div>
  );
}

export default App;
