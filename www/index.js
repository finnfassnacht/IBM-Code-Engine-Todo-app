
function clearer(ID) {
    let todo = document.getElementById(ID).innerText
    async function sender(){
        const response = await fetch("/api/removeitem/" + todo)
        // get data from the server
        const data = await response.json()
        console.log(data)
    }
    sender()
    document.getElementById(ID).remove()
    console.log("(Server) delete " + ID + " from DB")
}

function add(){
    let todo = document.getElementById("todo").value;
    async function sender(){
        const response = await fetch("/api/newitem/" + todo)
        // get data from the server
        const data = await response.json()
        console.log(data)
    }
    sender()
    main()
}
function builder(data) {
    for (x = 0; x < data.length; x++){
        let todo = data[x]["todo"]
    
        let wrapper = document.createElement("div")
        wrapper.className = "col-md-8"
        wrapper.id = "wrapper"
        
        let item = document.createElement("div")
        item.className = "item"
        item.id = "ID" + String(x)
        wrapper.appendChild(item)
    
        let button = document.createElement("button")
        button.id="done"
        button.className="btn"
        button.setAttribute("onclick","clearer('ID" + String(x)+ "')")
        item.appendChild(button)
    
        let content = document.createElement("h3")
        content.innerText = todo
        item.appendChild(content)
    
        document.getElementById("contenthere").appendChild(wrapper)
    }
}

async function main(){
    document.getElementById("contenthere").remove()
    let contethere = document.createElement("div")
    contethere.id = "contenthere"
    contethere.className = "row justify-content-center"
    document.getElementById("main_wrapper").appendChild(contethere)
    const response = await fetch("/api/items")
    const data = await response.json()
    console.log(data.items)
    builder(data.items)
}
main()