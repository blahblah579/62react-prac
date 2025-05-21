// src/main.jsx
import React, { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./Layout";
import InitialHomePage from "./InitialHomePage";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
import InvoiceInfo from "./InvoiceInfo";
import UserHomePage from "./UserHomePage";
import UserInvoiceInfo from "./UserInvoiceInfo";
import ProtectedRoute from "./ProtectedRoute";
import { useLocalStorage } from "./customHooks/useLocalStorage";

// Demo seed data…
const initialInvoices = [
  {
    id: "RT3080",
    status: "paid",
    totalAmount: 1000,
    billFrom: {
      name: "Infobell IT solutions",
      streetAddress: "Nagavara",
      city: "Bangalore",
      postCode: 560045,
      country: "India",
    },
    billTo: {
      name: "Jensen Huang",
      email: "jensonhuang@nvidia.com",
      streetAddress: "Palo Alto",
      city: "California",
      postCode: 12345,
      country: "United States",
    },
    invoiceDate: "01-04-2025",
    paymentDueBy: "02-04-2025",
    currencyName: "United States Dollar",
    currencySymbol: "$",
    projectDesc: "Quantum computer design",
    itemList: [
      {
        id: 0,
        name: "Graphic Card Design",
        quantity: 1,
        price: 1000,
        itemTotal: 1000,
      },
    ],
  },
  {
    id: "XM9141",
    status: "pending",
    totalAmount: 20120,
    billFrom: {
      name: "Infobell IT solutions",
      streetAddress: "Nagavara",
      city: "Bangalore",
      postCode: 560045,
      country: "India",
    },
    billTo: {
      name: "Lisa Su",
      email: "lisasu@amd.com",
      streetAddress: "San Fransisco",
      city: "California",
      postCode: 12345,
      country: "United States",
    },
    invoiceDate: "04-04-2025",
    paymentDueBy: "05-04-2025",
    currencyName: "United States Dollar",
    currencySymbol: "$",
    projectDesc: "DPDK design and analysis",
    itemList: [
      {
        id: 0,
        name: "DPDK Design",
        quantity: 1,
        price: 5000,
        itemTotal: 5000,
      },
      {
        id: 1,
        name: "DPDK System Architecture Development",
        quantity: 1,
        price: 15120,
        itemTotal: 15120,
      },
    ],
  },
  {
    id: "RG0314",
    status: "draft",
    totalAmount: 200000,
    billFrom: {
      name: "Infobell IT solutions",
      streetAddress: "Nagavara",
      city: "Bangalore",
      postCode: 560045,
      country: "India",
    },
    billTo: {
      name: "Elon Musk",
      email: "elonmusk@tesla.com",
      streetAddress: "Boston",
      city: "Boston",
      postCode: 33345,
      country: "United States",
    },
    invoiceDate: "01-06-2025",
    paymentDueBy: "01-07-2025",
    currencyName: "United States Dollar",
    currencySymbol: "$",
    projectDesc: "Tesla T1 engine design",
    itemList: [
      {
        id: 0,
        name: "Tesla T1 car Engine Re-design",
        quantity: 1,
        price: 200000,
        itemTotal: 200000,
      },
    ],
  },
];

/**
 * Public pages guard: only when user===null
 * - if user==="demo": → /demoHomePage
 * - if user truthy: → /userHomePage
 * otherwise render child routes
 */
function NoAuthRoute({ user }) {
  if (user === "demo") return <Navigate to="/demoHomePage" replace />;
  if (user) return <Navigate to="/userHomePage" replace />;
  return <Outlet />;
}

/**
 * Demo pages guard: only when user==="demo"
 * otherwise bounce to public root
 */
function DemoRoute({ user }) {
  return user === "demo" ? <Outlet /> : <Navigate to="/" replace />;
}

function App() {
  // Centralized user & state
  const [user, setUser] = useLocalStorage("user", null);
  const [invoices, setInvoices] = useState([...initialInvoices]);

  return (
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/** A) PUBLIC: only when user===null */}
            <Route element={<NoAuthRoute user={user} />}>
              <Route
                path="/"
                element={<Layout user={user} setUser={setUser} />}
              >
                <Route index element={<InitialHomePage setUser={setUser} />} />
                <Route path="auth" element={<AuthPage setUser={setUser} />} />
              </Route>
            </Route>

            {/** B) DEMO: only demo users */}
            <Route element={<DemoRoute user={user} />}>
              <Route
                path="/demoHomePage"
                element={<Layout user={user} setUser={setUser} />}
              >
                <Route
                  index
                  element={
                    <HomePage
                      invoices={invoices}
                      setInvoices={setInvoices}
                      initialInvoices={initialInvoices}
                    />
                  }
                />
                <Route
                  path=":invoiceId"
                  element={
                    <InvoiceInfo
                      invoices={invoices}
                      setInvoices={setInvoices}
                    />
                  }
                />
              </Route>
            </Route>

            {/* C) PROTECTED: only true authenticated users */}
            <Route
              path="/userHomePage"
              element={<ProtectedRoute user={user} />}
            >
              <Route element={<Layout user={user} setUser={setUser} />}>
                <Route
                  index
                  element={<UserHomePage user={user} setUser={setUser} />}
                />
                <Route
                  path=":invoiceId"
                  element={<UserInvoiceInfo user={user} setUser={setUser} />}
                />
              </Route>
            </Route>

            {/** D) CATCH-ALL → back to public */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
