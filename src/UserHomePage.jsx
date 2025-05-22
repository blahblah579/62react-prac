import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import Icon from "@mdi/react";
import "cally";

// import { useAuth } from "./contexts/AuthContext";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useUserInvoices } from "./customHooks/useUserInvoices"; // Real-time hook for user invoices

import {
  mdiChevronRight,
  mdiPlus,
  mdiDelete,
  mdiChevronDown,
  mdiPlusCircle,
  mdiCircleMedium,
  mdiCloseCircle,
} from "@mdi/js";
// import InvoiceInfo from "./InvoiceInfo";
import img1 from "./assets/illustration-empty.svg";
import { v4 as uuidv4 } from "uuid";

const HomePage = ({}) => {
  // 1. Destructure out the real-time list and CRUD functions from our hook
  const { invoices, loading, addInvoice } = useUserInvoices();
  // const { currentUser, logout } = useAuth();
  // 2. React Router navigation for detail views
  const navigate = useNavigate();

  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [filterBy, setFilterBy] = useState([]);
  // const [currentInvoice, setCurrentInvoice] = useState(null);

  // Filter MAIN List on changing filter options
  useEffect(() => {
    if (filterBy.length === 0) {
      setFilteredInvoices(invoices);
      return;
    }
    const nwList = invoices.filter((invoice) =>
      filterBy.includes(invoice.status)
    );
    setFilteredInvoices(nwList);
  }, [filterBy, invoices]);

  // Filter by status
  const handleFilter = (currFilter) => {
    setFilterBy((prevFilters) =>
      prevFilters.includes(currFilter)
        ? prevFilters.filter((s) => s !== currFilter)
        : [...prevFilters, currFilter]
    );
  };

  // Check if string is Empty
  const isEmpty = (s) => {
    return s.length === 0;
  };

  const currencyNames = [
    "Afghan Afghani", // AFN
    "Albanian Lek", // ALL
    "Algerian Dinar", // DZD
    "Angolan Kwanza", // AOA
    "Argentine Peso", // ARS
    "Armenian Dram", // AMD
    "Aruban Florin", // AWG
    "Australian Dollar", // AUD
    "Azerbaijani Manat", // AZN
    "Bahamian Dollar", // BSD
    "Bahraini Dinar", // BHD
    "Bangladeshi Taka", // BDT
    "Barbadian Dollar", // BBD
    "Belarusian Ruble", // BYN
    "Belize Dollar", // BZD
    "Bermudian Dollar", // BMD
    "Bhutanese Ngultrum", // BTN
    "Bolivian Boliviano", // BOB
    "Bosnia and Herzegovina Convertible Mark", // BAM
    "Botswanan Pula", // BWP
    "Brazilian Real", // BRL
    "British Pound Sterling", // GBP
    "Bruneian Dollar", // BND
    "Bulgarian Lev", // BGN
    "Burundian Franc", // BIF
    "Cambodian Riel", // KHR
    "Canadian Dollar", // CAD
    "Cape Verdean Escudo", // CVE
    "Cayman Islands Dollar", // KYD
    "Central African CFA Franc", // XAF
    "Chilean Peso", // CLP
    "Chinese Yuan", // CNY
    "Colombian Peso", // COP
    "Comorian Franc", // KMF
    "Congolese Franc", // CDF
    "Costa Rican Colón", // CRC
    "Croatian Kuna", // HRK
    "Cuban Peso", // CUP
    "Czech Koruna", // CZK
    "Danish Krone", // DKK
    "Djiboutian Franc", // DJF
    "Dominican Peso", // DOP
    "Egyptian Pound", // EGP
    "Emirati Dirham", // AED
    "Eritrean Nakfa", // ERN
    "Ethiopian Birr", // ETB
    "Fijian Dollar", // FJD
    "Hungarian Forint", // HUF
    "Gambian Dalasi", // GMD
    "Georgian Lari", // GEL
    "Ghanaian Cedi", // GHS
    "Gibraltar Pound", // GIP
    "Guatemalan Quetzal", // GTQ
    "Guinean Franc", // GNF
    "Guyanese Dollar", // GYD
    "Haitian Gourde", // HTG
    "Hong Kong Dollar", // HKD
    "Icelandic Króna", // ISK
    "Indian Rupee", // INR
    "Indonesian Rupiah", // IDR
    "Iranian Rial", // IRR
    "Iraqi Dinar", // IQD
    "Israeli New Shekel", // ILS
    "Jamaican Dollar", // JMD
    "Japanese Yen", // JPY
    "Jordanian Dinar", // JOD
    "Kazakhstani Tenge", // KZT
    "Kenyan Shilling", // KES
    "Kuwaiti Dinar", // KWD
    "Kyrgystani Som", // KGS
    "Lao Kip", // LAK
    "Lebanese Pound", // LBP
    "Lesotho Loti", // LSL
    "Liberian Dollar", // LRD
    "Libyan Dinar", // LYD
    "Macanese Pataca", // MOP
    "Macedonian Denar", // MKD
    "Malagasy Ariary", // MGA
    "Malawian Kwacha", // MWK
    "Malaysian Ringgit", // MYR
    "Maldivian Rufiyaa", // MVR
    "Mauritanian Ouguiya", // MRU
    "Mauritian Rupee", // MUR
    "Mexican Peso", // MXN
    "Moldovan Leu", // MDL
    "Mongolian Tögrög", // MNT
    "Moroccan Dirham", // MAD
    "Mozambican Metical", // MZN
    "Myanmar Kyat", // MMK
    "Namibian Dollar", // NAD
    "Nepalese Rupee", // NPR
    "Netherlands Antillean Guilder", // ANG
    "New Zealand Dollar", // NZD
    "Nicaraguan Córdoba", // NIO
    "Nigerian Naira", // NGN
    "North Korean Won", // KPW
    "Norwegian Krone", // NOK
    "Omani Rial", // OMR
    "Pakistani Rupee", // PKR
    "Panamanian Balboa", // PAB
    "Papua New Guinean Kina", // PGK
    "Paraguayan Guarani", // PYG
    "Peruvian Sol", // PEN
    "Philippine Peso", // PHP
    "Polish Złoty", // PLN
    "Qatari Rial", // QAR
    "Romanian Leu", // RON
    "Russian Ruble", // RUB
    "Rwandan Franc", // RWF
    "Saint Helenian Pound", // SHP
    "Samoan Tala", // WST
    "São Tomé and Príncipe Dobra", // STN
    "Saudi Riyal", // SAR
    "Serbian Dinar", // RSD
    "Seychellois Rupee", // SCR
    "Sierra Leonean Leone", // SLL
    "Singapore Dollar", // SGD
    "Solomon Islands Dollar", // SBD
    "Somali Shilling", // SOS
    "South African Rand", // ZAR
    "South Korean Won", // KRW
    "South Sudanese Pound", // SSP
    "Sri Lankan Rupee", // LKR
    "Sudanese Pound", // SDG
    "Swedish Krona", // SEK
    "Swiss Franc", // CHF
    "Surinamese Dollar", // SRD
    "Swazi Lilangeni", // SZL
    "Syrian Pound", // SYP
    "Tajikistani Somoni", // TJS
    "Tanzanian Shilling", // TZS
    "Thai Baht", // THB
    "Tongan Paʻanga", // TOP
    "Trinidad and Tobago Dollar", // TTD
    "Tunisian Dinar", // TND
    "Turkish Lira", // TRY
    "Turkmenistani Manat", // TMT
    "Ugandan Shilling", // UGX
    "Ukrainian Hryvnia", // UAH
    "United States Dollar", // USD
    "Uruguayan Peso", // UYU
    "Uzbekistan Som", // UZS
    "Vanuatu Vatu", // VUV
    "Venezuelan Bolívar", // VES
    "Vietnamese Đồng", // VND
    "Yemeni Rial", // YER
    "Zambian Kwacha", // ZMW
    "Zimbabwean Dollar", // ZWL
  ];

  const currencySymbols = [
    "؋", // Afghan Afghani
    "L", // Albanian Lek
    "دج", // Algerian Dinar
    "Kz", // Angolan Kwanza
    "$", // Argentine Peso
    "֏", // Armenian Dram
    "ƒ", // Aruban Florin
    "A$", // Australian Dollar
    "₼", // Azerbaijani Manat
    "$", // Bahamian Dollar
    ".د.ب", // Bahraini Dinar
    "৳", // Bangladeshi Taka
    "$", // Barbadian Dollar
    "Br", // Belarusian Ruble
    "$", // Belize Dollar
    "$", // Bermudian Dollar
    "Nu.", // Bhutanese Ngultrum
    "Bs.", // Bolivian Boliviano
    "KM", // Bosnia and Herzegovina Convertible Mark
    "P", // Botswanan Pula
    "R$", // Brazilian Real
    "£", // British Pound Sterling
    "$", // Bruneian Dollar
    "лв", // Bulgarian Lev
    "FBu", // Burundian Franc
    "៛", // Cambodian Riel
    "$", // Canadian Dollar
    "Esc", // Cape Verdean Escudo
    "$", // Cayman Islands Dollar
    "CFA", // Central African CFA Franc
    "$", // Chilean Peso
    "¥", // Chinese Yuan
    "$", // Colombian Peso
    "CF", // Comorian Franc
    "FC", // Congolese Franc
    "₡", // Costa Rican Colón
    "kn", // Croatian Kuna
    "$", // Cuban Peso
    "Kč", // Czech Koruna
    "kr", // Danish Krone
    "Fdj", // Djiboutian Franc
    "RD$", // Dominican Peso
    "ج.م", // Egyptian Pound
    "د.إ", // Emirati Dirham
    "Nfk", // Eritrean Nakfa
    "Br", // Ethiopian Birr
    "$", // Fijian Dollar
    "Ft", // Hungarian Forint
    "D", // Gambian Dalasi
    "₾", // Georgian Lari
    "₵", // Ghanaian Cedi
    "£", // Gibraltar Pound
    "Q", // Guatemalan Quetzal
    "FG", // Guinean Franc
    "$", // Guyanese Dollar
    "G", // Haitian Gourde
    "$", // Hong Kong Dollar
    "kr", // Icelandic Króna
    "₹", // Indian Rupee
    "Rp", // Indonesian Rupiah
    "﷼", // Iranian Rial
    "ع.د", // Iraqi Dinar
    "₪", // Israeli New Shekel
    "J$", // Jamaican Dollar
    "¥", // Japanese Yen
    "د.ا", // Jordanian Dinar
    "₸", // Kazakhstani Tenge
    "KSh", // Kenyan Shilling
    "د.ك", // Kuwaiti Dinar
    "с", // Kyrgystani Som
    "₭", // Lao Kip
    "ل.ل", // Lebanese Pound
    "L", // Lesotho Loti
    "$", // Liberian Dollar
    "LD", // Libyan Dinar
    "MOP$", // Macanese Pataca
    "ден", // Macedonian Denar
    "Ar", // Malagasy Ariary
    "MK", // Malawian Kwacha
    "RM", // Malaysian Ringgit
    "Rf", // Maldivian Rufiyaa
    "UM", // Mauritanian Ouguiya
    "₨", // Mauritian Rupee
    "$", // Mexican Peso
    "L", // Moldovan Leu
    "₮", // Mongolian Tögrög
    "MAD", // Moroccan Dirham
    "MT", // Mozambican Metical
    "K", // Myanmar Kyat
    "$", // Namibian Dollar
    "₨", // Nepalese Rupee
    "ƒ", // Netherlands Antillean Guilder
    "$", // New Zealand Dollar
    "C$", // Nicaraguan Córdoba
    "₦", // Nigerian Naira
    "₩", // North Korean Won
    "kr", // Norwegian Krone
    "ر.ع.", // Omani Rial
    "₨", // Pakistani Rupee
    "B/.", // Panamanian Balboa
    "K", // Papua New Guinean Kina
    "₲", // Paraguayan Guarani
    "S/", // Peruvian Sol
    "₱", // Philippine Peso
    "zł", // Polish Złoty
    "ر.ق", // Qatari Rial
    "lei", // Romanian Leu
    "₽", // Russian Ruble
    "FRw", // Rwandan Franc
    "£", // Saint Helenian Pound
    "WS$", // Samoan Tala
    "Db", // São Tomé and Príncipe Dobra
    "﷼", // Saudi Riyal
    "дин.", // Serbian Dinar
    "₨", // Seychellois Rupee
    "Le", // Sierra Leonean Leone
    "$", // Singapore Dollar
    "$", // Solomon Islands Dollar
    "Sh", // Somali Shilling
    "R", // South African Rand
    "₩", // South Korean Won
    "£", // South Sudanese Pound
    "Rs", // Sri Lankan Rupee
    "ج.س.", // Sudanese Pound
    "kr", // Swedish Krona
    "CHF", // Swiss Franc
    "$", // Surinamese Dollar
    "L", // Swazi Lilangeni
    "£", // Syrian Pound
    "Ѕ", // Tajikistani Somoni
    "TSh", // Tanzanian Shilling
    "฿", // Thai Baht
    "T$", // Tongan Paʻanga
    "TT$", // Trinidad and Tobago Dollar
    "د.ت", // Tunisian Dinar
    "₺", // Turkish Lira
    "m", // Turkmenistani Manat
    "USh", // Ugandan Shilling
    "₴", // Ukrainian Hryvnia
    "$", // United States Dollar
    "$", // Uruguayan Peso
    "so'm", // Uzbekistan Som
    "VT", // Vanuatu Vatu
    "Bs", // Venezuelan Bolívar
    "₫", // Vietnamese Đồng
    "﷼", // Yemeni Rial
    "ZK", // Zambian Kwacha
    "$", // Zimbabwean Dollar
  ];

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  // Input field's ref
  const billFromName = useRef("");
  const billFromStreetAddress = useRef("");
  const billFromCity = useRef("");
  const billFromPostCode = useRef("");
  const billFromCountry = useRef("India");

  const billToName = useRef("");
  const billToEmail = useRef("");
  const billToStreetAddress = useRef("");
  const billToCity = useRef("");
  const billToPostCode = useRef("");
  const billToCountry = useRef("India");
  const date = useRef("");
  const [invoiceDate, setInvoiceDate] = useState("Not yet Specified");
  const paymentTerms = useRef(null);

  // Discard Button
  const discardRef = useRef(null);

  function handleDateFormat(date) {
    // 1. Split the string into [year, month, day]
    const [year, month, day] = date.split("-");

    // 2. Reassemble into "DD-MM-YYYY" and return
    return `${day}-${month}-${year}`;
  }

  function calculatePaymentDueBy(invoiceDate, paymentTerms) {
    if (!paymentTerms) paymentTerms = 7;
    else paymentTerms = parseInt(paymentTerms.current.value);
    if (invoiceDate === "Not yet Specified") return "Not yet Specified";
    // console.log(invoiceDate);
    // console.log(paymentTerms);

    // 1. Split "DD-MM-YYYY" into [dayStr, monthStr, yearStr]
    const [dayStr, monthStr, yearStr] = invoiceDate.split("-"); // :contentReference[oaicite:14]{index=14}

    // 2. Parse parts to integers
    const day = Number.parseInt(dayStr, 10); // :contentReference[oaicite:15]{index=15}
    const month = Number.parseInt(monthStr, 10) - 1; // zero-based month index         // :contentReference[oaicite:16]{index=16}
    const year = Number.parseInt(yearStr, 10);

    // 3. Create a Date object
    const date = new Date(year, month, day); // :contentReference[oaicite:17]{index=17}

    // 4. Add the specified number of days
    date.setDate(date.getDate() + paymentTerms); // :contentReference[oaicite:18]{index=18}

    // 5. Format back to "DD-MM-YYYY"
    const dd = String(date.getDate()).padStart(2, "0"); // :contentReference[oaicite:19]{index=19}
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear(); // :contentReference[oaicite:20]{index=20}

    return `${dd}-${mm}-${yyyy}`; // :contentReference[oaicite:21]{index=21}
  }

  const projectDesc = useRef("");
  const currency = useRef(null);
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  // ITEM LIST in the SIDEBAR
  const [itemList, setItemList] = useState([
    {
      id: 0,
      name: "New Item",
      quantity: 1,
      price: 0,
      itemTotal: 0,
    },
  ]);

  const addNewListItem = () => {
    //add new item to itemList of above type ,generate new id
    // const nwId = generateId();
    const nwId = uuidv4();
    const item = {
      id: nwId,
      name: "New Item",
      quantity: 1,
      price: 0.0,
      itemTotal: 0.0,
    };
    setItemList((prevList) => [...prevList, item]);
  };

  const handleNameChange = (id, newName) => {
    setItemList((prevList) =>
      prevList.map(
        (item) =>
          item.id === id
            ? { ...item, name: newName } // only this item changes
            : item // all others stay the same
      )
    );
  };

  const handleQuantityChange = (id, newQty) => {
    setItemList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQty < 0 ? 0 : newQty,
              itemTotal: (newQty < 0 ? 0 : newQty) * item.price,
            }
          : item
      )
    );
  };

  const handlePriceChange = (id, newPrice) => {
    setItemList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? {
              ...item,
              price: newPrice < 0 ? 0 : newPrice,
              itemTotal: (newPrice < 0 ? 0 : newPrice) * item.quantity,
            }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    if (itemList.length === 1) return;
    setItemList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const calculateTotalAmount = () => {
    let ans = 0;
    itemList.map((item) => (ans += item.itemTotal));
    // console.log(ans);
    return ans;
  };

  // Currency Change
  const handleCurrencyChange = (nwCurrency) => {
    const idx = currencyNames.indexOf(nwCurrency);
    setCurrencySymbol(currencySymbols[idx]);
  };

  // BOTTOM BUTTONS FUNCTIONALITY
  const handleDiscard = () => {
    // reset everything
    billFromName.current.value = "";
    billFromStreetAddress.current.value = "";
    billFromCity.current.value = "";
    billFromPostCode.current.value = "";
    billFromCountry.current.value = "India";

    billToName.current.value = "";
    billToEmail.current.value = "";
    billToStreetAddress.current.value = "";
    billToCity.current.value = "";
    billToPostCode.current.value = "";
    billToCountry.current.value = "India";

    setInvoiceDate("Not yet Specified");
    date.current.value = "";

    paymentTerms.current.value = 7;
    projectDesc.current.value = "";
    currency.current.value = "Indian Rupee";
    setCurrencySymbol("₹");

    setItemList([
      {
        id: 0,
        name: "New Item",
        quantity: 1,
        price: 0,
        itemTotal: 0,
      },
    ]);
  };

  const handleSaveAsDraft = async () => {
    // const nwId = generateId();
    const nwStatus = "draft";
    const nwTotalAmount = calculateTotalAmount();
    const nwBillFrom = {
      name: billFromName.current.value,
      streetAddress: billFromStreetAddress.current.value,
      city: billFromCity.current.value,
      postCode: billFromPostCode.current.value,
      country: billFromCountry.current.value,
    };
    const nwBillTo = {
      name: billToName.current.value,
      email: billToEmail.current.value,
      streetAddress: billToStreetAddress.current.value,
      city: billToCity.current.value,
      postCode: billToPostCode.current.value,
      country: billToCountry.current.value,
    };
    const nwInvoiceDate = invoiceDate;
    const nwPaymentDueBy = calculatePaymentDueBy(invoiceDate, paymentTerms);
    const nwCurrency = currency.current.value;
    const nwCurrencySymbol = currencySymbol;
    const nwProjectDesc = projectDesc.current.value;
    const nwItemList = itemList;

    const nwInvoice = {
      // id: nwId,
      status: nwStatus,
      totalAmount: nwTotalAmount,
      billFrom: nwBillFrom,
      billTo: nwBillTo,
      invoiceDate: nwInvoiceDate,
      paymentDueBy: nwPaymentDueBy,
      currencyName: nwCurrency,
      currencySymbol: nwCurrencySymbol,
      projectDesc: nwProjectDesc,
      itemList: nwItemList,
    };
    handleDiscard();
    try {
      // console.log(nwInvoice);
      await addInvoice(nwInvoice);
    } catch (err) {
      console.error("Error adding invoice:", err);
      alert("Failed to save invoice");
    }
    // setInvoices((prevList) => [...prevList, nwInvoice]);
    // handleDiscard();
  };

  // ERRORS (for hint below each input)
  // BILL FROM
  const [billFromNameError, setBillFromNameError] = useState(false);
  const [billFromStreetAddressError, setBillFromStreetAddressError] =
    useState(false);
  const [billFromCityError, setBillFromCityError] = useState(false);
  const [billFromPostCodeError, setBillFromPostCodeError] = useState(false);

  // BILL TO
  const [billToNameError, setBillToNameError] = useState(false);
  const [billToEmailError, setBillToEmailError] = useState(false);
  const [billToEmailErrorMessage, setBillToEmailErrorMessage] = useState("");
  const [billToStreetAddressError, setBillToStreetAddressError] =
    useState(false);
  const [billToCityError, setBillToCityError] = useState(false);
  const [billToPostCodeError, setBillToPostCodeError] = useState(false);

  const [invoiceDateError, setInvoiceDateError] = useState(false);
  const [projectDescError, setProjectDescError] = useState(false);

  // BILL FROM
  const checkBillFromNameError = () => {
    const nwBillFromName = billFromName.current.value.trim();
    setBillFromNameError(isEmpty(nwBillFromName) ? true : false);
    return;
  };

  const checkBillFromStreetAddressError = () => {
    const nwBillFromStreetAddress = billFromStreetAddress.current.value.trim();
    setBillFromStreetAddressError(
      isEmpty(nwBillFromStreetAddress) ? true : false
    );
    return;
  };

  const checkBillFromCityError = () => {
    const nwBillFromCity = billFromCity.current.value.trim();
    setBillFromCityError(isEmpty(nwBillFromCity) ? true : false);
    return;
  };

  const checkBillFromPostCodeError = () => {
    const nwBillFromPostCode = billFromPostCode.current.value.trim();
    setBillFromPostCodeError(isEmpty(nwBillFromPostCode) ? true : false);
    return;
  };

  // BILL TO
  const checkBillToNameError = () => {
    const nwBillToName = billToName.current.value.trim();
    setBillToNameError(isEmpty(nwBillToName) ? true : false);
    return;
  };

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const checkBillToEmailError = () => {
    const nwBillToEmail = billToEmail.current.value.trim();
    if (isEmpty(nwBillToEmail)) {
      setBillToEmailError(true);
      setBillToEmailErrorMessage("cannot be empty");
      return;
    }
    if (!isValidEmail(nwBillToEmail)) {
      setBillToEmailError(true);
      setBillToEmailErrorMessage("invalid email");
      return;
    }
    setBillToEmailError(false);
    return;
  };

  const checkBillToStreetAddressError = () => {
    const nwBillToStreetAddress = billToStreetAddress.current.value.trim();
    setBillToStreetAddressError(isEmpty(nwBillToStreetAddress) ? true : false);
    return;
  };

  const checkBillToCityError = () => {
    const nwBillToCity = billToCity.current.value.trim();
    setBillToCityError(isEmpty(nwBillToCity) ? true : false);
    return;
  };

  const checkBillToPostCodeError = () => {
    const nwBillToPostCode = billToPostCode.current.value.trim();
    setBillToPostCodeError(isEmpty(nwBillToPostCode) ? true : false);
    return;
  };

  function checkFormat(invoiceDate) {
    // Regex explanation:
    // ^                         start of string
    // (0[1-9]|[12][0-9]|3[01])  day 01–09,10–29,30–31
    // -                         literal hyphen
    // (0[1-9]|1[0-2])           month 01–09,10–12
    // -                         literal hyphen
    // \d{4}                     exactly four digits (year)
    // $                         end of string
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    return regex.test(invoiceDate);
  }

  const checkInvoiceDateError = () => {
    // console.log(invoiceDate);
    if (invoiceDate === "Not yet Specified") {
      setInvoiceDateError(true);
      return;
    }
    if (!checkFormat(invoiceDate)) {
      setInvoiceDateError(true);
      return;
    }
    setInvoiceDateError(false);
    return;
  };

  const [hasInvoiceDateEffectRun, setHasInvoiceDateEffectRun] = useState(0);

  useEffect(() => {
    if (hasInvoiceDateEffectRun < 2) {
      // First mount in the app’s lifetime: skip the check
      setHasInvoiceDateEffectRun((p) => p + 1);
      return;
    }
    // All subsequent runs—whether real updates or StrictMode re‑mounts—will execute:
    checkInvoiceDateError();
  }, [invoiceDate]);

  const handleDateChange = () => {
    setInvoiceDate(handleDateFormat(date.current.value));
  };

  const checkProjectDescError = () => {
    const nwProjectDesc = projectDesc.current.value.trim();
    setProjectDescError(isEmpty(nwProjectDesc) ? true : false);
    return;
  };

  const handleSaveInvoice = async () => {
    // BILL FROM
    const nwBillFromName = billFromName.current.value.trim();
    if (isEmpty(nwBillFromName)) {
      setBillFromNameError(true);
      return;
    }

    const nwBillFromStreetAddress = billFromStreetAddress.current.value.trim();
    if (isEmpty(nwBillFromStreetAddress)) {
      setBillFromStreetAddressError(true);
      return;
    }

    const nwBillFromCity = billFromCity.current.value.trim();
    if (isEmpty(nwBillFromCity)) {
      setBillFromCityError(true);
      return;
    }

    const nwBillFromPostCode = billFromPostCode.current.value.trim();
    if (isEmpty(nwBillFromPostCode)) {
      setBillFromPostCodeError(true);
      return;
    }

    const nwBillFromCountry = billFromCountry.current.value;

    // BILL TO
    const nwBillToName = billToName.current.value.trim();
    if (isEmpty(nwBillToName)) {
      setBillToNameError(true);
      return;
    }

    const nwBillToEmail = billToEmail.current.value.trim();
    if (isEmpty(nwBillToEmail)) {
      setBillToEmailError(true);
      setBillToEmailErrorMessage("cannot be empty");
      return;
    }
    if (!isValidEmail(nwBillToEmail)) {
      setBillToEmailError(true);
      setBillToEmailErrorMessage("invalid email");
      return;
    }

    const nwBillToStreetAddress = billToStreetAddress.current.value.trim();
    if (isEmpty(nwBillToStreetAddress)) {
      setBillToStreetAddressError(true);
      return;
    }

    const nwBillToCity = billToCity.current.value.trim();
    if (isEmpty(nwBillToCity)) {
      setBillToCityError(true);
      return;
    }

    const nwBillToPostCode = billToPostCode.current.value.trim();
    if (isEmpty(nwBillToPostCode)) {
      setBillToPostCodeError(true);
      return;
    }

    const nwBillToCountry = billToCountry.current.value;

    const nwInvoiceDate = invoiceDate;
    if (nwInvoiceDate === "Not yet Specified") {
      setInvoiceDateError(true);
      return;
    }

    const nwPaymentDueBy = calculatePaymentDueBy(nwInvoiceDate, paymentTerms);

    const nwProjectDesc = projectDesc.current.value.trim();
    if (isEmpty(nwProjectDesc)) {
      setProjectDescError(true);
      return;
    }

    const nwCurrency = currency.current.value;
    const nwCurrencySymbol = currencySymbol;

    const nwItemList = itemList;
    // const nwId = generateId();
    const nwStatus = "pending";
    const nwTotalAmount = calculateTotalAmount();

    const nwBillFrom = {
      name: nwBillFromName,
      streetAddress: nwBillFromStreetAddress,
      city: nwBillFromCity,
      postCode: nwBillFromPostCode,
      country: nwBillFromCountry,
    };
    const nwBillTo = {
      name: nwBillToName,
      email: nwBillToEmail,
      streetAddress: nwBillToStreetAddress,
      city: nwBillToCity,
      postCode: nwBillToPostCode,
      country: nwBillToCountry,
    };

    const nwInvoice = {
      // id: nwId,
      status: nwStatus,
      totalAmount: nwTotalAmount,
      billFrom: nwBillFrom,
      billTo: nwBillTo,
      invoiceDate: nwInvoiceDate,
      paymentDueBy: nwPaymentDueBy,
      currencyName: nwCurrency,
      currencySymbol: nwCurrencySymbol,
      projectDesc: nwProjectDesc,
      itemList: nwItemList,
    };

    try {
      // console.log(nwInvoice);
      await addInvoice(nwInvoice);
      discardRef.current.click();
    } catch (err) {
      console.error("Error adding invoice:", err);
      alert("Failed to save invoice");
    }

    // At last save the whole new item and call discard
    // setInvoices((prevList) => [...prevList, nwInvoice]);
    // discardRef.current.click();
  };

  if (loading)
    return (
      <div className="pt-20 mx-5 md:mx-20 lg:ml-65 lg:mr-40 xl:ml-67 xl:mr-42">
        <div className="my-8 md:my-4 card rounded-xl w-full bg-white dark:bg-[#1e2139] card-xs shadow-sm h-30 skeleton"></div>
        <div className="my-8 md:my-4 card rounded-xl w-full bg-white dark:bg-[#1e2139] card-xs shadow-sm h-30 skeleton"></div>
        <div className="my-8 md:my-4 card rounded-xl w-full bg-white dark:bg-[#1e2139] card-xs shadow-sm h-30 skeleton"></div>
      </div>
    );

  return (
    <div className="pt-20 mx-5 md:mx-20 lg:ml-65 lg:mr-40 xl:ml-67 xl:mr-42">
      <div className="topBar flex justify-between mt-10 lg:mt-0 lg:mb-13">
        <div className="left1 flex flex-col">
          <div className="text-4xl dark:text-white font-bold mb-3">
            Invoices
          </div>
          <div className="text-[#8890c1] dark:text-white font-light text-sm">
            There are total {invoices.length} invoices
          </div>
        </div>
        <div className="right1 flex justify-center items-center flex-col-reverse sm:flex-row">
          {/* Filter by status */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn border-0 py-6 pr-3 rounded-full hover:bg-white dark:hover:bg-transparent dark:bg-transparent dark:text-white dark:shadow-none sm:mr-8 mt-2 sm:mt-0 font-bold text-sm flex items-center"
            >
              Filter by status{" "}
              <span className="ml-1 pt-1 text-[#7c5dfa]">
                <Icon path={mdiChevronDown} size={0.8} />
              </span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 dark:bg-[#252945]  rounded-box z-1 w-33 p-2 shadow-md ml-2"
            >
              <li>
                <label className="fieldset-label hover:bg-[#d1c5ff] dark:hover:bg-[#4e4670]">
                  <input
                    type="checkbox"
                    checked={filterBy.includes("pending")}
                    onChange={() => handleFilter("pending")}
                    className="checkbox bg-[#dfe3fa] dark:bg-[#1e2139] border-0 size-4 rounded-sm checked:bg-[#9277ff] text-white"
                  />
                  <span className="font-bold text-black ml-2 dark:text-white">
                    Pending
                  </span>
                </label>
              </li>
              <li>
                <label className="fieldset-label hover:bg-[#d1c5ff] dark:hover:bg-[#4e4670]">
                  <input
                    type="checkbox"
                    checked={filterBy.includes("paid")}
                    onChange={() => handleFilter("paid")}
                    className="checkbox bg-[#dfe3fa] dark:bg-[#1e2139] border-0 size-4 rounded-sm checked:bg-[#9277ff] text-white"
                  />
                  <span className="font-bold text-black ml-2 dark:text-white">
                    Paid
                  </span>
                </label>
              </li>
              <li>
                <label className="fieldset-label hover:bg-[#d1c5ff] dark:hover:bg-[#4e4670]">
                  <input
                    type="checkbox"
                    checked={filterBy.includes("draft")}
                    onChange={() => handleFilter("draft")}
                    className="checkbox bg-[#dfe3fa] dark:bg-[#1e2139] border-0 size-4 rounded-sm checked:bg-[#9277ff] text-white"
                  />
                  <span className="font-bold text-black ml-2 dark:text-white">
                    Draft
                  </span>
                </label>
              </li>
            </ul>
          </div>
          <div>
            {/* DRAWER */}
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer"
                  className="mb-2 sm:mb-0 btn pl-4 pr-5 py-6 drawer-button border-0 bg-[#7c5dfa] hover:bg-[#9277ff] rounded-full text-white"
                >
                  <span>
                    <Icon path={mdiPlusCircle} size={1} />
                  </span>
                  New Invoice
                </label>
              </div>
              <div className="drawer-side z-1">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 dark:bg-[#141625] dark:text-white text-base-content min-h-full w-full md:w-180 pl-8 pr-7 lg:pl-31 lg:pr-6 ">
                  {/* SIDEBAR CONTENT BELOW */}
                  <div className="mainDrawerContent pt-24 lg:pt-8">
                    <div className="flex justify-between items-center w-full">
                      <div className="heading2 text-3xl font-bold">
                        New Invoice
                      </div>
                      <div className="text-[#7c5dfa] hover:text-[#9277ff] lg:hidden">
                        <label
                          ref={discardRef}
                          htmlFor="my-drawer"
                          className="cursor-pointer tooltip tooltip-bottom"
                          data-tip="close form"
                        >
                          <Icon path={mdiCloseCircle} size={1.7} />
                        </label>
                      </div>
                    </div>
                    {/* BILL FROM */}
                    <div className="billFrom">
                      <div className="mt-5 mb-2 heading3 text-[#7c5dfa] font-bold">
                        Bill From
                      </div>
                      <div className="name">
                        <div className="heading4 text-[#0b1441] dark:text-white font-light">
                          Name
                        </div>
                        <div>
                          <input
                            ref={billFromName}
                            onBlur={() => checkBillFromNameError()}
                            onChange={() => checkBillFromNameError()}
                            className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md 
                            w-full dark:bg-[#1e2139] dark:shadow-none"
                            type="text"
                          />
                        </div>
                        <div
                          className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${billFromNameError ? "visible" : "hide"}
                          `}
                        >
                          cannot be empty!!!
                        </div>
                      </div>
                      <div className="streetAddress">
                        <div className="heading4 text-[#0b1441] dark:text-white font-light">
                          Street Address
                        </div>
                        <div>
                          <input
                            ref={billFromStreetAddress}
                            onBlur={() => checkBillFromStreetAddressError()}
                            onChange={() => checkBillFromStreetAddressError()}
                            className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md 
                            w-full dark:bg-[#1e2139] dark:shadow-none"
                            type="text"
                          />
                        </div>
                        <div
                          className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${billFromStreetAddressError ? "visible" : "hide"}
                          `}
                        >
                          cannot be empty!!!
                        </div>
                      </div>
                      <div className="grid grid-cols-3 w-full">
                        <div>
                          <div className="heading4 text-[#0b1441] dark:text-white font-light">
                            City
                          </div>
                          <div>
                            <input
                              ref={billFromCity}
                              onBlur={() => checkBillFromCityError()}
                              onChange={() => checkBillFromCityError()}
                              className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                              type="text"
                            />
                          </div>
                          <div
                            className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${billFromCityError ? "visible" : "hide"}
                          `}
                          >
                            cannot be empty!!!
                          </div>
                        </div>
                        <div className="mx-2">
                          <div className="heading4 text-[#0b1441] dark:text-white font-light">
                            Post Code
                          </div>
                          <div>
                            <input
                              ref={billFromPostCode}
                              onBlur={() => checkBillFromPostCodeError()}
                              onChange={() => checkBillFromPostCodeError()}
                              className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                              type="text"
                            />
                          </div>
                          <div
                            className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${billFromPostCodeError ? "visible" : "hide"}
                          `}
                          >
                            cannot be empty!!!
                          </div>
                        </div>
                        <div>
                          <div className="heading4 text-[#0b1441] dark:text-white font-light">
                            Country
                          </div>
                          <div>
                            <select
                              defaultValue="India"
                              className="mt-2.5 mb-5 border-[#a3a8c2] h-12 select bg-transparent dark:bg-[#1e2139] dark:shadow-none cursor-pointer"
                              ref={billFromCountry}
                            >
                              <option disabled={true}>Pick a country</option>
                              {countries.map((country) => (
                                <option value={country} key={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* BILL TO */}
                    <div className="billTo">
                      <div className="mt-5 mb-2 heading3 text-[#7c5dfa] font-bold">
                        Bill To
                      </div>
                      <div className="clientName">
                        <div className="heading4 text-[#0b1441] dark:text-white font-light">
                          Client's Name
                        </div>
                        <div>
                          <input
                            ref={billToName}
                            onBlur={() => checkBillToNameError()}
                            onChange={() => checkBillToNameError()}
                            className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                            type="text"
                          />
                        </div>
                        <div
                          className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${billToNameError ? "visible" : "hide"}
                          `}
                        >
                          cannot be empty!!!
                        </div>
                      </div>
                      <div className="clientEmail">
                        <div className="heading4 text-[#0b1441] dark:text-white font-light">
                          Client's Email
                        </div>
                        <div>
                          <input
                            ref={billToEmail}
                            onBlur={() => checkBillToEmailError()}
                            onChange={() => checkBillToEmailError()}
                            className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                            type="text"
                          />
                        </div>
                        <div
                          className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${billToEmailError ? "visible" : "hide"}
                          `}
                        >
                          {billToEmailErrorMessage}!!!
                        </div>
                      </div>
                      <div className="streetAddress">
                        <div className="heading4 text-[#0b1441] dark:text-white font-light">
                          Street Address
                        </div>
                        <div>
                          <input
                            ref={billToStreetAddress}
                            onBlur={() => checkBillToStreetAddressError()}
                            onChange={() => checkBillToStreetAddressError()}
                            className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                            type="text"
                          />
                        </div>
                        <div
                          className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${billToStreetAddressError ? "visible" : "hide"}
                          `}
                        >
                          cannot be empty!!!
                        </div>
                      </div>
                      <div className="grid grid-cols-3 w-full">
                        <div>
                          <div className="heading4 text-[#0b1441] dark:text-white font-light">
                            City
                          </div>
                          <div>
                            <input
                              ref={billToCity}
                              onBlur={() => checkBillToCityError()}
                              onChange={() => checkBillToCityError()}
                              className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                              type="text"
                            />
                          </div>
                          <div
                            className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${billToCityError ? "visible" : "hide"}
                          `}
                          >
                            cannot be empty!!!
                          </div>
                        </div>
                        <div className="mx-2">
                          <div className="heading4 text-[#0b1441] dark:text-white font-light">
                            Post Code
                          </div>
                          <div>
                            <input
                              ref={billToPostCode}
                              onBlur={() => checkBillToPostCodeError()}
                              onChange={() => checkBillToPostCodeError()}
                              className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                              type="text"
                            />
                          </div>
                          <div
                            className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${billToPostCodeError ? "visible" : "hide"}
                          `}
                          >
                            cannot be empty!!!
                          </div>
                        </div>
                        <div>
                          <div className="heading4 text-[#0b1441] dark:text-white font-light">
                            Country
                          </div>
                          <div>
                            <select
                              defaultValue="India"
                              className="select mt-2.5 mb-5 border-[#a3a8c2] h-12 bg-transparent font-semibold
                              dark:bg-[#1e2139] dark:shadow-none cursor-pointer"
                              ref={billToCountry}
                            >
                              <option disabled={true}>Pick a country</option>
                              {countries.map((country) => (
                                <option value={country} key={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* REST DETAILS */}
                    <div className="paymentDate grid grid-cols-2 w-full">
                      <div className="invoiceDate mr-1 ">
                        <div className="heading4 text-[#0b1441] dark:text-white font-light">
                          Invoice Date
                        </div>
                        <input
                          type="date"
                          ref={date}
                          onBlur={() => checkInvoiceDateError()}
                          onChange={(e) => {
                            handleDateChange();
                          }}
                          className="input w-full mt-2.5 mb-5 border-[#a3a8c2] h-12 bg-transparent font-semibold
                           dark:bg-[#1e2139] dark:shadow-none"
                        />
                        <div
                          className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${invoiceDateError ? "visible" : "hide"}
                          `}
                        >
                          choose a date!!!
                        </div>
                      </div>
                      <div className="payment Terms ml-1">
                        <div className="heading4 text-[#0b1441] dark:text-white font-light">
                          Payment Terms
                        </div>
                        <div>
                          <select
                            defaultValue="7"
                            className="select w-full mt-2.5 mb-5 border-[#a3a8c2] h-12 bg-transparent font-semibold dark:bg-[#1e2139] dark:shadow-none"
                            ref={paymentTerms}
                          >
                            <option value={1}>Next 1 Day</option>
                            <option value={7}>Next 7 Days</option>
                            <option value={15}>Next 15 Days</option>
                            <option value={30}>Next 30 Days</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="projectDesc">
                      <div className="heading4 text-[#0b1441] dark:text-white font-light">
                        Project Description
                      </div>
                      <div>
                        <input
                          ref={projectDesc}
                          onBlur={() => checkProjectDescError()}
                          onChange={() => checkProjectDescError()}
                          className="mt-2.5 mb-5 px-3 font-semibold border-[1px] rounded-md border-[#a3a8c2] h-12 w-full dark:bg-[#1e2139] dark:shadow-none"
                          type="text"
                        />
                      </div>
                      <div
                        className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                          ${projectDescError ? "visible" : "hide"}
                          `}
                      >
                        cannot be empty!!!
                      </div>
                    </div>
                    <div className="currency">
                      <div className="heading4 text-[#0b1441] dark:text-white font-light">
                        Currency
                      </div>
                      <div>
                        <select
                          defaultValue="Indian Rupee"
                          className="select w-full mt-2.5 mb-5 border-[#a3a8c2] h-12 bg-transparent font-semibold dark:bg-[#1e2139] dark:shadow-none cursor-pointer"
                          ref={currency}
                          onChange={() =>
                            handleCurrencyChange(currency.current.value)
                          }
                        >
                          {currencyNames.map((currency, idx) => (
                            <option value={currency} key={idx}>
                              {currency}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="itemList w-full">
                      <div className="text-[#676d81] text-xl dark:text-white font-semibold">
                        Item List
                      </div>
                      <div className="listItems">
                        {itemList.map((item) => {
                          return (
                            <div key={item.id} className="mt-6 mb-5 flex">
                              <div className="mr-2 w-full">
                                <div className="font-light text-[#0b1441] dark:text-white">
                                  Item Name
                                </div>
                                <input
                                  type="text"
                                  className="mt-2 w-full px-2 border-[1px] rounded-md border-[#7482ab] bg-transparent h-12 font-semibold dark:bg-[#1e2139] dark:shadow-none"
                                  value={item.name}
                                  onChange={(e) => {
                                    handleNameChange(item.id, e.target.value);
                                  }}
                                />
                              </div>
                              <div className="mr-2">
                                <div className="font-light text-[#0b1441] dark:text-white">
                                  Qty.
                                </div>
                                <input
                                  type="number"
                                  className="mt-2 w-full px-2 border-[1px] rounded-md border-[#7482ab] bg-transparent h-12 font-semibold dark:bg-[#1e2139] dark:shadow-none"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      item.id,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="mr-2">
                                <div className="font-light text-[#0b1441] dark:text-white">
                                  Price <span>({currencySymbol})</span>
                                </div>
                                <input
                                  type="number"
                                  className="mt-2 w-full px-2 border-[1px] rounded-md border-[#7482ab] bg-transparent h-12 font-semibold dark:bg-[#1e2139] dark:shadow-none"
                                  value={item.price}
                                  onChange={(e) =>
                                    handlePriceChange(item.id, e.target.value)
                                  }
                                />
                              </div>

                              <div className="mr-2 ">
                                <div className="font-light text-[#0b1441] dark:text-white">
                                  Total <span>({currencySymbol})</span>
                                </div>
                                <input
                                  type="number"
                                  className="mt-2 w-full px-2 border-[1px] rounded-md border-[#7482ab] bg-transparent h-12 font-semibold dark:bg-[#1e2139] dark:shadow-none"
                                  disabled
                                  value={item.itemTotal}
                                />
                              </div>
                              <div className="text-[#7e88c3] hover:text-[#ec5757] flex items-end">
                                <div data-tip="delete" className="tooltip">
                                  <Icon
                                    className="icon relative left-1"
                                    path={mdiDelete}
                                    size={1.5}
                                    onClick={() => handleDeleteItem(item.id)}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div
                        onClick={addNewListItem}
                        className="rounded-full btn my-5 text-[#7e88c3] dark:text-white 
                        dark:bg-[#1e2139] w-full bg-[#ecf0ff] font-bold py-6 dark:border-0 dark:shadow-none"
                      >
                        <Icon className="" path={mdiPlus} size={0.7} />
                        Add New Item
                      </div>
                    </div>

                    {/* BOTTOM BUTTONS */}
                    <div
                      className="bottomButtons my-5 w-full
                    mt-auto sticky lg:relative bottom-0 bg-[#f8f8f8] dark:bg-[#141625] outline-1 dark:outline-[#141625] py-4 opacity-100 outline-[#f8f8f8]"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div>
                            <label
                              ref={discardRef}
                              htmlFor="my-drawer"
                              className="rounded-full btn text-[#7e88c3] bg-[#ecf0ff]
                              dark:bg-[#1e2139] dark:text-white dark:shadow-none dark:border-0 dark:hover:bg-[#3e4260] font-bold py-6 px-7"
                              onClick={() => handleDiscard()}
                            >
                              Discard
                            </label>
                          </div>
                        </div>
                        <div className="flex">
                          <label
                            htmlFor="my-drawer"
                            className="rounded-full btn text-[#ffffff] bg-[#4b5277] hover:bg-[#7e88c3] font-bold py-6 mr-5
                            dark:bg-[#1e2139] dark:text-white dark:shadow-none dark:border-0 dark:hover:bg-[#3e4260]"
                            onClick={() => handleSaveAsDraft()}
                          >
                            Save as Draft
                          </label>
                          <label
                            // htmlFor="my-drawer"
                            className="rounded-full btn text-[#ffffff] bg-[#7c5dfa] hover:bg-[#9277ff] font-bold py-6 px-7 dark:border-0 dark:shadow-none"
                            onClick={() => handleSaveInvoice()}
                          >
                            Save
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-5">
          <div>
            <img src={img1} alt="EMPTY IMAGE" />
          </div>
          <div className="dark:text-white text-2xl flex flex-col justify-center items-center mt-5">
            <div className="font-bold">No Invoices to display!!!</div>
            <div className="text-center mt-2 text-[#1d0c5e] dark:text-[#b8a7ff]">
              Click on New Invoice to create <br /> a new invoice.
            </div>
          </div>
        </div>
      ) : (
        filteredInvoices.map((invoice) => {
          return (
            // MAIN LIST RENDERED BELOW
            <div
              key={invoice.id}
              // onClick={() => {
              //   setCurrentInvoice(invoice);
              // }}
              className="mainList hover:outline-1 outline-[#7c5dfa] transition-all duration-150 rounded-xl"
            >
              <NavLink
                to={`${invoice.id}`}
                className="my-8 md:my-4 card rounded-xl w-full bg-white dark:bg-[#1e2139] card-xs shadow-sm"
              >
                <div className="flex my-8 px-6 justify-between items-center">
                  <div className="complex flex flex-col md:flex-rows items-center justify-center">
                    <div className="id font-bold text-sm dark:text-white">
                      <span className="text-[#8688c3] dark:text-[#7b81bf] text-sm font-bold">
                        #
                      </span>
                      {invoice.id}
                    </div>
                    <div className="dueDate my-3 flex md:hidden text-[#8a8ac3] dark:text-white font-light text-[13px]">
                      Due: {invoice.paymentDueBy}
                    </div>
                    <div className="amount flex md:hidden font-bold text-xl dark:text-white justify-end">
                      {invoice.currencySymbol}
                      {invoice.totalAmount}
                    </div>
                  </div>
                  <div className="dueDate hidden md:flex text-[#8a8ac3] dark:text-white font-light text-[13px]">
                    Due: {invoice.paymentDueBy}
                  </div>
                  <div className="name hidden md:flex text-[#787191] dark:text-white font-bold text-[16px]">
                    {invoice.billTo.name}
                  </div>
                  <div className="amount hidden md:flex font-bold text-xl dark:text-white justify-end">
                    {invoice.currencySymbol}
                    {invoice.totalAmount.toLocaleString("en-US")}
                  </div>
                  <div className="complex flex flex-col md:flex-row justify-between items-center">
                    <div className="name mb-4 md:hidden text-[#787191] dark:text-white font-bold text-[16px]">
                      {invoice.billTo.name}
                    </div>
                    <div
                      className={`py-2 rounded-lg pl-2 pr-4 flex items-center 
                        ${
                          invoice.status === "paid"
                            ? "bg-[#f3fdf9]"
                            : invoice.status === "pending"
                            ? "bg-[#fff8f0]"
                            : "bg-[#f3f3f5]"
                        }
                      ${
                        invoice.status === "paid"
                          ? "dark:bg-[#1f2c3f]"
                          : invoice.status === "pending"
                          ? "dark:bg-[#2b2736]"
                          : "dark:bg-[#292c45]"
                      }
                      `}
                    >
                      <div
                        className={`pt-1 
                          ${
                            invoice.status === "paid"
                              ? "text-[#33d69f]"
                              : invoice.status === "pending"
                              ? "text-[#ff8f00]"
                              : "text-[#373b53]"
                          }
                        ${
                          invoice.status === "paid"
                            ? "text-[#33d69f]"
                            : invoice.status === "pending"
                            ? "text-[#ff8f00]"
                            : "dark:text-[#fff]"
                        }
                        `}
                      >
                        <Icon path={mdiCircleMedium} size={1} />
                      </div>
                      <div
                        className={`font-bold 
                          ${
                            invoice.status === "paid"
                              ? "text-[#33d69f]"
                              : invoice.status === "pending"
                              ? "text-[#ff8f00]"
                              : "text-[#373b53]"
                          }
                        ${
                          invoice.status === "paid"
                            ? "text-[#33d69f]"
                            : invoice.status === "pending"
                            ? "text-[#ff8f00]"
                            : "dark:text-[#ffffff]"
                        }
                        `}
                      >
                        {invoice.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="rightIcon mt- text-[#7c5dfa] dark:text-[#7c5dfa]">
                    <Icon path={mdiChevronRight} size={0.8} />
                  </div>
                </div>
              </NavLink>
              <Outlet />
            </div>
          );
        })
      )}
    </div>
  );
};

export default HomePage;
