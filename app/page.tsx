export default function Home() {

  return (

    <main

      style={{

        background: "#0f172a",

        color: "white",

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        flexDirection: "column",

        fontFamily: "Arial",

      }}

    >

      <h1 style={{ fontSize: "64px", marginBottom: "10px" }}>

        🧠 Savvy AI

      </h1>

      <p style={{ fontSize: "22px", color: "#94a3b8" }}>

        Smarter conversations. Faster answers.

      </p>

      <button

        style={{

          marginTop: "30px",

          padding: "15px 35px",

          fontSize: "20px",

          borderRadius: "12px",

          border: "none",

          background: "#2563eb",

          color: "white",

          cursor: "pointer",

        }}

      >

        Start Chatting

      </button>

    </main>

  );

}



