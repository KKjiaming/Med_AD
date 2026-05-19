import React, { forwardRef } from 'react';
import {
  externalValidation,
  longitudinalFinding,
  modelOptions,
} from '../lib/constants.js';
import { t, tf } from '../lib/i18n.js';

const selectionMethods = ['randomForest', 'methodB', 'methodC'];

function MetricCard({ label, value, helper }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {helper ? <small>{helper}</small> : null}
    </div>
  );
}

function ContributionBar({ item, language }) {
  return (
    <div className="contribution-row">
      <div className="contribution-label">
        <span>{tf(language, `systemLabels.${item.id}`, item.label)}</span>
        <strong>{item.percent.toFixed(1)}%</strong>
      </div>
      <div className="bar-track">
        <div
          className="bar-fill"
          style={{
            width: `${Math.max(item.percent, 2)}%`,
            backgroundColor: item.color,
          }}
        />
      </div>
    </div>
  );
}

function WorkflowSummary({ result, language }) {
  return (
    <section className="workflow-summary">
      <div className="section-heading">
        <p className="section-kicker">{t(language, 'workflowCompactKicker')}</p>
        <h3>{t(language, 'workflowCompactTitle')}</h3>
      </div>

      <div className="workflow-flow" aria-label={t(language, 'workflowRouteLabel')}>
        <div className="flow-node flow-node-primary">
          <span>{t(language, 'workflowBackbone')}</span>
          <strong>{t(language, 'workflow.route.ordinal.title')}</strong>
          <small>{t(language, 'workflow.route.ordinal.text')}</small>
        </div>

        <div className="flow-arrow" aria-hidden="true" />

        <div className="flow-node flow-node-methods">
          <span>{t(language, 'selectionKicker')}</span>
          <strong>{t(language, 'selectionTitle')}</strong>
          <div className="method-chips">
            {selectionMethods.map((method) => (
              <em key={method}>{t(language, `workflow.methods.${method}.title`)}</em>
            ))}
          </div>
        </div>

        <div className="flow-arrow" aria-hidden="true" />

        <div className="flow-node flow-node-score">
          <span>{result.model.label}</span>
          <strong>{t(language, `workflow.scores.${result.model.id}`)}</strong>
          <small>
            {result.activeVariableCount} {t(language, 'variables')}
          </small>
        </div>
      </div>
    </section>
  );
}

const RiskResult = forwardRef(function RiskResult(
  { result, interpretation, language },
  ref,
) {
  const topVariables = result.variableContributions.slice(0, 8);
  const longitudinalOutcome = t(language, 'longitudinalOutcome');

  return (
    <section className="result-container" ref={ref} aria-live="polite">
      <div className="result-hero">
        <div>
          <p className="section-kicker">{t(language, 'predictionLayer')}</p>
          <h2>{t(language, 'currentClinicalStage')}</h2>
          <p>{interpretation.interpretation}</p>
        </div>
        <div className="stage-badge">
          <span>{t(language, 'predictedStage')}</span>
          <strong className={interpretation.className}>
            {result.predictedStage.label}
          </strong>
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard
          label={t(language, 'prototypeScore')}
          value={result.score}
          helper={t(language, 'scaledScore')}
        />
        <MetricCard
          label={t(language, 'model')}
          value={result.model.label}
          helper={tf(language, `modelTitles.${result.model.id}`, result.model.title)}
        />
        <MetricCard
          label={t(language, 'variablesUsed')}
          value={result.activeVariableCount}
          helper={t(language, 'trainingAuc', {
            auc: result.model.auc.toFixed(2),
          })}
        />
      </div>

      <div className="probability-panel">
        <h3>{t(language, 'stageProbabilityProfile')}</h3>
        <div className="probability-grid">
          {result.probabilities.map((stage) => (
            <div className="probability-item" key={stage.label}>
              <div className="probability-topline">
                <span>
                  {t(language, 'stageLabel', { stage: stage.label })}
                </span>
                <strong>{stage.probability.toFixed(1)}%</strong>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill probability-fill"
                  style={{ width: `${stage.probability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="insight-grid">
        <section className="insight-panel">
          <div className="section-heading">
            <p className="section-kicker">{t(language, 'explanationLayer')}</p>
            <h3>{t(language, 'systemContribution')}</h3>
          </div>
          {result.systemContributions.map((item) => (
            <ContributionBar item={item} key={item.id} language={language} />
          ))}
        </section>

        <section className="insight-panel">
          <div className="section-heading">
            <p className="section-kicker">{t(language, 'topVariables')}</p>
            <h3>{t(language, 'largestScoreDrivers')}</h3>
          </div>
          <div className="variable-rank">
            {topVariables.map((item) => (
              <div className="variable-pill" key={item.id}>
                <span>{tf(language, `fieldLabels.${item.id}`, item.label)}</span>
                <strong>{item.percent.toFixed(1)}%</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <WorkflowSummary result={result} language={language} />

      <section className="evidence-panel">
        <div className="section-heading">
          <p className="section-kicker">
            {t(language, 'modelDevelopmentEvidence')}
          </p>
          <h3>{t(language, 'trainingPerformance')}</h3>
        </div>
        <div
          className="model-table"
          role="table"
          aria-label={t(language, 'trainingPerformance')}
        >
          <div className="model-table-row model-table-head" role="row">
            <span>{t(language, 'modelColumn')}</span>
            <span>{t(language, 'variablesColumn')}</span>
            <span>AUC</span>
            <span>C-index</span>
          </div>
          {modelOptions.map((model) => (
            <div className="model-table-row" role="row" key={model.id}>
              <span>{model.label}</span>
              <span>{model.variableCount}</span>
              <span>{model.auc.toFixed(2)}</span>
              <span>{model.cIndex.toFixed(3)}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="validation-grid">
        <section className="evidence-card">
          <p className="section-kicker">{t(language, 'externalValidation')}</p>
          <h3>
            {t(language, 'multicenterCases', {
              count: externalValidation.sampleSize,
            })}
          </h3>
          <p>
            {t(language, 'externalValidationSummary', {
              or: externalValidation.score3.oddsRatio,
              auc: externalValidation.score3.auc.toFixed(2),
              cIndex: externalValidation.score3.cIndex.toFixed(3),
            })}
          </p>
          <small>{t(language, 'externalValidationNote')}</small>
        </section>

        <section className="evidence-card">
          <p className="section-kicker">
            {t(language, 'exploratoryLongitudinalSignal')}
          </p>
          <h3>{t(language, 'longitudinalCohort')}</h3>
          <p>
            {t(language, 'longitudinalSummary', {
              outcome: longitudinalOutcome,
              auc: longitudinalFinding.auc.toFixed(3),
              or: longitudinalFinding.oddsRatio,
              pValue: longitudinalFinding.pValue,
            })}
          </p>
          <small>{t(language, 'longitudinalNote')}</small>
        </section>
      </div>

      <div className="explanation">
        <p>
          <strong>{t(language, 'interpretationLabel')}:</strong>{' '}
          {interpretation.advice}
        </p>
        <p>
          <strong>{t(language, 'prototypeNoteLabel')}:</strong>{' '}
          {t(language, 'prototypeNote')}
        </p>
      </div>
    </section>
  );
});

export default RiskResult;
