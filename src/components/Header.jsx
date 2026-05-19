import React from 'react';
import { languageOptions, t } from '../lib/i18n.js';

function Header({ language, onLanguageChange }) {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <>
      <div className="top-row">
        <div className="brand-row" aria-label="Institution logos">
          <img src={`${assetBase}logo1.jpg`} alt="Fudan University logo" />
          <img src={`${assetBase}logo2.png`} alt="Huashan Hospital logo" />
        </div>

        <label className="language-switcher" htmlFor="language">
          <span>{t(language, 'language')}</span>
          <select
            id="language"
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
          >
            {languageOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <header>
        <h1 id="page-title">{t(language, 'appTitle')}</h1>
        <p className="description">{t(language, 'appDescription')}</p>
      </header>
    </>
  );
}

export default Header;
