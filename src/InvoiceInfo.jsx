import React, { useEffect, useRef, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiChevronLeft,
  mdiDelete,
  mdiPlus,
  mdiCircleMedium,
  mdiCloseCircle,
} from "@mdi/js";
import "cally";
import "./home.css";
import { useParams, NavLink, Navigate } from "react-router-dom";

import { InvoicePDF } from "./InvoicePDF"; // Adjust path as needed
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer"; // PDF generator API :contentReference[oaicite:2]{index=2}

const InvoiceInfo = ({ invoices, setInvoices }) => {
  const handleOpenPdf = async () => {
    // 1. Create PDF instance from the component
    const blob = await pdf(<InvoicePDF invoice={currentInvoice} />).toBlob();

    // 2. Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // 3. Open the URL in a new tab
    window.open(url, "_blank");
  };

  // Grab the dynamic :invoiceId param if needed
  const { invoiceId } = useParams();

  // Find the specific invoice
  const currentInvoice = invoices.find((inv) => inv.id === invoiceId);

  // // If the invoice isn't in the list (e.g. just deleted), redirect
  // if (!currentInvoice) {
  //   return <Navigate to="/" replace />;
  // }

  // Generate unique six digit ID
  const generateId = () => {
    const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ans = "";

    for (let i = 0; i < 6; i++) {
      const idx = Math.floor(Math.random() * 100000) % 62;
      ans += s[idx];
    }

    return ans;
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
  const [invoiceDate, setInvoiceDate] = useState(currentInvoice.invoiceDate);
  const paymentTerms = useRef(null);

  // Button Ref
  const discardRef = useRef(null);
  const hideButton = useRef(null);

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

  function toISODate(ddmmyyyy) {
    // console.log(ddmmyyyy.split("-").reverse().join("-"));
    return ddmmyyyy.split("-").reverse().join("-");
  }

  function calculateDateDifference(invoiceDate, paymentDueBy) {
    if (invoiceDate.length !== 10 || paymentDueBy.length !== 10) return "7";
    // 1. Parse both dates into [day, month, year]
    const [d1, m1, y1] = invoiceDate.split("-").map(Number);
    const [d2, m2, y2] = paymentDueBy.split("-").map(Number);

    // 2. Construct JS Date objects (months are zero-based)
    const date1 = new Date(y1, m1 - 1, d1);
    const date2 = new Date(y2, m2 - 1, d2);

    // 3. Compute difference in milliseconds, then convert to days
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffMs = date2 - date1;
    const diffDays = Math.floor(diffMs / msPerDay);

    // 4. Return as string
    return diffDays.toString();
  }

  const [defaultDate, setDefaultDate] = useState(
    toISODate(currentInvoice.invoiceDate)
  );

  const projectDesc = useRef("");
  const currency = useRef(null);
  const [currencySymbol, setCurrencySymbol] = useState(
    currentInvoice.currencySymbol
  );

  // ITEM LIST in the SIDEBAR
  const [itemList, setItemList] = useState(currentInvoice.itemList);

  const addNewListItem = () => {
    //add new item to itemList of above type ,generate new id
    const nwId = generateId();
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
    // console.log(nwBillFromName);
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

  const handleDiscard = () => {
    // reset everything
    billFromName.current.value = currentInvoice.billFrom.name;
    billFromStreetAddress.current.value = currentInvoice.billFrom.streetAddress;
    billFromCity.current.value = currentInvoice.billFrom.city;
    billFromPostCode.current.value = currentInvoice.billFrom.postCode;
    billFromCountry.current.value = currentInvoice.billFrom.country;

    billToName.current.value = currentInvoice.billTo.name;
    billToEmail.current.value = currentInvoice.billTo.email;
    billToStreetAddress.current.value = currentInvoice.billTo.streetAddress;
    billToCity.current.value = currentInvoice.billTo.city;
    billToPostCode.current.value = currentInvoice.billTo.postCode;
    billToCountry.current.value = currentInvoice.billTo.country;

    setInvoiceDate(defaultDate);
    date.current.value = defaultDate;

    paymentTerms.current.value = calculateDateDifference(
      currentInvoice.invoiceDate,
      currentInvoice.paymentDueBy
    );
    projectDesc.current.value = currentInvoice.projectDesc;
    currency.current.value = currentInvoice.currencyName;
    setCurrencySymbol(currentInvoice.currencySymbol);

    setItemList(currentInvoice.itemList);

    // Errors chnage to all false
    setBillFromNameError(false);
    setBillFromStreetAddressError(false);
    setBillFromCityError(false);
    setBillFromPostCodeError(false);

    // BILL TO
    setBillToNameError(false);
    setBillToEmailError(false);
    setBillToEmailErrorMessage("");
    setBillToStreetAddressError(false);
    setBillToCityError(false);
    setBillToPostCodeError(false);
    setInvoiceDateError(false);
    setProjectDescError(false);
  };

  const handleSaveInvoice = () => {
    // console.log("first");
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

    if (!checkFormat(invoiceDate)) {
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
    const nwId = currentInvoice.id; //Changed
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
      id: nwId,
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

    // At last save the whole new item and call discard
    setInvoices((prevList) =>
      prevList.map((invoice) =>
        invoice.id === currentInvoice.id ? { ...nwInvoice } : invoice
      )
    );
    // setCurrentInvoice(nwInvoice);
    // discardRef.current.click();
    // console.log("Last");
    hideButton.current.click();
  };

  const handleMarkAsPaid = (id) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: "paid" } : { ...invoice }
      )
    );
    setCurrentInvoice((prevInvoice) => ({ ...prevInvoice, status: "paid" }));
  };

  const goBack = useRef();

  const handleDeleteInvoice = (id) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== id)
    );
    // setCurrentInvoice(null);
    // goBack.current.click();
  };

  // MAIN
  return (
    <div>
      <div className="pt-30 lg:pt-20 mx-5 md:mx-20 lg:ml-65 lg:mr-40 xl:ml-67 xl:mr-42">
        <NavLink to="/demoHomePage" className="back" ref={goBack}>
          <span
            // onClick={goToMainMenu}
            className="icon flex font-semibold dark:text-[#c9d3fd]"
          >
            <Icon
              className="text-[#7c5dfa] pt-1 mr-2"
              path={mdiChevronLeft}
              size={0.99}
            />
            Go Back
          </span>
        </NavLink>

        <div className="statusBar mt-10 p-8 rounded-lg bg-white dark:bg-[#1e2139] flex justify-between">
          <div className="value flex items-center">
            <span className="title mr-5 text-[#425582] font-normal text-md dark:text-[#c9d3fd]">
              Status:
            </span>
            <div
              className={`mr-10 py-2 rounded-lg pl-2 pr-4 flex items-center ${
                currentInvoice.status === "paid"
                  ? "bg-[#f3fdf9]"
                  : currentInvoice.status === "pending"
                  ? "bg-[#fff8f0]"
                  : "bg-[#f3f3f5]"
              }
              ${
                currentInvoice.status === "paid"
                  ? "dark:bg-[#1f2c3f]"
                  : currentInvoice.status === "pending"
                  ? "dark:bg-[#2b2736]"
                  : "dark:bg-[#292c45]"
              }
              `}
            >
              <div
                className={`pt-1 ${
                  currentInvoice.status === "paid"
                    ? "text-[#33d69f]"
                    : currentInvoice.status === "pending"
                    ? "text-[#ff8f00]"
                    : "text-[#373b53]"
                }
                ${
                  currentInvoice.status === "paid"
                    ? "text-[#33d69f]"
                    : currentInvoice.status === "pending"
                    ? "text-[#ff8f00]"
                    : "dark:text-[#fff]"
                }
                `}
              >
                <Icon path={mdiCircleMedium} size={1} />
              </div>
              <div
                className={`font-bold ${
                  currentInvoice.status === "paid"
                    ? "text-[#33d69f]"
                    : currentInvoice.status === "pending"
                    ? "text-[#ff8f00]"
                    : "text-[#373b53]"
                }
                 ${
                   currentInvoice.status === "paid"
                     ? "text-[#33d69f]"
                     : currentInvoice.status === "pending"
                     ? "text-[#ff8f00]"
                     : "dark:text-[#ffffff]"
                 }
                `}
              >
                {currentInvoice.status.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="buttons flex">
            {/* Whole Drawer */}
            {currentInvoice.status === "paid" ? (
              <div></div>
            ) : (
              <div className="drawer">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content hidden lg:flex">
                  {/* Page content here */}
                  <label
                    htmlFor="my-drawer"
                    className="btn drawer-button border-0 rounded-full px-5 py-6 bg-[#f8f8fb] hover:bg-[#dfe3fa] text-[#848fc5] font-medium
                    dark:bg-[#2a2f51] dark:text-white dark:shadow-none dark:border-0 dark:hover:bg-[#3e4260]"
                  >
                    Edit
                  </label>
                </div>
                <div className="drawer-side z-1">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu bg-base-200 dark:bg-[#141625] dark:text-white text-base-content min-h-full w-full lg:w-180 pr-6 pl-6 lg:pl-31">
                    {/* SIDEBAR CONTENT BELOW */}
                    <div className="mainDrawerContent pt-24 lg:pt-13">
                      <div className="flex justify-between items-center w-full">
                        <div className="heading2 text-3xl font-bold">
                          Edit <span>#</span>
                          {currentInvoice.id}
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
                        <div className="mt-6 mb-2 heading3 text-[#7c5dfa] font-bold">
                          Bill From
                        </div>
                        <div className="name">
                          <div className="heading4 text-[#0b1441] dark:text-white font-light">
                            Name
                          </div>
                          <div>
                            <input
                              ref={billFromName}
                              defaultValue={currentInvoice.billFrom.name}
                              onBlur={() => checkBillFromNameError()}
                              onChange={() => checkBillFromNameError()}
                              className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
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
                              defaultValue={
                                currentInvoice.billFrom.streetAddress
                              }
                              onBlur={() => checkBillFromStreetAddressError()}
                              onChange={() => checkBillFromStreetAddressError()}
                              className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                              type="text"
                            />
                          </div>
                          <div
                            className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                                    ${
                                      billFromStreetAddressError
                                        ? "visible"
                                        : "hide"
                                    }
                                    `}
                          >
                            cannot be empty!!!
                          </div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div>
                            <div className="heading4 text-[#0b1441] dark:text-white font-light">
                              City
                            </div>
                            <div>
                              <input
                                ref={billFromCity}
                                defaultValue={currentInvoice.billFrom.city}
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
                                defaultValue={currentInvoice.billFrom.postCode}
                                onBlur={() => checkBillFromPostCodeError()}
                                onChange={() => checkBillFromPostCodeError()}
                                className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                                type="text"
                              />
                            </div>
                            <div
                              className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                                    ${
                                      billFromPostCodeError ? "visible" : "hide"
                                    }
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
                                defaultValue={currentInvoice.billFrom.country}
                                className="mt-2.5 mb-5 border-[#a3a8c2] h-12 select bg-transparent dark:bg-[#1e2139] dark:shadow-none"
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
                        <div className="mt-6 mb-2 heading3 text-[#7c5dfa] font-bold">
                          Bill To
                        </div>
                        <div className="clientName">
                          <div className="heading4 text-[#0b1441] dark:text-white font-light">
                            Client's Name
                          </div>
                          <div>
                            <input
                              ref={billToName}
                              defaultValue={currentInvoice.billTo.name}
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
                              defaultValue={currentInvoice.billTo.email}
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
                              defaultValue={currentInvoice.billTo.streetAddress}
                              onBlur={() => checkBillToStreetAddressError()}
                              onChange={() => checkBillToStreetAddressError()}
                              className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
                              type="text"
                            />
                          </div>
                          <div
                            className={`relative bottom-4 text-xs text-[#fc100c] dark:text-red-500 font-normal 
                                    ${
                                      billToStreetAddressError
                                        ? "visible"
                                        : "hide"
                                    }
                                    `}
                          >
                            cannot be empty!!!
                          </div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div>
                            <div className="heading4 text-[#0b1441] dark:text-white font-light">
                              City
                            </div>
                            <div>
                              <input
                                ref={billToCity}
                                defaultValue={currentInvoice.billTo.city}
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
                                defaultValue={currentInvoice.billTo.postCode}
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
                                defaultValue={currentInvoice.billTo.country}
                                className="mt-2.5 mb-5 border-[#a3a8c2] h-12 select bg-transparent dark:bg-[#1e2139] dark:shadow-none"
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
                      <div className="paymentDate grid grid-cols-2">
                        <div className="invoiceDate mr-1">
                          <div className="heading4 text-[#0b1441] dark:text-white font-light">
                            Invoice Date
                          </div>
                          <input
                            type="date"
                            defaultValue={defaultDate}
                            ref={date}
                            onBlur={() => checkInvoiceDateError()}
                            onChange={(e) => {
                              handleDateChange();
                            }}
                            className="input w-full mt-2.5 mb-5 border-[#a3a8c2] h-12 bg-transparent font-semibold dark:bg-[#1e2139] dark:shadow-none"
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
                              defaultValue={calculateDateDifference(
                                currentInvoice.invoiceDate,
                                currentInvoice.paymentDueBy
                              )}
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
                            defaultValue={currentInvoice.projectDesc}
                            onBlur={() => checkProjectDescError()}
                            onChange={() => checkProjectDescError()}
                            className="mt-2.5 mb-5 px-3 font-semibold border-[1px] border-[#a3a8c2] h-12 rounded-md w-full dark:bg-[#1e2139] dark:shadow-none"
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
                            defaultValue={currentInvoice.currencyName}
                            className="select mt-2.5 mb-5 h-12 border-[1px] border-[#a3a8c2] bg-transparent font-semibold w-full dark:bg-[#1e2139] dark:shadow-none"
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
                        <div className="text-[#777f98] dark:text-white text-xl font-semibold">
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
                      <div className="bottomButtons my-5 w-full mt-auto sticky lg:relative bottom-0 bg-[#f8f8f8] dark:bg-[#141625] py-4">
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
                                Discard All Changes
                              </label>
                              <label
                                ref={hideButton}
                                htmlFor="my-drawer"
                                className="btn btn-primary hides"
                              >
                                Hello
                              </label>
                            </div>
                          </div>
                          <div>
                            <label
                              // htmlFor="my-drawer"
                              className="rounded-full btn text-[#ffffff] bg-[#7c5dfa] hover:bg-[#9277ff] font-bold py-6 px-7 dark:border-0 dark:shadow-none"
                              onClick={() => handleSaveInvoice()}
                            >
                              Save Invoice
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            )}

            <div>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn border-0 rounded-full mx-3 px-5 py-6 bg-[#ef4545] hover:bg-[#ff9797] text-[#fff] font-medium hidden lg:flex
                dark:bg-red-500 dark:text-white dark:shadow-none dark:border-0 dark:hover:bg-red-400"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                Delete
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box dark:bg-[#1e2139] dark:text-white">
                  <h3 className="font-bold text-lg">Are you sure???</h3>
                  <p className="py-4">
                    Do you really want to delete this invoice permanently?
                  </p>
                  <div className="flex justify-between modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        className="btn border-0 rounded-full px-5 py-6 bg-[#7c5dfa] hover:bg-[#9277ff] text-[#fff] font-medium
                      dark:shadow-none dark:border-0"
                      >
                        No, thanks...
                      </button>
                    </form>
                    <NavLink
                      to="/demoHomePage"
                      replace
                      onClick={() => handleDeleteInvoice(currentInvoice.id)}
                      className="btn border-0 rounded-full mx-3 px-5 py-6 bg-[#ef4545] hover:bg-[#ff9797] text-[#fff] font-medium
                      dark:bg-red-500 dark:text-white dark:shadow-none dark:border-0 dark:hover:bg-red-400"
                    >
                      Yes, Delete!!!
                    </NavLink>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
            {currentInvoice.status !== "pending" ? (
              <div></div>
            ) : (
              <div
                onClick={() => handleMarkAsPaid(currentInvoice.id)}
                className="hidden lg:flex btn border-0 rounded-full px-5 py-6 bg-[#7c5dfa] hover:bg-[#9277ff] 
                text-[#fff] font-medium dark:shadow-none dark:border-0"
              >
                Mark as Paid
              </div>
            )}
          </div>
        </div>
        <div className="bottomBar mt-5 p-6.5 rounded-lg bg-white dark:bg-[#1e2139] dark:text-white">
          <div className="description mb-7 flex justify-between">
            <div className="flex flex-col">
              <div className="dark:text-[#c9d3fd]">
                <span className="text-[#828fc5] font-semibold text-sm">#</span>
                <span className="font-semibold text-sm">
                  {currentInvoice.id}
                </span>
              </div>
              <div className="text-[#586c9d] font-normal text-sm dark:text-[#c9d3fd]">
                {currentInvoice.projectDesc}
              </div>
            </div>
            <div>
              <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                {currentInvoice.billFrom.name}
              </div>
              <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                {currentInvoice.billFrom.streetAddress}
              </div>
              <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                {currentInvoice.billFrom.city}
              </div>
              <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                {currentInvoice.billFrom.country}
              </div>
            </div>
          </div>
          <div className="billTo flex justify-between flex-col lg:flex-row">
            <div className="dates flex  w-full lg:w-[50%] justify-between">
              <div className="dates flex flex-col justify-between">
                <div>
                  <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                    Invoice Date
                  </div>
                  <div className="font-bold text-lg">
                    {currentInvoice.invoiceDate}
                  </div>
                </div>
                <div>
                  <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                    Payment Due
                  </div>
                  <div className="font-bold text-lg">
                    {currentInvoice.paymentDueBy}
                  </div>
                </div>
              </div>
              <div className="billTo flex flex-col lg:mr-10">
                <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                  Bill To
                </div>
                <div className="font-bold text-lg">
                  {currentInvoice.billTo.name}
                </div>
                <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm mt-3">
                  {currentInvoice.billTo.streetAddress}
                </div>
                <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                  {currentInvoice.billTo.city}
                </div>
                <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                  {currentInvoice.billTo.country}
                </div>
              </div>
            </div>
            <div className="email w-[50%] mt-10 lg:mt-0">
              <div className="text-[#586c9d] dark:text-[#c9d3fd] font-normal text-sm">
                Sent To
              </div>
              <div className="font-bold text-lg">
                {currentInvoice.billTo.email}
              </div>
            </div>
          </div>
          <div className="list rounded-t-lg bg-[#f9fafe] dark:bg-[#252945] p-5 mt-10">
            <div className="listHeading grid grid-cols-5 font-normal text-[#7e88c3] dark:text-[#c9d3fd] text-md">
              <div className="col-span-2">Item Name</div>
              <div className="col-span-1">Qty</div>
              <div className="col-span-1">Price</div>
              <div className="col-span-1">Total</div>
            </div>
            <div className="itemList">
              {currentInvoice.itemList.map((item) => (
                <div
                  key={item.id}
                  className="listHeading grid grid-cols-5 font-bold my-5"
                >
                  <div className="col-span-2">{item.name}</div>
                  <div className="col-span-1 text-[#7e88c3] dark:text-[#c9d3fd]">
                    {Number(item.quantity).toLocaleString("en-US")}
                  </div>
                  <div className="col-span-1 text-[#7e88c3] dark:text-[#c9d3fd]">
                    {currentInvoice.currencySymbol}
                    {item.price.toLocaleString("en-US")}
                  </div>
                  <div className="col-span-1">
                    {currentInvoice.currencySymbol}
                    {item.itemTotal.toLocaleString("en-US")}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="total rounded-b-lg bg-[#373b53] dark:bg-[#191c2e] text-white p-5 font-bold">
            <div className="flex justify-between items-center">
              <div className="font-semibold">Amount Due</div>
              <div className="flex text-2xl">
                {currentInvoice.currencySymbol}
                <div className="">
                  {currentInvoice.totalAmount.toLocaleString("en-US")}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add a button for download as PDF here not for status === "draft" */}
        {currentInvoice.status !== "draft" ? (
          <div className="mt-5 mb-7">
            {/* // src/InvoiceInfo.jsx (inside your component’s return block) */}
            <button
              onClick={handleOpenPdf}
              className="btn py-6 bg-[#02b27a] hover:bg-[#00bf83] border-0 shadow-none w-full rounded-lg text-white text-xl font-medium"
            >
              Download as PDF
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* Bottom bar on smaller screens */}
      <div
        className="buttons flex lg:hidden mt-5 p-8 py-3 bg-white dark:bg-[#1e2139] justify-between fixed
      w-full top-[85%]"
      >
        {/* Whole Drawer */}
        {currentInvoice.status === "paid" ? (
          <div></div>
        ) : (
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="lg:hidden btn border-0 rounded-full px-5 py-6 bg-[#f8f8fb] hover:bg-[#dfe3fa] text-[#848fc5] font-medium
                dark:bg-[#2a2f51] dark:text-white dark:shadow-none dark:border-0 dark:hover:bg-[#3e4260]"
              >
                Edit
              </label>
            </div>
            <div className="drawer-side z-1">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
            </div>
          </div>
        )}

        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="lg:hidden btn border-0 rounded-full mx-3 px-5 py-6 bg-[#ef4545] hover:bg-[#ff9797] text-[#fff] font-medium
            dark:bg-red-500 dark:text-white dark:shadow-none dark:border-0 dark:hover:bg-red-400"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Delete
          </button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Are you sure???</h3>
              <p className="py-4">
                Do you really want to delete this invoice permanently?
              </p>
              <div className="flex justify-between modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn border-0 rounded-full px-5 py-6 bg-[#7c5dfa] hover:bg-[#9277ff] text-[#fff] font-medium">
                    No, thanks...
                  </button>
                </form>
                <div
                  onClick={() => handleDeleteInvoice(currentInvoice.id)}
                  className="btn border-0 rounded-full mx-3 px-5 py-6 bg-[#ef4545] hover:bg-[#ff9797] text-[#fff] font-medium"
                >
                  Yes, Delete!!!
                </div>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        {currentInvoice.status !== "pending" ? (
          <div></div>
        ) : (
          <div
            onClick={() => handleMarkAsPaid(currentInvoice.id)}
            className="lg:hidden btn border-0 rounded-full px-5 py-6 bg-[#7c5dfa] hover:bg-[#9277ff] text-[#fff] font-medium dark:shadow-none dark:border-0"
          >
            Mark as Paid
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceInfo;
