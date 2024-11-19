mainIdeaElement = document.getElementById("input-MainIdea");
categoryElement = document.getElementById("input-Category");
commentsElement = document.getElementById("input-comments");

addBtn = document.getElementById("btn-addidea");
editBtn = document.getElementById("btn-editidea");

var ideas ;
var editedIndex ;

if(localStorage.getItem("Ideas") != null){
    ideas = JSON.parse(localStorage.getItem("Ideas"));
    displayIdeas();
}
else {
    ideas = [];
}


function addIdea(){
   
    if(mainIdeaElement.value ===""){
        alert("Please enter a title for your idea!")
    }
    else {
        var idea = {
            mainIdea : mainIdeaElement.value,
            category : categoryElement.value,
            comments : commentsElement.value
        }
    
        ideas.push(idea);
    
        localStorage.setItem("Ideas", JSON.stringify(ideas));
        displayIdeas();
    
    }

    clearAllInputs();

}

function displayIdeas(){
    tableBody = document.getElementById("ideas-table-body");
    tableBody.innerHTML = "";
    for (var i = 0 ; i<ideas.length ;i++){
        tableBody.innerHTML += `
        <tr>
                            <th scope="row">${i+1}</th>
                            <td>${ideas[i].mainIdea}</td>
                            <td>${ideas[i].category}</td>
                            <td>${ideas[i].comments}</td>
                            <td>
                                <button onclick="setIdeaForm(${i})" class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button onclick="deleteIdea(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                            </td>
                          </tr>
        `;
    }
   
}

function deleteIdea(index){
    ideas.splice(index, 1);
    localStorage.setItem("Ideas", JSON.stringify(ideas));
    displayIdeas();
}

function setIdeaForm(index){
    editedIndex = index;
    mainIdeaElement.value = ideas[index].mainIdea;
    categoryElement.value = ideas[index].category;
    commentsElement.value = ideas[index].comments;

    addBtn.classList.add("d-none");
    editBtn.classList.remove("d-none");

}

function editIdea(){
    ideas[editedIndex].mainIdea = mainIdeaElement.value;
    ideas[editedIndex].category = categoryElement.value;
    ideas[editedIndex].comments = commentsElement.value;

    editBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");

    clearAllInputs();

    
    localStorage.setItem("Ideas", JSON.stringify(ideas));
    displayIdeas();
}

function clearAllInputs(){
    mainIdeaElement.value = "";
    categoryElement.value = "";
    commentsElement.value = "";
}