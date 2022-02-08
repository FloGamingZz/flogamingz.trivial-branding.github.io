const son_yes = new Audio('son_app.mp3');
const son_no = new Audio('son_echec.mp3');

class Question {
  constructor(text, choices, answer, explication) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.explication = explication;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }

}
let questions = [
  new Question("Un de vos collègues vole votre travail et se l’approprie que faites vous ?", ["Au début c'était stressant et vous aviez du mal à vous adapter.", "Vous avez mis un peu de temps à vous adapter dû à la gestion de votre stress.", "Vous avez apprécié, cela vous a permis d'apprendre à gérer votre stress."], "Vous avez apprécié, cela vous a permis d'apprendre à gérer votre stress.", "<u>Explications :</u> Lors d'un entretien d'embauche il faut savoir valoriser vos points faibles en favorisant le gain d'expérience potentiel."),
  new Question("Un désaccord éclate entre vous et votre collègue :", ["Vous manquez de patience et lui hurlez dessus.", "Vous attendez que les tension s’apaisent et vous vous expliquez plus tard.", "Vous faites l’impasse sur cette histoire et passez toute de suite à autre chose."], "Vous attendez que les tension s’apaisent et vous vous expliquez plus tard.", "<u>Explications :</u> Il ne faut jamais laisser les problèmes en suspens, il faut les traiter rapidement mais faîtes le lorsque que tout le monde aura repris ses esprits."),
  new Question("Vous avez un projet de groupe et l'un de vos collègues s'approprie tout le mérite.", ["Vous vous plaignez auprès de vos collègues.", "Vous organisez une réunion avec ce collègue pour discuter de votre accréditation.", "C'est pas grave, c'est un projet comme tant d'autres."], "Vous organisez une réunion avec ce collègue pour discuter de votre accréditation.", "<u>Explications :</u> Votre propriété intellectuelle vous appartient. Votre travail mérite d'être reconnu mais vous ne devez pas pour autant créer des conflits causés par une mauvaise communication."),
  new Question("Corentin et Thomas se sont disputés il y a 2 semaines.<br> Ils sont tous les 2 designers et la deadline pour la création du visuel de votre projet est déjà dépassée depuis 1 semaine.<br> En tant que team leader, que décidez-vous de faire ?", ["Vous les laissez gérer leurs conflits, vous n'en faites pas partie.", "Vous les laissez gérer leurs conflits, vous n'en faites pas partie.", "Vous organisez des réunions individuelles et communes en leurs rappelant que l'équipe a besoin d'eux."], "Vous organisez des réunions individuelles et communes en leurs rappelant que l'équipe a besoin d'eux.", "<u>Explications :</u> Il ne faut pas oublier que l'équipe prend du retard dû au manque de communication. Cependant si des tentions sont présentes il faut savoir écouter les raisons de chacun pour favoriser le bien-être de tous."),
  new Question("L'agence vous offre une entrée à la soirée séminaire des grandes entreprises. Votre présence n'est pas obligatoire mais vous y êtes convié.", ["Vous vous y rendez en vous fixant des objectifs précis.", "Vous n'y allez pas et préférez rester chez vous et avancer sur vos projets.", "Vous y allez pour ne pas vous faire remarquer par l'administration."], "Vous vous y rendez en vous fixant des objectifs précis.", "<u>Explications :</u> Se fixer des objectifs clairs vous permet de vous focaliser sur vos capacités professionnelles et ainsi accroître vos potentielles promotions."),
  new Question("Vous venez de finir un long projet avec toute l'équipe.<br> Ce fût une période stressante et intense.<br> Que faites vous avec l'équipe ?", ["Vous félicitez tout le monde et vous les invitez à passer un moment en dehors du travail.", "Vous allez voir individuellement les personnes pour leurs dire ce qui n'a pas été.", "Vous enchaînez directement sur un autre projet."], "Vous félicitez tout le monde et vous les invitez à passer un moment en dehors du travail.", "<u>Explications :</u> Il est important de chercher les points forts et les axes d'amélioration au même titre que de féliciter l'équipe. Prendre du temps de repos et ne pas enchaîner projet sur projet est nécessaire au bien-être de tous.")
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.explication = false;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    this.explication = true
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    display.explication(answer)
    this.currentQuestionIndex++;
    document.getElementById("expliquation").onclick = function() {
      quiz.explication = false
      quizApp()
    }
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    console.log(element)
    element.innerHTML = text;
  },
  explication: function(answer) {
    let titre = ""
    let color = ""
    if(quiz.getCurrentQuestion().isCorrectAnswer(answer)){
      son_yes.play();
      titre = "Bonne réponse"
      color = "green"
    }else {
      son_no.play();
      titre = "Mauvaise réponse"
      color = "red"
    }
    ExplicationHTML = `
      <h1 class="${color}">${titre}</h1>
      <div class="exp">
      <h3> ${quiz.questions[quiz.currentQuestionIndex].explication} </h3>
      </div>
      <div class="choices">
        <button id="expliquation" className="btn">
          <p>Question suivante</p>
        </button>
      </div>`;

    this.elementShown("quiz", ExplicationHTML);
  },
  endQuiz: function() {
    endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
  },
  question: function() {
    QuestionHTML = `
      <div id="quiz">
        <h1><span>T</span>rivial Branding</h1>
  
        <h2 id="question"></h2>
  
        <h3 id="score"></h3>
  
        <div class="choices">
          <button id="guess0" class="btn">
            <p id="choice0"></p>
          </button>
  
          <button id="guess1" class="btn">
            <p id="choice1"></p>
          </button>
  
          <button id="guess2" class="btn">
            <p id="choice2"></p>
          </button>
          
        </div>
  
    <div class = "image">
      <img src ="https://cdn.discordapp.com/attachments/795431896653103134/940345030399369252/logo_trivial.png">
    </div>
  
        <p id="progress"></p>
  
      </div>`
    this.elementShown("main", QuestionHTML);
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function() {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      // Choix de la reponse
      document.getElementById(id).onclick = function() {
        quiz.guess(guess);
      }
    }
    // affichage choix + prise en compte du choix
    for(let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
  },
};

// Game logic
quizApp = () => {
  console.log(quiz.hasEnded(),quiz.explication)
  if (quiz.hasEnded() && !quiz.explication) {
    display.endQuiz();
  } else {
    if(!quiz.explication){
      display.question();
      display.choices();
      display.progress();
    }
  }
}
// Create Quiz
let quiz = new Quiz(questions);
quizApp();
