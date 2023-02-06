const checkboxList = document.querySelectorAll('.custom-checkbox')
const inputField = document.querySelectorAll('.goal-input')
const errorLable = document.querySelector('.error-lable')
const progessBar = document.querySelector('.progress-bar')
const goalLevel = document.querySelector('.progress-level')
const progressLable = document.querySelector('.progress-lable')

const allQuotes = [
    "Raise the bar by completing your goals!",
    "Well begun is half done!",
    "Just a step away, keep going!",
    "Whoa! You just completed all the goals, time for chill :D",
]

// const setGoal = JSON.parse(localStorage.getItem('setGoal')) || {
//     firstInput : {
//         name: "",
//         done : false,
//     },
//     secoundInput: {
//         name: "",
//         done : false,
//     },
//     thiredInput: {
//         name: "",
//         done : false,
//     }
// }; 

const setGoal = JSON.parse(localStorage.getItem('setGoal')) || {}


let complateGoalCount = Object.values(setGoal).filter((goal) => goal.done).length;
goalLevel.style.width = `${complateGoalCount / inputField.length *100}%`;
goalLevel.firstElementChild.innerText = `${complateGoalCount}/${inputField.length} Completed`;
progressLable.innerText = allQuotes[complateGoalCount]

checkboxList.forEach((checkBox => {
    checkBox.addEventListener('click', (e)=>{

        const allFieldfilled = [...inputField].every((input)=>{
            return input.value
        })

        if (allFieldfilled){
            checkBox.parentElement.classList.toggle('done') 
            const inputID  = checkBox.nextElementSibling.id
            setGoal[inputID].done = !setGoal[inputID].done
            complateGoalCount = Object.values(setGoal).filter((goal) => goal.done).length;
            goalLevel.style.width = `${complateGoalCount / inputField.length *100}%`;
            goalLevel.firstElementChild.innerText = `${complateGoalCount}/${inputField.length} Completed`;
            progressLable.innerText = allQuotes[complateGoalCount]
            localStorage.setItem('setGoal', JSON.stringify(setGoal))
            console.log(setGoal)
        }else{
            progessBar.classList.add('show-error')
        }
     } )
}))

inputField.forEach((input)=>{
   if(setGoal[input.id]){
    input.value = setGoal[input.id].name

      if(setGoal[input.id].done){
         input.parentElement.classList.add('done') 
      }
   }

       input.addEventListener('focus', ()=>{
          progessBar.classList.remove('show-error')
       })

       input.addEventListener('input', (e)=>{
           if(setGoal[input.id] && setGoal[input.id].done){
              input.value = setGoal[input.id].name
              return
           }


           if(setGoal[input.id]){
              setGoal[input.id].name = input.value
           }else{
            setGoal[input.id] = {
               name : input.value,
               done : false,
            }
           }

        

        localStorage.setItem('setGoal', JSON.stringify(setGoal))
       })

     
})