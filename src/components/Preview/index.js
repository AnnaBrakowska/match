import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';
import CONTENT from '../../util/content';

const Preview = ({
  enableEssayEdit, fieldAnswers, shouldDisplayEditButton,
}) => {
  const displayBoldInput = (field) => {
    const { filledTemplate, answer } = field;
    return reactStringReplace(filledTemplate, answer, (match, i) => (<span key={i} className="bold">{match}</span>));
  };

  const allFields = Object.keys(fieldAnswers);

  return (
    <div className="container">
      <div className="row">
        <h2>{CONTENT.previewTitle}</h2>
      </div>
      <div className="row">
        <p>
          {allFields.map((field) => (
            <span key={field}>
              { displayBoldInput(fieldAnswers[field]) }&nbsp;
            </span>
          ))}
        </p>
      </div>
      { shouldDisplayEditButton && (
      <div className="row--align-bottom">
        <button onClick={enableEssayEdit}>{CONTENT.editButton}</button>
      </div>
      )}
    </div>
  );
};

Preview.propTypes = {
  enableEssayEdit: PropTypes.func.isRequired,
  fieldAnswers: PropTypes.instanceOf(Object).isRequired,
  shouldDisplayEditButton: PropTypes.bool.isRequired,
};

export default Preview;
