import React, { useState } from 'react';

function LanguageSearcher({setLanguage}) {
  return (
    <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="ja-Hrkt">Japanese (no kanji)</option>
          <option value="ko">Korean</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="zh-Hans">Chinese (simplified)</option>
        </select>
    
  );
}

export default LanguageSearcher;