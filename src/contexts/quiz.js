import React, { createContext, useReducer } from "react";
import questions from "../data";
import { shuffleAnswers } from "./../helpers";

const initialState = {
  questions,
  currentQuestionIndex: 0,
  showResults: false,
  amountOfCorrectAnswers: 0,
  answers: shuffleAnswers(questions[0]),
  isCorrectAnswer: false,
  currentAnswer: "",
};
const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1; //: true : false
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex, //state.currentQuestionIndex + 1, это было до верхней константы
        showResults,
        answers,
        currentAnswer: "",
      };
    }
    case "RESTART": {
      return initialState;
    }
    case "SELECT_ANSWER": {
      const amountOfCorrectAnswers =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.amountOfCorrectAnswers + 1
          : state.amountOfCorrectAnswers; // было конст isAnswerRight но это неправильно

      return {
        ...state,
        currentAnswer: action.payload,
        amountOfCorrectAnswers,
      };
    }
    default:
      return state;
  }
};
export const QuizContext = createContext();
export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
