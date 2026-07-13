"use client";

import { useEffect, useState } from "react";

type BusinessInfo = {
  name: string;
  hours: string;
  services: string;
  address: string;
  phone: string;
  bookingUrl: string;
};

const defaultBusiness: BusinessInfo = {
  name: "Bella Beauty Studio",
  hours: "Monday-Friday 9 AM-7 PM, Saturday 9 AM-4 PM, closed Sunday",
  services:
    "Haircuts from $45, blowouts from $40, hair color from $85, balayage from $150, lash extensions from $120",
  address: "125 Main Street",
  phone: "(555) 123-4567",
  bookingUrl: "https://example.com/book",
};

export default function AdminPage() {
  const [business, setBusiness] = useState<BusinessInfo>(defaultBusiness);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("savvyBusiness");

    if (stored) {
      setBusiness(JSON.parse(stored));
    }
  }, []);

  function updateField(field: keyof BusinessInfo, value: string) {
    setBusiness((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  }

  function saveBusiness() {
    localStorage.setItem("savvyBusiness", JSON.stringify(business));
    setSaved(true);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Savvy Business Dashboard</h1>

        <p style={{ color: "#64748b", lineHeight: 1.6 }}>
          Update the business information Savvy should use when answering
          customers.
        </p>

        <label style={labelStyle}>Business name</label>
        <input
          value={business.name}
          onChange={(event) => updateField("name", event.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Hours</label>
        <textarea
          value={business.hours}
          onChange={(event) => updateField("hours", event.target.value)}
          style={textareaStyle}
        />

        <label style={labelStyle}>Services and prices</label>
        <textarea
          value={business.services}
          onChange={(event) => updateField("services", event.target.value)}
          style={textareaStyle}
        />

        <label style={labelStyle}>Address</label>
        <input
          value={business.address}
          onChange={(event) => updateField("address", event.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Phone</label>
        <input
          value={business.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Booking link</label>
        <input
          value={business.bookingUrl}
          onChange={(event) => updateField("bookingUrl", event.target.value)}
          style={inputStyle}
        />

        <button onClick={saveBusiness} style={buttonStyle}>
          Save Business Information
        </button>

        {saved && (
          <p
            style={{
              marginTop: "18px",
              background: "#dcfce7",
              color: "#166534",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            Saved successfully.
          </p>
        )}
      </div>
    </main>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginTop: "20px",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "13px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  fontSize: "16px",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "100px",
  resize: "vertical" as const,
};

const buttonStyle = {
  marginTop: "24px",
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "10px",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};