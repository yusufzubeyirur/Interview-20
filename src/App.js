import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const CURRENCY_NAME_TO_CODE = {
  "United Arab Emirates Dirham": "AED",
  "Afghan Afghani": "AFN",
  "Albanian Lek": "ALL",
  "Armenian Dram": "AMD",
  "Netherlands Antillean Guilder": "ANG",
  "Angolan Kwanza": "AOA",
  "Argentine Peso": "ARS",
  "Australian Dollar": "AUD",
  "Aruban Florin": "AWG",
  "Azerbaijani Manat": "AZN",
  "Bosnia-Herzegovina Convertible Mark": "BAM",
  "Barbadian Dollar": "BBD",
  "Bangladeshi Taka": "BDT",
  "Bulgarian Lev": "BGN",
  "Bahraini Dinar": "BHD",
  "Burundian Franc": "BIF",
  "Bermudan Dollar": "BMD",
  "Brunei Dollar": "BND",
  "Bolivian Boliviano": "BOB",
  "Brazilian Real": "BRL",
  "Bahamian Dollar": "BSD",
  Bitcoin: "BTC",
  "Bhutanese Ngultrum": "BTN",
  "Botswanan Pula": "BWP",
  "Belarusian Ruble": "BYN",
  "Belize Dollar": "BZD",
  "Canadian Dollar": "CAD",
  "Congolese Franc": "CDF",
  "Swiss Franc": "CHF",
  "Chilean Unit of Account (UF)": "CLF",
  "Chilean Peso": "CLP",
  "Chinese Yuan (Offshore)": "CNH",
  "Chinese Yuan": "CNY",
  "Colombian Peso": "COP",
  "Costa Rican Colón": "CRC",
  "Cuban Convertible Peso": "CUC",
  "Cuban Peso": "CUP",
  "Cape Verdean Escudo": "CVE",
  "Czech Republic Koruna": "CZK",
  "Djiboutian Franc": "DJF",
  "Danish Krone": "DKK",
  "Dominican Peso": "DOP",
  "Algerian Dinar": "DZD",
  "Egyptian Pound": "EGP",
  "Eritrean Nakfa": "ERN",
  "Ethiopian Birr": "ETB",
  Euro: "EUR",
  "Fijian Dollar": "FJD",
  "Falkland Islands Pound": "FKP",
  "British Pound Sterling": "GBP",
  "Georgian Lari": "GEL",
  "Guernsey Pound": "GGP",
  "Ghanaian Cedi": "GHS",
  "Gibraltar Pound": "GIP",
  "Gambian Dalasi": "GMD",
  "Guinean Franc": "GNF",
  "Guatemalan Quetzal": "GTQ",
  "Guyanaese Dollar": "GYD",
  "Hong Kong Dollar": "HKD",
  "Honduran Lempira": "HNL",
  "Croatian Kuna": "HRK",
  "Haitian Gourde": "HTG",
  "Hungarian Forint": "HUF",
  "Indonesian Rupiah": "IDR",
  "Israeli New Sheqel": "ILS",
  "Manx pound": "IMP",
  "Indian Rupee": "INR",
  "Iraqi Dinar": "IQD",
  "Iranian Rial": "IRR",
  "Icelandic Króna": "ISK",
  "Jersey Pound": "JEP",
  "Jamaican Dollar": "JMD",
  "Jordanian Dinar": "JOD",
  "Japanese Yen": "JPY",
  "Kenyan Shilling": "KES",
  "Kyrgystani Som": "KGS",
  "Cambodian Riel": "KHR",
  "Comorian Franc": "KMF",
  "North Korean Won": "KPW",
  "South Korean Won": "KRW",
  "Kuwaiti Dinar": "KWD",
  "Cayman Islands Dollar": "KYD",
  "Kazakhstani Tenge": "KZT",
  "Laotian Kip": "LAK",
  "Lebanese Pound": "LBP",
  "Sri Lankan Rupee": "LKR",
  "Liberian Dollar": "LRD",
  "Lesotho Loti": "LSL",
  "Libyan Dinar": "LYD",
  "Moroccan Dirham": "MAD",
  "Moldovan Leu": "MDL",
  "Malagasy Ariary": "MGA",
  "Macedonian Denar": "MKD",
  "Myanma Kyat": "MMK",
  "Mongolian Tugrik": "MNT",
  "Macanese Pataca": "MOP",
  "Mauritanian Ouguiya": "MRU",
  "Mauritian Rupee": "MUR",
  "Maldivian Rufiyaa": "MVR",
  "Malawian Kwacha": "MWK",
  "Mexican Peso": "MXN",
  "Malaysian Ringgit": "MYR",
  "Mozambican Metical": "MZN",
  "Namibian Dollar": "NAD",
  "Nigerian Naira": "NGN",
  "Nicaraguan Córdoba": "NIO",
  "Norwegian Krone": "NOK",
  "Nepalese Rupee": "NPR",
  "New Zealand Dollar": "NZD",
  "Omani Rial": "OMR",
  "Panamanian Balboa": "PAB",
  "Peruvian Nuevo Sol": "PEN",
  "Papua New Guinean Kina": "PGK",
  "Philippine Peso": "PHP",
  "Pakistani Rupee": "PKR",
  "Polish Zloty": "PLN",
  "Paraguayan Guarani": "PYG",
  "Qatari Rial": "QAR",
  "Romanian Leu": "RON",
  "Serbian Dinar": "RSD",
  "Russian Ruble": "RUB",
  "Rwandan Franc": "RWF",
  "Saudi Riyal": "SAR",
  "Solomon Islands Dollar": "SBD",
  "Seychellois Rupee": "SCR",
  "Sudanese Pound": "SDG",
  "Swedish Krona": "SEK",
  "Singapore Dollar": "SGD",
  "Saint Helena Pound": "SHP",
  "Sierra Leonean Leone": "SLL",
  "Somali Shilling": "SOS",
  "Surinamese Dollar": "SRD",
  "South Sudanese Pound": "SSP",
  "São Tomé and Príncipe Dobra (pre-2018)": "STD",
  "São Tomé and Príncipe Dobra": "STN",
  "Salvadoran Colón": "SVC",
  "Syrian Pound": "SYP",
  "Swazi Lilangeni": "SZL",
  "Thai Baht": "THB",
  "Tajikistani Somoni": "TJS",
  "Turkmenistani Manat": "TMT",
  "Tunisian Dinar": "TND",
  "Tongan Pa'anga": "TOP",
  "Turkish Lira": "TRY",
  "Trinidad and Tobago Dollar": "TTD",
  "New Taiwan Dollar": "TWD",
  "Tanzanian Shilling": "TZS",
  "Ukrainian Hryvnia": "UAH",
  "Ugandan Shilling": "UGX",
  "United States Dollar": "USD",
  "Uruguayan Peso": "UYU",
  "Uzbekistan Som": "UZS",
  "Venezuelan Bolívar Soberano": "VES",
  "Vietnamese Dong": "VND",
  "Vanuatu Vatu": "VUV",
  "Samoan Tala": "WST",
  "CFA Franc BEAC": "XAF",
  "East Caribbean Dollar": "XCD",
  "Special Drawing Rights": "XDR",
  "CFA Franc BCEAO": "XOF",
  "CFP Franc": "XPF",
  "Yemeni Rial": "YER",
  "South African Rand": "ZAR",
  "Zambian Kwacha": "ZMW",
  "Zimbabwean Dollar": "ZWL",
};

function App() {
  return <CurrencyConverter />;
}

const CurrencyConverter = () => {
  const [result, setResult] = useState("");
  const [convertCurrencyFrom, setConvertCurrencyFrom] = useState("");
  const [convertCurrencyTo, setConvertCurrencyTo] = useState("");
  const [quantityMoney, setQuantityMoney] = useState("");

  const handleGetCurrency = () => {
    if (!result) {
      const YOUR_ACCESS_KEY = "c8664b22de93729612c19c8a51ed4dd1";
      axios
        .get(
          `http://api.exchangerate.host/convert?access_key=${YOUR_ACCESS_KEY}&from=${convertCurrencyFrom}&to=${convertCurrencyTo}&amount=${quantityMoney}&format=1`
        )
        .then((response) => {
          console.log(response.data.result);
          setResult(response.data.result);
        });
    }
  };

  const handleKeyPress = useMemo(() => {
    return (e) => {
      if (
        e.key === "Enter" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "SELECT"
      ) {
        handleGetCurrency();
      }
    };
  }, [quantityMoney, convertCurrencyFrom, convertCurrencyTo]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div>
      <div className="flex items-center justify-center mt-10">
        <div>
          <span>Convert</span>
          <input
            className="border border-gray-700 m-5 text-center"
            style={{ height: "50px" }}
            type="number"
            value={quantityMoney}
            onChange={(e) => setQuantityMoney(e.target.value)}
          />
          <span>from</span>
          <select
            name="currency"
            id="currency"
            className="border border-gray-700 m-5 text-center"
            style={{ height: "50px" }}
            value={convertCurrencyFrom}
            onChange={(e) => setConvertCurrencyFrom(e.target.value)}
          >
            <option value="" disabled>
              Select Currency From
            </option>
            {Object.entries(CURRENCY_NAME_TO_CODE).map(([name, code]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <span>to</span>
          <select
            name="currency"
            id="currency"
            className="border border-gray-700 m-5 text-center"
            style={{ height: "50px" }}
            value={convertCurrencyTo}
            onChange={(e) => setConvertCurrencyTo(e.target.value)}
          >
            <option value="" disabled>
              Select Currency To
            </option>
            {Object.entries(CURRENCY_NAME_TO_CODE).map(([name, code]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="flex items-center justify-center mt-5 font-bold">
            {result &&
              `${quantityMoney} ${convertCurrencyFrom} = ${result} 
            ${convertCurrencyTo}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
