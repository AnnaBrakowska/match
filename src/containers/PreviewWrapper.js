import { connect } from 'react-redux';
import { enableEssayEdit } from '../ducks/madlibs';

import Preview from '../components/Preview';

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  enableEssayEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
