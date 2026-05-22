import React from 'react';
import { modelOptions, variableGroups } from '../lib/constants.js';
import { t, tf } from '../lib/i18n.js';

function FieldInput({ field, value, onChange, disabled, language }) {
  const className = disabled ? 'form-group is-inactive' : 'form-group';
  const label = tf(language, `fieldLabels.${field.id}`, field.label);
  const note = tf(language, `fieldNotes.${field.id}`, field.note || '\u00a0');

  if (field.type === 'select') {
    return (
      <div className={className}>
        <label htmlFor={field.id}>{label}</label>
        <div className="formula-note">{note}</div>
        <select
          id={field.id}
          name={field.id}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={className}>
      <label htmlFor={field.id}>
        {label}
        {field.unit ? <span className="unit-label"> {field.unit}</span> : null}
      </label>
      <div className="formula-note">{note}</div>
      <input
        id={field.id}
        name={field.id}
        type="number"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        disabled={disabled}
      />
    </div>
  );
}

function PatientForm({ form, language, isPredicting, onFieldChange, onSubmit }) {
  return (
    <form className="model-form" onSubmit={onSubmit}>
      <section className="model-selector" aria-label={t(language, 'scoringModel')}>
        <div>
          <p className="section-kicker">{t(language, 'mainModelLayer')}</p>
          <h2>{t(language, 'chooseModel')}</h2>
          <p className="model-helper">{t(language, 'fixedModelHelper')}</p>
        </div>
        <div className="fixed-model-badge" aria-label={t(language, 'scoringModel')}>
          <strong>{modelOptions.find((model) => model.id === form.modelId)?.label}</strong>
          <span>
            {modelOptions.find((model) => model.id === form.modelId)?.variableCount}{' '}
            {t(language, 'variables')}
          </span>
        </div>
      </section>

      {variableGroups.map((group) => (
        <section className="variable-section" key={group.id}>
          <div className="section-heading">
            <p className="section-kicker">{t(language, 'inputLayer')}</p>
            <h2>{tf(language, `groupTitles.${group.id}`, group.title)}</h2>
          </div>
          <div className="input-section">
            {group.fields.map((field) => (
              <FieldInput
                key={field.id}
                field={field}
                value={form[field.id]}
                onChange={onFieldChange}
                disabled={!field.inputOnly && !field.models.includes(form.modelId)}
                language={language}
              />
            ))}
          </div>
        </section>
      ))}

      <div className="additional-factors" aria-label={t(language, 'additionalFactorsTitle')}>
        <span aria-hidden="true">...</span>
        <div>
          <strong>{t(language, 'additionalFactorsTitle')}</strong>
          <p>{t(language, 'additionalFactorsText')}</p>
        </div>
      </div>

      <div className="btn-container">
        <button
          className={isPredicting ? 'is-predicting' : ''}
          type="submit"
          disabled={isPredicting}
        >
          {isPredicting ? t(language, 'predictingButton') : t(language, 'predictButton')}
        </button>
      </div>
    </form>
  );
}

export default PatientForm;
