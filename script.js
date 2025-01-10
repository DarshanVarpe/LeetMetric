document.addEventListener("DOMContentLoaded",function(){
    const searchButton = document.getElementById("search");
    const usernameInput = document.getElementById("usernameI");
    const statsContainer= document.getElementsByClassName("statsContainer");
    const easyProgressCircle = document.querySelector(".easy");
    const mediumProgressCircle = document.querySelector(".medium");
    const hardProgressCircle = document.querySelector(".hard");
    const easyLabel = document.getElementById("easyLevel");
    const mediumLabel = document.getElementById("mediumLevel");
    const hardLabel = document.getElementById("hardLevel");
    const cardStatsContainer= document.querySelector(".statsCard"); 
  
    //return true or false based on regex
function validateUsername(username){
    if(username.trim()==""){
        alert("Username should not be empty");
        return false;
    }
    const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]{1,14}[a-zA-Z0-9])?$/;
    const isMatching = regex.test(username);
    if(!isMatching){
        alert("invalid username");
    }
    return isMatching;   
}

async function fetchUserdetails(username){
    const url=  `https://leetcode-stats-api.herokuapp.com/${username}`;
    try{
        searchButton.textContent="searching...";
        searchButton.disabled=true;
        // cardStatsContainer.style.setProperty("display","none");
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch user details");
        }
        const data=await response.json();
        console.log("logging data:  ",data);
        displayUserData(data);
    }
    catch(error){
        statsContainer.innerHTML=`<p>No data found</p>`; 
    }
    finally{
        searchButton.textContent="search";
        searchButton.disabled=false;
        // cardStatsContainer.style.setProperty("display","visible");
    }
}
function displayUserData(data){
    const Tq=data.totalQuestions;
    const Tsolvedq=data.totalSolved;
    const Teasyq=data.totalEasy;
    const Tmediumq=data.totalMedium;
    const Thardq=data.totalHard;
    const easyS=data.easySolved;
    const mediumS=data.mediumSolved;
    const hardS=data.hardSolved;

    updateProgress(easyS,Teasyq,easyLabel,easyProgressCircle);
    updateProgress(mediumS,Tmediumq,mediumLabel,mediumProgressCircle);
    updateProgress(hardS,Thardq,hardLabel,hardProgressCircle);

    const cardData = [
        { label: "Overall Submissions", value: Tsolvedq },
        { label: "Overall Easy Submissions", value: Teasyq },
        { label: "Overall Medium Submissions", value: Tmediumq },
        { label: "Overall Hard Submissions", value: Thardq }
    ];
    console.log("card ka data :",cardData);

    cardStatsContainer.innerHTML = cardData.map(
        data => 
                `<div class="card">
                <h4>${data.label} :</h4>
                <p>${data.value}</p>
                </div>`
    ).join("");
    
}
function updateProgress(solved,total,easyLabel,circle){
     const progressDegree=(solved/total)*100;
     circle.style.setProperty("--progress-degree",`${progressDegree}%`);
     easyLabel.textContent=`${solved}/${total}`;
}

    searchButton.addEventListener('click',function(){
        const username = usernameInput.value;
        console.log("login value is : " + username);
        if(validateUsername(username)){
            fetchUserdetails(username);
        }
    })
})    