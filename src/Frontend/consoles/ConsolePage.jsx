import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConsolePage.css";

export function ConsolePage({ title, description, children }) {
  const navigate = useNavigate();

  return (
    <div className="console-page">
      <section className="console-hero">
        <div className="console-hero-copy">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button
          type="button"
          className="console-close-button"
          onClick={() => navigate("/dashboard/all-consoles")}
          aria-label={`Close ${title}`}
        >
          Close
        </button>
      </section>
      <section className="console-card">{children}</section>
    </div>
  );
}

export function ConsoleTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((tab) => tab.id === active) || tabs[0];

  return (
    <>
      <div className="console-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === current.id ? "console-tab console-tab-active" : "console-tab"}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="console-panel">{current?.component}</div>
    </>
  );
}
