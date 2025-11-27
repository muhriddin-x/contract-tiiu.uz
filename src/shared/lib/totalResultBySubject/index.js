export const totalResultBySubject = (count, subject) => {
  if (subject == "first_subject_score") {
    return count * 7.1;
  } else if (subject == "second_subject_score") {
    return count * 6.1;
  } else {
    return count * 6.1;
  }
};
