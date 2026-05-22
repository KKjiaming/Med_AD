import React, { forwardRef } from 'react';
import {
  externalValidation,
  longitudinalFinding,
  modelOptions,
} from '../lib/constants.js';
import { t, tf } from '../lib/i18n.js';

const selectionMethods = ['randomForest', 'methodB', 'methodC'];

function MetricCard({ label, value, helper, className = '' }) {
  return (
    <div className={`metric-card ${className}`}>
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

function RiskDriverList({ result, language }) {
  return (
    <div className="risk-driver-list">
      {result.riskDrivers.map((item) => (
        <span key={`${item.type}-${item.id}`}>
          {item.type === 'system'
            ? tf(language, `systemLabels.${item.id}`, item.label)
            : tf(language, `fieldLabels.${item.id}`, item.label)}
        </span>
      ))}
    </div>
  );
}

function FutureRiskPanel({ result, interpretation, language }) {
  return (
    <section className="future-risk-panel">
      <div className="section-heading">
        <p className="section-kicker">{t(language, 'exploratoryLongitudinalSignal')}</p>
        <h3>{t(language, 'futureRiskTitle')}</h3>
      </div>

      <div className="future-risk-grid">
        <MetricCard
          label={t(language, 'baselineClinicalStage')}
          value={result.currentClinicalStage.label}
        />
        <MetricCard
          label={t(language, 'futureRiskLevel')}
          value={interpretation.riskLevelLabel}
          className={result.progressionRisk.level === 'high' ? 'metric-alert' : ''}
        />
        <MetricCard
          label={t(language, 'oneYearRisk')}
          value={`${result.progressionRisk.oneYearRisk}%`}
        />
        <MetricCard
          label={t(language, 'twoYearRisk')}
          value={`${result.progressionRisk.twoYearRisk}%`}
        />
      </div>

      <div className="risk-copy">
        <p>
          {t(language, 'riskText', {
            level: interpretation.riskLevelLabel,
          })}
        </p>
        <p>{interpretation.applicabilityNote}</p>
        <p className="caution-text">{t(language, 'stageCaution')}</p>
      </div>

      <div className="risk-drivers">
        <strong>{t(language, 'riskDrivers')}</strong>
        <RiskDriverList result={result} language={language} />
      </div>
    </section>
  );
}

function ReportPanel({ interpretation, language }) {
  const sections = [
    ['reportRelationTitle', interpretation.summary],
    ['reportPhenotypeTitle', interpretation.phenotypeText],
    ['reportContributionTitle', interpretation.contributionText],
    ['reportRiskTitle', interpretation.riskText],
    ['reportLimitTitle', interpretation.limitText],
  ];

  return (
    <section className="report-panel">
      <div className="section-heading">
        <p className="section-kicker">{t(language, 'reportTitle')}</p>
        <h3>{t(language, 'reportTitle')}</h3>
        <p>{t(language, 'reportIntro')}</p>
      </div>
      <div className="report-sections">
        {sections.map(([titleKey, body]) => (
          <article key={titleKey}>
            <h4>{t(language, titleKey)}</h4>
            <p>{body}</p>
          </article>
        ))}
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
      <div className="result-hero phenotype-hero">
        <div>
          <p className="section-kicker">{t(language, 'predictionLayer')}</p>
          <h2>{t(language, 'resultOverviewTitle')}</h2>
          <p>{t(language, 'resultOverviewText')}</p>
        </div>
        <div className="stage-badge relation-badge">
          <span>{t(language, 'clinicalBiologicalRelation')}</span>
          <strong className={interpretation.className}>{interpretation.relationLabel}</strong>
        </div>
      </div>

      <div className="metric-grid summary-grid">
        <MetricCard
          label={t(language, 'currentClinicalStage')}
          value={result.currentClinicalStage.label}
        />
        <MetricCard
          label={t(language, 'biologicalStage')}
          value={result.biologicalStage.label}
        />
        <MetricCard
          label={t(language, 'phenotypeScore')}
          value={`${result.score} / 100`}
          helper={t(language, 'scaledScore')}
        />
        <MetricCard
          label={t(language, 'phenotypeBurden')}
          value={interpretation.burdenLabel}
          className={result.phenotypeBurden.level === 'high' ? 'metric-alert' : ''}
        />
        <MetricCard
          label={t(language, 'progressionRisk')}
          value={interpretation.riskLevelLabel}
          className={result.progressionRisk.level === 'high' ? 'metric-alert' : ''}
        />
        <MetricCard
          label={t(language, 'oneYearRisk')}
          value={`${result.progressionRisk.oneYearRisk}%`}
        />
        <MetricCard
          label={t(language, 'twoYearRisk')}
          value={`${result.progressionRisk.twoYearRisk}%`}
        />
        <MetricCard
          label={t(language, 'applicability')}
          value={result.progressionRisk.applicable ? 'Stage 1-4' : 'Stage 5-6'}
          helper={interpretation.applicabilityNote}
        />
      </div>

      <section className="phenotype-explanation-panel">
        <div className="section-heading">
          <p className="section-kicker">{t(language, 'currentPhenotypeExplanation')}</p>
          <h3>{t(language, 'currentPhenotypeExplanation')}</h3>
        </div>
        <p>{interpretation.summary}</p>
        <p>{interpretation.phenotypeText}</p>
      </section>

      <div className="probability-panel">
        <h3>{t(language, 'stageProbabilityProfile')}</h3>
        <div className="probability-grid">
          {result.probabilities.map((stage) => (
            <div className="probability-item" key={stage.label}>
              <div className="probability-topline">
                <span>{t(language, 'stageLabel', { stage: stage.label })}</span>
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
          <p className="panel-caption">{t(language, 'contributionSentence')}</p>
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
          <p className="panel-caption">{t(language, 'driverSentence')}</p>
        </section>
      </div>

      <FutureRiskPanel
        result={result}
        interpretation={interpretation}
        language={language}
      />

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

      <ReportPanel interpretation={interpretation} language={language} />

      <div className="explanation">
        <p>
          <strong>{t(language, 'prototypeNoteLabel')}:</strong>{' '}
          {t(language, 'prototypeNote')}
        </p>
      </div>
    </section>
  );
});

export default RiskResult;
