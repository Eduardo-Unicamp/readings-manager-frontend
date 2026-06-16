import { getTokenCookie } from "../global.js";

const readingsUrl = "https://bookat-readings-manager.onrender.com/readings-manager"
const token = getTokenCookie();
const currentRd = document.getElementById("currentRd");
const pastRd = document.getElementById("pastRd");
const futureRd = document.getElementById("futureRd");

const response = await fetch(readingsUrl,
    {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }
);


let responseObj = await response.json();
console.log(responseObj.readingsList);


//debug
//let content = document.createElement("p");
//content.textContent=JSON.stringify(responseObj);
//document.getElementById("currentRd").appendChild(content);

let readingsList=responseObj.readingsList;
console.log(readingsList);

for(let reading of readingsList){
    console.log(reading);
    switch(true){
        case reading.readingStatus==="READING":
            currentRdCardList(reading);
            break;
        case reading.readingStatus==="TO_READ":
            futureRdCardList(reading);
            break;
        case reading.readingStatus==="READ":
            pastRdCardList(reading);
            break;
    }
}











function currentRdCardList(reading){

        //create html elements
        let card = document.createElement("div");

        let bookName = document.createElement("p");
        let BookAutor = document.createElement("p");
        let startDate = document.createElement("p");
        let currentPage = document.createElement("p");
        let feedback = document.createElement("p");


        //create css classes
        card.classList.add("card");
        //populate elementes
        bookName.textContent = reading.book.name;
        BookAutor.textContent = reading.book.autor;        
        startDate.textContent = reading.readingStartDate;
        currentPage.textContent = reading.currentPage;
        feedback.textContent = reading.feedback;
        //add elements to page
        currentRd.appendChild(card);
        card.append(bookName,BookAutor,startDate,currentPage,feedback);


}
function futureRdCardList(reading){

        //create html elements
        let card = document.createElement("div");

        let bookName = document.createElement("p");
        let BookAutor = document.createElement("p");
        let startDate = document.createElement("p");
        let currentPage = document.createElement("p");
        let feedback = document.createElement("p");


        //create css classes
        card.classList.add("card");
        //populate elementes
        bookName.textContent = reading.book.name;
        BookAutor.textContent = reading.book.autor;        
        startDate.textContent = reading.readingStartDate;
        currentPage.textContent = reading.currentPage;
        feedback.textContent = reading.feedback;
        //add elements to page
        pastRd.appendChild(card);
        card.append(bookName,BookAutor,startDate,currentPage,feedback);


}

function pastRdCardList(reading){

        //create html elements
        let card = document.createElement("div");

        let bookName = document.createElement("p");
        let BookAutor = document.createElement("p");
        let startDate = document.createElement("p");
        let currentPage = document.createElement("p");
        let feedback = document.createElement("p");


        //create css classes
        card.classList.add("card");
        //populate elementes
        bookName.textContent = reading.book.name;
        BookAutor.textContent = reading.book.autor;        
        startDate.textContent = reading.readingStartDate;
        currentPage.textContent = reading.currentPage;
        feedback.textContent = reading.feedback;
        //add elements to page
        futureRd.appendChild(card);
        card.append(bookName,BookAutor,startDate,currentPage,feedback);


}