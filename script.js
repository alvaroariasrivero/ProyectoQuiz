async function getQ() {
    try{
        let response = await fetch('https://opentdb.com/api.php?amount=10&category=11&type=multiple')
        let data = await response.json()
        let ronda = data.results
        // console.log("esto es ronda", ronda)
        let questions = ronda.map(({correct_answer, incorrect_answers, question}) => {
          return  {
            pregunta: question,
            respuestas: [correct_answer, incorrect_answers[0], incorrect_answers[1], incorrect_answers[2]]
          }
  
      })
        return questions
      
    } catch {
      console.log("error")
    }
  }
  
  // getQ().then(data  => data)
  
  const quiz = document.getElementById('quiz')
  const answerEls = document.querySelectorAll('.answer')
  const questionEl = document.getElementById('question')
  const a_text = document.getElementById('a_text')
  const b_text = document.getElementById('b_text')
  const c_text = document.getElementById('c_text')
  const d_text = document.getElementById('d_text')
  const submitBtn = document.getElementById('submit')
  
  let nivel = 0
  let puntuacion = 0
  
  loadQuiz()
  
  async function loadQuiz() {
    const pregunta = await getQ().then(questions  => questions)
    // console.log('este es el quiz', pregunta)
    
    deselAnswer()
    
    const nivelPregunta = pregunta[nivel]
  
    questionEl.innerHTML = nivelPregunta.pregunta
    a_text.innerHTML = nivelPregunta.respuestas[0]
    b_text.innerHTML = nivelPregunta.respuestas[1]
    c_text.innerHTML = nivelPregunta.respuestas[2]
    d_text.innerHTML = nivelPregunta.respuestas[3]
  }
  
  function deselAnswer() {
    answerEls.forEach(answerEls => answerEls.checked = false)
  }
  
  // function elegida() {
  //   let respuesta = document.getElementById("a_text")
  //   // answerEls.forEach(answerEls => {
  //   //   if(answerEls.checked) {
  //   //     answer = answerEls.id
  //   //   }
  //   // })
  //   // return answer
  //   console.log("respuesta", respuesta)
  // }
  
  
  submitBtn.addEventListener('click', async () => {
    // const respuesta = elegida()
    const pregunta = await getQ().then(questions  => questions)
    let respuesta = document.getElementById("a_text").innerText
    console.log(respuesta)
    const nivelPregunta = pregunta[nivel]
    if(respuesta == nivelPregunta.respuestas[0]) {
      puntuacion++
    }
    nivel++
    if(nivel < pregunta.length) {
      loadQuiz()
    } else {
      quiz.innerHTML = `
        <h2>You answered ${puntuacion}/${pregunta.length} questions correctly</h2>
        <button onclick="location.reload()">Reload</button>`
    }
  })
  
  
  
  // const rand = (max, min) => Math.floor(Math.random() * (max - min)) + min
  
      
      // const random = () => {
      //   let arrRandom = []
      //   const recursive = () => {
      //     const randomNumber = Math.floor(Math.random() * (4 - 0)) + 0
      //     if (arrRandom.includes(randomNumber) == false){
      //       arrRandom.push(randomNumber)
      //       console.log(randomNumber)
      //     } else {
      //       console.log("pasa por la recursiva")
      //       recursive()
      //     }
      //   }
      //   for (let i = 0; i < 4; i++ ) {
      //     recursive()
      //   } return arrRandom
      // }
  
  
  // fetch('https://opentdb.com/api.php?amount=10')
  //   .then(res=>res.json())
  //   .then(json=>console.log(json))

  