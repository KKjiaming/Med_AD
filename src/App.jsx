import React, { useEffect, useMemo, useRef, useState } from 'react';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import PatientForm from './components/PatientForm.jsx';
import RiskResult from './components/RiskResult.jsx';
import { initialForm } from './lib/constants.js';
import { getInterpretation } from './lib/interpretation.js';
import { t } from './lib/i18n.js';
import { calculateStageModel } from './lib/riskModel.js';

function PredictionLoadingPanel({ language }, ref) {
  return (
    <section
      className="prediction-loading-panel"
      ref={ref}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="prediction-loader">
        <div className="loader-grid" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="loader-pulse" aria-hidden="true" />
      </div>

      <p className="section-kicker">{t(language, 'predictingKicker')}</p>
      <h2>{t(language, 'predictingTitle')}</h2>
      <p>{t(language, 'predictingText')}</p>

      <div className="loading-steps">
        <span>{t(language, 'predictingStep1')}</span>
        <span>{t(language, 'predictingStep2')}</span>
        <span>{t(language, 'predictingStep3')}</span>
      </div>
    </section>
  );
}

const ForwardedPredictionLoadingPanel = React.forwardRef(PredictionLoadingPanel);

function App() {
  const [form, setForm] = useState(initialForm);
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const resultRef = useRef(null);
  const predictionTimerRef = useRef(null);

  const interpretation = useMemo(
    () => (result ? getInterpretation(result, language) : null),
    [result, language],
  );
  const showPredictionPane = isPredicting || (result && interpretation);

  useEffect(() => {
    document.title = t(language, 'appTitle');
  }, [language]);

  useEffect(() => {
    return () => {
      window.clearTimeout(predictionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isPredicting) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isPredicting]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextResult = calculateStageModel(form, language);

    if (nextResult.error) {
      setError(nextResult.error);
      setResult(null);
      setIsPredicting(false);
      return;
    }

    window.clearTimeout(predictionTimerRef.current);
    setError('');
    setResult(null);
    setIsPredicting(true);

    predictionTimerRef.current = window.setTimeout(() => {
      setResult(nextResult);
      setIsPredicting(false);
    }, 2000);
  }

  return (
    <main className="page-shell">
      <section
        className={`calculator-container ${showPredictionPane ? 'has-result' : ''}`}
        aria-labelledby="page-title"
      >
        <Header language={language} onLanguageChange={setLanguage} />

        <div className={`prediction-workspace ${showPredictionPane ? 'has-result' : ''}`}>
          <div className="input-pane">
            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <PatientForm
              form={form}
              language={language}
              isPredicting={isPredicting}
              onFieldChange={updateField}
              onSubmit={handleSubmit}
            />
          </div>

          {showPredictionPane && (
            <>
              <div className="prediction-connector" aria-hidden="true">
                <span>Predict</span>
              </div>
            </>
          )}

          {showPredictionPane && (
            <div className="result-pane">
              {isPredicting ? (
                <ForwardedPredictionLoadingPanel ref={resultRef} language={language} />
              ) : (
                result &&
                interpretation && (
                  <RiskResult
                    ref={resultRef}
                    result={result}
                    interpretation={interpretation}
                    language={language}
                  />
                )
              )}
            </div>
          )}
        </div>

        <Footer language={language} />
      </section>
    </main>
  );
}

export default App;
