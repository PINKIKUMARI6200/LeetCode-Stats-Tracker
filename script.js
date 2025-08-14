document.addEventListener("DOMContentLoaded",function(){
    const searchButton=document.getElementById("search-btn");
    const usernameInput=document.getElementById("user-input");
    const statscontainer=document.querySelector(".stats-container");
    const easyProgresscircle = document.getElementById("easy-progress");
    const mediumProgresscircle = document.getElementById("medium-progress");
    const hardProgresscircle = document.getElementById("hard-progress");

    const easyLabel=document.getElementById("easy-label");
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");
    const cardStatsContainer=document.querySelector(".stats-card");
    
    //retrun true or false based on ragex
    function validateUsername(username){
        if(username.trim()===""){
            alert("username should not be empty");
            return false;
        }
        const regex=/^[A-Za-z][A-Za-z0-9_]{2,15}$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("invalid username");
        }
        return isMatching;
    }
    
    async function fetchuserdetails(username){
     const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
     try{

        searchButton.textContent="Searching...";
        searchButton.disabled=true;

        const response=await fetch(url);
        if(!response.ok){
            throw new Error("unable to fetch user details");
        }
        const parseddata=await response.json();
        console.log("login data:",parseddata);

        displayuserdata(parseddata);
     }
     catch(error){
        statscontainer.innerHTML='<p>No data found</p>'
     }
     finally{
        searchButton.textContent="Search";
        searchButton.disabled=false;
     }
    }
    
   function updateProgress(solved, total, label, circle) {
    const progressdegree = (solved / total) * 360;
    circle.style.setProperty("--progress-degree", `${progressdegree}deg`);
    label.textContent = `${solved}/${total}`; // Show "solved/total"
}






   function displayuserdata(parseddata) {
  const totalQues = parseddata.totalQuestions;
  const totaleasyQues = parseddata.totalEasy;
  const totalMediumQues = parseddata.totalMedium;
  const totalHardQues = parseddata.totalHard;

  const solvedtotalQues = parseddata.totalSolved;
  const solvedtotalEasyQues = parseddata.easySolved;
  const solvedtotalMediumQues = parseddata.mediumSolved;
  const solvedtotalHardQues = parseddata.hardSolved;

  updateProgress(solvedtotalEasyQues, totaleasyQues, easyLabel, easyProgresscircle);
  updateProgress(solvedtotalMediumQues, totalMediumQues, mediumLabel, mediumProgresscircle);
  updateProgress(solvedtotalHardQues, totalHardQues, hardLabel, hardProgresscircle);


   // Populate submissions
    document.getElementById("total-submissions").textContent =
    `Total Solved: ${parseddata.totalSolved}`;
document.getElementById("easy-submissions").textContent =
    `Easy Solved: ${parseddata.easySolved}`;
document.getElementById("medium-submissions").textContent =
    `Medium Solved: ${parseddata.mediumSolved}`;
document.getElementById("hard-submissions").textContent =
    `Hard Solved: ${parseddata.hardSolved}`;
}

    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        console.log("login username:",username);
        if(validateUsername(username)){
           fetchuserdetails(username);
        }
    })

})