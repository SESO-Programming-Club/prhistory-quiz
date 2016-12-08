(function() {
  var questions = [{
    question: "¿Que instrumento se usa para verificar la temperatura?",
    choices: ["Contador Geiger", "Termómetro", "Barómetro", "Contador Gilberto"],
    correctAnswer: 1
  }, {
    question: "¿Cual es el nombre para el medico de los taínos?",
    choices: ["Cacique", "Cajaya", "Bohike", "Bohio", "Boti"],
    correctAnswer: 2
  }, {
    question: "¿Cual huracán tuvo mas muertes?",
    choices: ["George", "San Felipe II", "San Ciprián", "Santa Clara", "Hugo"],
    correctAnswer: 1
  }, {
    question: "¿En que año llego el Huracán Hugo?",
    choices: ["1998", "1988", "1989", "1996", "1987"],
    correctAnswer: 2
  }, {
    question: "¿En que año llego el Huracán George?",
    choices: ["1996", "1931", "1988", "1997", "1998"],
    correctAnswer: 4
  }, {
    question: "¿Cuanto habitantes, segun O'Reilly, habian en San German durante el 1765?",
    choices: ["Menos de 1,000", "1,000 - 2,000", "2,000 - 3,000", "4,000 - 5,000", "Mas de 5,000"],
    correctAnswer: 4
  }, {
    question: "¿Qué porcentaje de la población en el 1765 eran esclavos africanos?",
    choices: ["12.4%", "13.4%", "12.1%", "12.6%", "12%"],
    correctAnswer: 3
  }, {
    question: "¿De la población hispana en Estados Unidos, que porcentaje son los puertoriqueños?",
    choices: ["9%", "14.5%", "10.4%", "66.1%", "66.2%"],
    correctAnswer: 0
  }, {
    question: "¿Cual es el significado de la palabra taína 'Yucahu'?",
    choices: ["Dios de la Yuca", "Yuca", "Diosa de la Yucah", "Campo de Yuca", "Ensalada de Yuca"],
    correctAnswer: 0
  }, {
    question: "¿Cual es el significado de la palabra taína 'Kayaka'?",
    choices: ["Dios del Huracán", "Bote Taino", "Jefe de la Tribu", "Medico", "Bola para el batu"],
    correctAnswer: 1
  }, {
    question: "¿Cual es el significado de la palabra taína 'Dajao'?",
    choices: ["Marisco", "Salmon", "Pez Escuridiso", "Cangrejo", "Cangrejo Escuridiso"],
    correctAnswer: 2
  }, {
    question: "¿Cual es el significado de la palabra taína 'Areito'?",
    choices: ["Cangrejo Escuridiso", "Ritual para curar enfermedades", "Bote Taíno", "Sortija hecha de flores", "Baile de Los Taínos"],
    correctAnswer: 4
  }, {
    question: "¿Quien de la tribu taína vivia en un 'Caney' y se sentaba en un 'Dujo'?",
    choices: ["Bojike", "Cacique", "Bohike", "Taínos Masculinos", "Taínos Enfermos"],
    correctAnswer: 1
  }, {
    question: "¿Cual es el significado de la palabra taína 'Jaiba'?",
    choices: ["Cangrejo Escuridiso", "Medico Taíno", "Pez del Mar", "Cangrejo del Mar", "Cangrejo Femenino"],
    correctAnswer: 3
  }, {
    question: "¿Cual de las siguientes palabras taínas significa 'Guerra Taína'?",
    choices: ["Guasabara", "Batey", "Arito", "Dujo", "Batu"],
    correctAnswer: 0
  }];
  //Guasabara
  
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    alert("Use your device in landscape mode for better viewing!");
 
  }
  
  //keep track of questions written so far
  console.log(questions.length); 
  
  var times = 0; //later on change this since its redundant to use it
  var total;
  var random = getRandomInt(0, questions.length - 1);
  var questionsDone = [];
  var questionCounter = 0; //Tracks question number
  var badAnswers = 0;
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  findNext();
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[random])) { //fix this error
      $('#container').effect("shake");
    }
    else if (selections[random] !== questions[random].correctAnswer){
      
      //alert('Incorrecto. ¡Inténtalo de nuevo!')
      badAnswers++;
      $('input[name="answer"]:checked').attr('disabled', true);
      $('#container').effect("shake");
      
     }
    
    else {
      times++;
      questionCounter++;
      if(times != questions.length)findNext();
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  /*$('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });*/
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    questionsDone = [];
    displayNext();
    total = 0;
    badAnswers = 0;
    times = 0;
    findNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Pregunta ' + (times + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  /*function fillArray(){
    
    for(var k = 0; k < questions.length; k++){
      
        questionsDone[k] = 0;
      
    }
    
  }*/
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    
    var radioList = $('<ul>');
    var item;
    var input = '';
    
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[random] = +$('input[name="answer"]:checked').val();
  }
  
  function getRandomInt(min, max) {
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
  }
  
  function findNext() {
    
     while(true){
      
      var check = questionsDone[random];
      
      if(!(check == 1)){
        
        questionsDone[random] = 1;
        return random = random;
        
      }
      else {
        
        random = getRandomInt(0, questions.length - 1); 
        
      }
    }
  }
  
  // Displays next requested element
  function displayNext() {
    
    quiz.fadeOut(function() {
      
      $('#question').remove();
      
      if(questionCounter < questions.length){
        
        var nextQuestion = createQuestionElement(random);
        quiz.append(nextQuestion).fadeIn();
        
        if (!(isNaN(selections[random]))) {
          $('input[value='+selections[random]+']').prop('checked', true);
        }
        
        if(questionCounter === 0){
          $('#next').show();
        }
        
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    total = questionCounter;
    
    total = total - badAnswers;
    
    score.append('¡Tuvistes ' + total + ' puntos de ' +
                 questions.length + '!');
    score.append('<p>' + '¡Cada contestacion incorrecta es -1!' + '</p>');
    
    return score;
    
  }
})();