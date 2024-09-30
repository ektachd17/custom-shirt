import React, { useEffect, useMemo, useState } from 'react';

interface PriceDisplay {
  price: number;
}

type ExchangeRates = {
  [currency: string]: number; 
};

const CurrencyExchange: React.FC<PriceDisplay> = ({ price }) => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [convertedPrice, setConvertedPrice] = useState<number>(price);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = useMemo(() => process.env.NX_API_BASE_URL || 'http://localhost:8080', []);
  // Fetch exchange rates from the backend
  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/exchange-rates`); // Request from your backend
      if (!response.ok) {
        throw new Error('Error fetching exchange rates');
      }
      const data = await response.json();
      setExchangeRates(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again later.');
    }
  };

  // Handle currency change
  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    const rate = exchangeRates[currency];
    if (rate) {
      setConvertedPrice(parseFloat((price * rate).toFixed(2)));
    }
  };
  
  useEffect(() => {
    if (exchangeRates[selectedCurrency]) {
      setConvertedPrice(parseFloat((price * exchangeRates[selectedCurrency]).toFixed(2)));
    } else {
      setConvertedPrice(parseFloat(price.toFixed(2)));
    }
  }, [price, selectedCurrency, exchangeRates]);

  useEffect(() => {
    fetchExchangeRates(); // Fetch exchange rates when the component mounts
  }, []);

  return (
    <div>
      {/* Dropdown for Target Currency */}
      <select value={selectedCurrency} onChange={(event) => handleCurrencyChange(event.target.value)}>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="EUR">EUR</option>
      </select>
      
      {/* Display the Exchange Rate */}
      {convertedPrice !== null ? (
        <p>
          {convertedPrice}
        </p>
      ) : (
        <p>Loading exchange rate...</p>
      )}

      {/* Display Error Message if API Fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CurrencyExchange;
