import React from 'react';
import { t } from '../lib/i18n.js';

function Footer({ language }) {
  return (
    <footer>
      <p>{t(language, 'footerLine1')}</p>
      <p>{t(language, 'footerLine2')}</p>
      <p>{t(language, 'footerLine3')}</p>
    </footer>
  );
}

export default Footer;
