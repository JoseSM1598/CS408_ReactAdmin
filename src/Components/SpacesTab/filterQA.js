export function filterDefaultQuestions(DefaultQuestionsList, spaceID) {
  return;
}

export function filterCustomQuestions(CustomQuestionsList, spaceID) {
  return;
}

export function filterAnswers(AnswersList, spaceID) {
  return AnswersList.filter(item => {
    if (item.getSpace().getSpaceId() == spaceID) {
      return true;
    }
  });
}
