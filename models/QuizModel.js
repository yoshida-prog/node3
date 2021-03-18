class Quiz {
  constructor(category, type, difficulty, question, correct_answer, incorrect_answers) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers;
  }
}

module.exports = {
  createQuiz: (body) => {
    const quizDatas = body.results;
    const quizArray = [];
    quizDatas.forEach(data => {
      const quiz = new Quiz(
        data.category,
        data.type,
        data.difficulty,
        data.question,
        data.correct_answer,
        data.incorrect_answers
      );
      quizArray.push(quiz);
    })
    return quizArray;
  }
}
