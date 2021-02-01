import { connect } from 'react-redux';
import { submitField } from '../ducks/madlibs';

import Questions from '../components/Questions';

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  submitField,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
