import React from 'react';
import PropTypes from 'prop-types';
import EditWrapper from '../containers/EditWrapper';
import PreviewWrapper from '../containers/PreviewWrapper';
import QuestionsWrapper from '../containers/QuestionsWrapper';
import '../styles/main.scss';

const App = ({ editEnabled }) => (
  <div className="match-area">
    {
      editEnabled
        ? (
          <div className="col">
            <EditWrapper />
          </div>
        )
        : (
          <>
            <div className="col">
              <QuestionsWrapper />
            </div>

            <div className="col background-color">
              <PreviewWrapper />
            </div>
          </>
        )
    }
  </div>
);

export default App;

App.propTypes = {
  editEnabled: PropTypes.bool.isRequired,
};
