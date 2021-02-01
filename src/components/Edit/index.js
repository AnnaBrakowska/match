import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CONTENT from '../../util/content';

const Edit = ({ essayText, startOver, submitEssay }) => {
  const [text, setText] = useState(essayText);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    submitEssay({ text });
  };

  return (
    <div className="container">
      <h2>{CONTENT.editTitle}</h2>
      <textarea
        value={text}
        onBlur={() => handleSubmit()}
        onKeyUp={(e) => handleChange(e)}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={startOver}>{CONTENT.startOverButton}</button>
    </div>
  );
};

Edit.propTypes = {
  essayText: PropTypes.string.isRequired,
  startOver: PropTypes.func.isRequired,
  submitEssay: PropTypes.func.isRequired,
};

export default Edit;
