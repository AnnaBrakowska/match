import { connect } from 'react-redux';
import { startOver, submitEssay } from '../ducks/madlibs';

import Edit from '../components/Edit';

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  startOver,
  submitEssay,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
