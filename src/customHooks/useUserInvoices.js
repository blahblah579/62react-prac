// src/hooks/useUserInvoices.js
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

/**
 * Provides real-time CRUD operations on the current user’s invoices.
 */
export function useUserInvoices() {
  const { currentUser } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Real-time listener: map each snapshot doc to include its .id
  useEffect(() => {
    if (!currentUser) return;

    const colRef = collection(db, "users", currentUser.uid, "invoices");
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const arr = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setInvoices(arr);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // 2. Add invoice: auto-generate ID, then write it back into the document
  async function addInvoice(invoiceData) {
    // create the doc with auto-ID
    const colRef = collection(db, "users", currentUser.uid, "invoices");
    const docRef = await addDoc(colRef, invoiceData);

    // patch the same document with its own ID field
    await updateDoc(docRef, { id: docRef.id });

    return docRef.id;
  }

  // 3. Update an existing invoice by ID (overwrite entire doc)
  function updateInvoice(id, invoiceData) {
    const docRef = doc(db, "users", currentUser.uid, "invoices", id);
    return setDoc(docRef, invoiceData);
  }

  // 4. Delete an invoice by ID
  function deleteInvoice(id) {
    const docRef = doc(db, "users", currentUser.uid, "invoices", id);
    return deleteDoc(docRef);
  }

  return {
    invoices,
    loading,
    setLoading,
    addInvoice,
    updateInvoice,
    deleteInvoice,
  };
}
