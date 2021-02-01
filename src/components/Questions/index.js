import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FIELDS } from '../../util/constants';
import CONTENT from '../../util/content';

const Questions = ({ errors, submitField, fieldOrder }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswers = (e) => {
    const { name, value } = e.target;
    setAnswers(() => ({ ...answers, [name]: value }));
  };

  const handleSubmit = (field) => {
    // If the user typed an answer and the answer is:
    // * less than 1 character
    // * or empty string (user typed an answer and removed)
    // then set and error for that field. An error message will be displayed
    if (field in answers) {
      submitField({ id: field, answer: answers[field] });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h2>{CONTENT.questionsTitle}</h2>
      </div>
      <div>
        {fieldOrder.map((field) => (
          <div className="questions" key={field}>
            <label htmlFor={field} className="questions__label">{FIELDS[field]}</label>
            <input
              id={field}
              type="text"
              required
              className={`questions__input ${errors[field] ? 'questions__input--error' : ''}`}
              name={field}
              value={answers[field] || ''}
              onChange={(e) => handleAnswers(e)}
              onBlur={() => handleSubmit(field)}
            />
            <p className={`questions__error-message ${errors[field] && 'questions__error-message--shown'}`}>{CONTENT.errorMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Questions.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  fieldOrder: PropTypes.instanceOf(Array).isRequired,
  submitField: PropTypes.func.isRequired,
};

export default Questions;
