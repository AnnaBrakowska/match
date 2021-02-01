import {
  FIELD_NAMES,
} from '../util/constants';
import { checkAnswersLength, createEssay, fillInTemplate } from '../util/helpers';


// Action types
// ----------------------------------------------------------------------------

export const COMPOSE_ESSAY = 'MADLIBS.COMPOSE_ESSAY';
export const DISPLAY_EDIT_BUTTON = 'MADLIBS.DISPLAY_EDIT_BUTTON';
export const ENABLE_ESSAY_EDIT = 'MADLIBS.ENABLE_ESSAY_EDIT';
export const REMOVE_FIELD_ERROR = 'MADLIBS.REMOVE_FIELD_ERROR';
export const REMOVE_FILLED_TEXT = 'MADLIBS.REMOVE_FILLED_TEXT';
export const SET_FIELD_ERROR = 'MADLIBS.SET_FIELD_ERROR';
export const START_OVER = 'MADLIBS.START_OVER';
export const SUBMIT_FIELD = 'MADLIBS.SUBMIT_FIELD';
export const SUBMIT_FILLED_TEMPLATE = 'MADLIBS.SUBMIT_FULL_ANSWER';

// Initial state
// ----------------------------------------------------------------------------

export const INITIAL_STATE = {
  editEnabled: false,
  errors: {},
  essayText: '',
  fieldAnswers: {},
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.bar,
  ],
  shouldDisplayEditButton: false,
};


// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMPOSE_ESSAY: {
      const { essayText } = action.payload;
      return {
        ...state,
        essayText,
      };
    }

    case DISPLAY_EDIT_BUTTON: {
      const { value } = action.payload;

      return {
        ...state,
        shouldDisplayEditButton: value,
      };
    }

    case ENABLE_ESSAY_EDIT: {
      return {
        ...state,
        editEnabled: true,
      };
    }

    case REMOVE_FIELD_ERROR: {
      const { fieldName } = action.payload;
      const errors = { ...state.errors };
      delete errors[fieldName];
      return {
        ...state,
        errors: {
          ...errors,
        },
      };
    }

    case REMOVE_FILLED_TEXT: {
      const { fieldName } = action.payload;
      return {
        ...state,
        fieldAnswers: {
          ...state.fieldAnswers,
          [fieldName]: {
            filledTemplate: null,
          },
        },
      };
    }

    case SET_FIELD_ERROR: {
      const { fieldName } = action.payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [fieldName]: true,
        },

      };
    }

    case SUBMIT_FIELD: {
      const { fieldName, answer } = action.payload;
      return {
        ...state,
        fieldAnswers: {
          ...state.fieldAnswers,
          [fieldName]: {
            answer,
          },
        },
      };
    }

    case START_OVER: {
      return {
        ...state,
        fieldAnswers: {},
        errors: {},
        essayText: '',
        editEnabled: false,
        showEditButton: false,
        shouldDisplayEditButton: false,
      };
    }

    case SUBMIT_FILLED_TEMPLATE: {
      const { fieldName, filledTemplate } = action.payload;
      return {
        ...state,
        fieldAnswers: {
          ...state.fieldAnswers,
          [fieldName]: {
            ...state.fieldAnswers[fieldName],
            filledTemplate,
          },
        },
      };
    }

    default:
      return state;
  }
}


// Action creators
// ----------------------------------------------------------------------------
export const composeEssay = (fieldAnswers) => {
  const text = createEssay(fieldAnswers);
  return { type: COMPOSE_ESSAY, payload: { essayText: text } };
};

export const displayEditButton = () => (dispatch, getState) => {
  const { fieldOrder, fieldAnswers } = getState();
  const shouldEditButtonBeVisible = fieldOrder.length === checkAnswersLength(fieldAnswers);
  return dispatch({ type: DISPLAY_EDIT_BUTTON, payload: { value: shouldEditButtonBeVisible } });
};

export const enableEssayEdit = () => ({ type: ENABLE_ESSAY_EDIT });

export const removeFieldError = (id) => ({ type: REMOVE_FIELD_ERROR, payload: id });

export const removeFilledText = (fieldName) => ({ type: REMOVE_FILLED_TEXT, payload: fieldName });

export const setFieldError = ({ id }) => ({ type: SET_FIELD_ERROR, payload: { fieldName: id } });

export const startOver = () => ({ type: START_OVER });

export const submitEssay = ({ text }) => ({ type: COMPOSE_ESSAY, payload: { essayText: text } });

export const submitFilledTemplate = ({ id, answer }) => {
  const filledTemplate = fillInTemplate(id, answer);
  return { type: SUBMIT_FILLED_TEMPLATE, payload: { fieldName: id, filledTemplate } };
};

export const submitField = ({ id, answer }) => (dispatch, getState) => {
  const { fieldAnswers } = getState();

  // If the answer is shorter than 2 characters but not empty ex: 'a', 'b' etc  - exit.
  // TODO: Check what should be the minimum number of characters.
  if (answer.length < 2 && answer !== '') {
    dispatch(setFieldError({ id }));
    return;
  }

  // Submit the field value if the value is longer than 1 character and is not an empty string.
  dispatch({ type: SUBMIT_FIELD, payload: { fieldName: id, answer } });

  // Before filling the template check if the value is not an empty string -
  // - that means the user removed the answer.
  // In that case the filled template will be removed from preview.
  if (answer === '') {
    dispatch(removeFilledText({ id }));
    dispatch(setFieldError({ id }));
  } else if (answer !== fieldAnswers[id]) {
    // If the value submitted is different than the value in the store - fill the template.
    dispatch(submitFilledTemplate({ id, answer }));
    dispatch(removeFieldError({ fieldName: id }));
  }

  // Check if edit button should be displayed.
  dispatch(displayEditButton());

  // Compose an essay from all filled templates.
  dispatch(composeEssay(fieldAnswers));
};
