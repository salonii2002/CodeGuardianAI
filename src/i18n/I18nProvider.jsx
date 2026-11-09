import { useState } from "react";
import I18nContext from "./I18nContext";
import { translations } from "./translations";

function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("cg-language") || "en";
  });

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("cg-language", newLanguage);
  };

  const t = (key) => {
    return (
      translations[language]?.[key] ||
      translations.en?.[key] ||
      key
    );
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        changeLanguage,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export default I18nProvider;