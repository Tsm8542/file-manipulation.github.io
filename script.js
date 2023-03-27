let Storage_count;
if(localStorage.getItem("storage_count")==undefined){
    localStorage.setItem("storage_count",0);
    Storage_count = localStorage.getItem("storage_count");
}
else{
    Storage_count = localStorage.getItem("storage_count");
}

function project_loader(){
    for(let i=1;i<=50;i++){
        let key = localStorage.getItem("titleProject"+i);
        let id = "Project"+i;
        if(key==undefined){
            continue;
        }
        else{
            let temp = '<div class="'+id+'"><span id="'+id+'">'+key+'</span><span class="'+id+'frbtn" style="float:right;"><button id="'+id+'etbtn" onclick="edit_title(\''+id+'\')"><i class="fa fa-edit"> Title</i></button><button id="'+id+'ebtn" onclick="edit(\''+id+'\',\''+key+'\')"><i class="fa fa-edit"> Project</i></button><button style="background-color:red;border:2px solid red;" id="'+id+'dbtn" onclick="delete_project(\''+id+'\')"><i class="fa fa-trash"> Delete</i></button></span></div>';
            document.querySelector(".project-container").innerHTML+=temp;
        }
    }
}

function create_project(){
    if(localStorage.getItem("storage_count")==50){
        alert("You have created a maximum number of 50 projects.\nPlease delete previous project(s) to free up some space to work on a new project.\nSorry for the inconvenience.");
    }
    else{
        let id = "Project"+(parseInt(Storage_count)+1);
        for(let i=1;i<=Storage_count;i++){
            if(localStorage.getItem('titleProject'+i)==undefined){
                id = "Project"+i;
            }
        }
        let temp = '<div class="'+id+'"><span id="'+id+'">'+id+'</span><span class="'+id+'frbtn" style="float:right;"><button id="'+id+'etbtn" onclick="edit_title(\''+id+'\')"><i class="fa fa-edit"> Title</i></button><button id="'+id+'ebtn" onclick="edit(\''+id+'\',\''+id+'\')"><i class="fa fa-edit"> Project</i></button><button style="background-color:red;border:2px solid red;" id="'+id+'dbtn" onclick="delete_project(\''+id+'\')"><i class="fa fa-trash"> Delete</i></button></span></div>';
        document.querySelector(".project-container").innerHTML+=temp;
        Storage_count++;
        localStorage.setItem("storage_count",Storage_count);
        localStorage.setItem('title'+id,id);
        localStorage.setItem('text'+id,"");
    }
}

function edit(id,key){
    document.querySelector("#proj").style.display="block";
    document.querySelector("#main").style.display="none";
    let temp = '<button id="backbtn" onclick="back_home()"><i class="fa fa-arrow-left"></i> Back</button><div class="h"><span id="'+id+'">'+key+'</span></div><div class="file-container"><input type="file" id="load" onchange="l(\''+id+'\')"><textarea id="tt" cols="30" rows="10" oninput="x(\''+id+'\')"></textarea><div class="controls"><div class="n"><button onclick="s(\''+key+'\')" style="margin-right:5px;">Generate (.txt)</button><button onclick="p()">Generate (.pdf)</button></div></div></div><div id="pt"></div>';
    document.querySelector("#proj").innerHTML = temp;
    let temptext = localStorage.getItem('text'+id);
    document.querySelector("#tt").innerHTML = temptext;
    document.querySelector("#pt").innerText = document.getElementById("tt").value;
}

function delete_project(id){
    let confirmation = confirm("Please confirm to delete the project");
    if(confirmation == true){
        let oldclass = '.'+id;
        document.querySelector(oldclass).remove();
        localStorage.removeItem('title'+id);
        localStorage.removeItem('text'+id);
        Storage_count--;
        localStorage.setItem("storage_count",Storage_count);
    }
}

function edit_title(id){
    let new_title = prompt("Enter the title of your project");
    if(new_title!=id && (new_title!=null && new_title!=undefined)){
        let m = '<button id="'+id+'etbtn" onclick="edit_title(\''+id+'\')"><i class="fa fa-edit"> Title</i></button><button id="'+id+'ebtn" onclick="edit(\''+id+'\',\''+new_title+'\')"><i class="fa fa-edit"> Project</i></button><button style="background-color:red;border:2px solid red;" id="'+id+'dbtn" onclick="delete_project(\''+id+'\')"><i class="fa fa-trash"> Delete</i></button>';
        document.querySelector("."+id+"frbtn").innerHTML = m;
        document.querySelector('#'+id).innerHTML=new_title;
        localStorage.setItem('title'+id,new_title);
    }
}

function s(title){
    var x = document.getElementById("tt").value;
    var file = new Blob([x],{type:"text"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = title+".txt";
    a.click()
}

function l(id){
    var file = document.getElementById("load").files[0];
    var load;
    var reader = new FileReader();
    reader.onloadend = function(){
        load = (reader.result);
        document.getElementById("tt").value = load;
        document.querySelector("#pt").innerText = load;
        localStorage.setItem('text'+id,load);
    }
    reader.readAsText(file);

}

function p(){
    window.print();
}

function x(id){
    let n = document.querySelector("#pt");
    n.innerText = document.getElementById("tt").value;
    let content = document.querySelector("#tt").value;
    localStorage.setItem('text'+id,content);
}

function back_home(){
    document.querySelector("#proj").style.display="none";
    document.querySelector("#main").style.display="block";
}

/*
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "";
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
});*/