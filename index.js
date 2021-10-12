let addbtn = document.getElementById('addBtn');

addbtn.addEventListener('click', () => {
    let txt = document.getElementById('addTxt')
    // console.log(txt.innerText) txt ek text  area hai to uske andar ke contnet ko acess ke liye not write text ,write value
    console.log(txt.value)
    let data = localStorage.getItem('notes')
    if (data == null) {
        dataobj = [];
    } else {
        dataobj = JSON.parse(data)
    }
    dataobj.push(txt.value);
    localStorage.setItem('notes', JSON.stringify(dataobj))
    console.log(dataobj)
    console.log("clk")
    txt.value = null;
})

addbtn.addEventListener('click', () => {
    console.log("clk2")
    let data = localStorage.getItem('notes');
    let created = document.getElementById("notes")
    let html = "";
    //html agar yaha par define nahi karoge to error show karega kyunki fir wo bas ek block element ban kar rah jayega for each wale function ka 
    if (data == null) {
        var reply = document.createElement("h4")
        var war = document.createTextNode("no notes");
        reply.appendChild(war)
        created.appendChild(reply)

    } else {
        /*
                let newct=Array.from(data).forEach((element,index)=>{
                    html += `
                    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Note ${index + 1}</h5>
                                <p class="card-text"> ${element}</p>
                                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                            </div>
                        </div>`;
                })
                // created.appendChild(newct)--> newct koi child node (element,ya create text node se bana hua nahi hai )nahi hai 
                created.innerHTML=html;
                */
        // upar wale se problem ye hogi ki wo jo data hai wo string hai to wo usko har jagah se tod kar return karega loke ki Mohit enter kiya to we M,o,h,i,t ke liye sab ke liye alag alag card banayega

        let newct = JSON.parse(data).forEach((element, index) => {
            html += `
                    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Note ${index + 1}</h5>
                                <p class="card-text"> ${element}</p>
                                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                            </div>
                        </div>`;
        })
        created.innerHTML = html;
    }

})

//ye del wala work kyun nahi kar raha hai ?????
const deleteNote = (id) => {
    let data = localStorage.getItem('notes');
    let created = document.getElementById("notes")
    let html = "";
    JSON.parse(data).forEach((element, index) => {
        if (index !== id) {
            html = `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
            //    localStorage.removeItem() 
        } else {
            // element=null;
            JSON.parse(data).delete(id)

        }
        created.innerHTML = html;
    })
}


let search = document.getElementById('searchTxt');
search.addEventListener('input', (e) => {

    // console.log(e)
    // console.log(e.data)

    // console.log(e.value)  --> throws error
    console.log(search.value)
    let desired = search.value;
    let data = localStorage.getItem('notes');
    let created = document.getElementById("notes")
    let mdata = JSON.parse(data);
    console.log(mdata)
    let html;
    mdata.forEach((element, index) => {
        if (element.includes(desired)) {
            // return element;
            console.log(element)
            html = `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text"> ${element}</p>
                    <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
        } else {
            element = null;
        }
        created.innerHTML = html;
    }
    )
})
//search wale mein bhi bugs hai kuch 