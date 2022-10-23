
import { JSON_FILE_PATH } from './constants.js';

let jsonData = new Object();

let applicationIndex = 0;

let candidates = 0;

let currentApplication = null;

let jsonDataLoaded = false;

// let hobbies = null initially ;

const resumeLandingPage = () => {

    document.getElementById('body').innerHTML = 
        `
            <div id = "resume-page">
                <table style="width:80%">
                    <tr>
                        <td style="width:20%">
                            <button type="button" id="resumePreviousBtn" class="login-btn btn" onclick="previousResume()" >Previous</button>
                        </td>

                        <td style="width:60%">
                            <input type="search" id="resumeFilterField" class="input-field-resume" placeholder="search for keywords to filter the result">
                        </td>

                        <td style="width:20%">
                        <button type="button"id="resumeNextBtn" type="submit" class="login-btn btn">Next</button>
                        </td>
                    </tr>
                </table>

                <table id="resumeHeading" style="width:80%">
                    <tr >
                        <td id="resume-title" style="width:80%"> </td>
                        <td id="resume-image" style="width:20%"> </td>
                    </tr>
                </table>

                <table id="resumePersonalWork" style="width:80%">
                    <tr>
                        <td style="width:25%; vertical-align: top;">
                            <div id="resume-basic"> <div>
                        </td>
                        <td  style="width:75%; vertical-align: top;">
                            <div id="resume-work"> <div>
                        </td>
                    </tr>
                </table>
                
            </div>
            
        `;
    
    readJSONFile();
    
    // Previous Button here
   
    document.getElementById('resumePreviousBtn').onclick = function () {
        if ( applicationIndex === 0 ){
            applicationIndex = candidates - 1;
        }
        else {
            applicationIndex--;
        }
        console.log(jsonData.resume[applicationIndex]);
        currentApplication = jsonData.resume[applicationIndex];
        buildResume();
    };

    // Search Field here

    document.getElementById('resumeFilterField').onchange = function (e){
        const filterValue = e.target.value;

            for(let i = 0; i < jsonData.resume.length; i++ ){
                if(jsonData.resume[i].basics.name === filterValue ){
                    currentApplication = jsonData.resume[i];
                    buildResume();
                }
                else {
                    noResultFound(filterValue);
                }
            }
            applicationIndex++;
            e.target.value = "";
    }

    // Next Button here

    document.getElementById('resumeNextBtn').onclick = function (){
        if ( applicationIndex === (candidates - 1) ){
            applicationIndex = 0;
        }
        else {
            applicationIndex++;
        }
        console.log(jsonData.resume[applicationIndex]);
        currentApplication = jsonData.resume[applicationIndex];
        buildResume();
    };

}

const readJSONFile = () => {

    fetch( JSON_FILE_PATH )
            .then( response => {
                return response.json();
            })
            .then(jData => {
                jsonData = jData;
                candidates = jsonData.resume.length;
                jsonDataLoaded = true;
                console.log("inside ResumePage", jsonData);
            })
            .catch( (error) => console.log(error.message) );
};

const noResultFound = (applicant) => {
    document.getElementById('resume-title').innerHTML = "";
    document.getElementById('resume-image').innerHTML = "";
    document.getElementById('resume-basic').innerHTML = "";
    document.getElementById('resume-work').innerHTML = `Applicant "${applicant}" not found.`;
}

const initalResume = () => {

    applicationIndex = 0;
   
    buildResume();

}

const buildResume = () => {

    document.getElementById('resume-title').innerHTML = `
    <h1>${currentApplication.basics.name}</h1>
    <br />
    <h3>Applied For ${currentApplication.basics.AppliedFor} </h3>
    `;

    document.getElementById('resume-image').innerHTML = `
    <img src="../img/person-logo.png" width=100px height=100px>
    `;


    document.getElementById('resume-basic').innerHTML = `  
        <div class="basic-title">Personal Information</div>
        <div class="basic-info">
            ${currentApplication.basics.phone}<br>
            ${currentApplication.basics.email}<br>
            <a href=${currentApplication.basics.profiles.url}> 
                ${currentApplication.basics.profiles.network}
            </a> <br>
            ${currentApplication.basics.location.address}<br>
            Pincode ${currentApplication.basics.location.postalCode}<br>
            ${currentApplication.basics.location.city}<br>
            ${currentApplication.basics.location.state}<br>
        </div>
        <br>

        <div class="basic-title">Technical Skills</div>
        <div class="basic-info">
            <span id="technical-skills"> </span>
        </div>
        <br>

        <div class="basic-title">Hobbies</div>
        <div class="basic-info">
            <span id="hobbies"> </span>
        </div>
        <br>
    `;

    document.getElementById('resume-work').innerHTML = `

            <div class="work-title">Work Experience in previous company</div>
            <div class="work-info">
        
                <span class="work-subtitle">Company Name : </span>${currentApplication.work["Company Name"]}<br>
                <span class="work-subtitle">Position : </span>${currentApplication.work.Position}<br>
                <span class="work-subtitle">Start Date : </span>${currentApplication.work["Start Date"]}<br>
                <span class="work-subtitle">End Date : </span>${currentApplication.work["End Date"]}<br>
                <span class="work-subtitle">Summary : </span>${currentApplication.work.Summary}<br>
            
            </div>

            <div class="work-title">Projects</div>
            <div class="work-info">
                <span class="work-subtitle">${currentApplication.projects.name}</span> : ${currentApplication.projects.description}<br>
            </div>

            <div class="work-title">Education</div>
            <div class="work-info">
                <ul>
                    <li> 
                        <span class="work-subtitle">UG : </span> 
                        ${currentApplication.education.UG.institute},
                        ${currentApplication.education.UG.course}, 
                        ${currentApplication.education.UG["Start Date"]} -
                        ${currentApplication.education.UG["End Date"]}, 
                        ${currentApplication.education.UG.cgpa} CGPA
                    </li>

                    <li>
                        <span class="work-subtitle">Senior Secondary : </span>
                        ${currentApplication.education["Senior Secondary"].institute}, 
                        ${currentApplication.education["Senior Secondary"].cgpa} CGPA
                    </li>
                    
                    <li>
                        <span class="work-subtitle">High School : </span>
                        ${currentApplication.education["High School"].institute}, 
                        ${currentApplication.education["High School"].cgpa} CGPA
                    </li>

                </ul>
                
                <br>
            </div>

            <div class="work-title">Internship</div>
            <div class="work-info">
                <ul>
                    <li><span class="work-subtitle">Company Name : </span>${currentApplication.Internship["Company Name"]}</li> 
                    <li><span class="work-subtitle">Position : </span>${currentApplication.Internship.Position}</li> 
                    <li><span class="work-subtitle">Start Date : </span>${currentApplication.Internship["Start Date"]}</li> 
                    <li><span class="work-subtitle">End Date : </span>${currentApplication.Internship["End Date"]}</li> 
                    <li><span class="work-subtitle">Summary : </span>${currentApplication.Internship.Summary}</li>
            </div>

            <div class="work-title">Achievements</div>
            <div class="work-info">
                <ul>
                    <div id="achievements"> </div>
                </ul>
            </div>

    `; 

    
    const displayTechnicalSkills = () => {
        
        let techElement = "";

        let techSkills = currentApplication.skills.keywords;
        
        let techSkillsCount = currentApplication.skills.keywords.length
        
        for(let i = 0; i < techSkillsCount; i++){
            techElement = techElement + `${techSkills[i]}<br>`;
        }
        
        document.getElementById("technical-skills").innerHTML = techElement;
    }
    
    displayTechnicalSkills();

    const displayHobbies = () => {
        
        let hobbiesElement = "";
    
        let hobbies = currentApplication.interests.hobbies;
    
        let hobbiesCount = currentApplication.interests.hobbies.length
    
        for(let i = 0; i < hobbiesCount; i++){
            hobbiesElement = hobbiesElement + `${hobbies[i]}<br>`;
        }
        document.getElementById("hobbies").innerHTML = hobbiesElement;
    }
    displayHobbies();

    const achievements = () => {
        
        let achievementsElement = "";
    
        let achievements = currentApplication.achievements.Summary;
    
        let achievementsCount = currentApplication.achievements.Summary.length
        for(let i = 0; i < achievementsCount; i++){
            achievementsElement = achievementsElement + `<li>${achievements[i]}</li>`;
        }
    
        document.getElementById("achievements").innerHTML = achievementsElement;
    }
    
    achievements();
}

export { resumeLandingPage };