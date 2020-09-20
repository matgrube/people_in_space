function moduleMaker(type:string, moduleClass:string, id:string) {
    const result = document.createElement(type);
    result.classList.add(moduleClass);
    if (id) result.id = id;
    return result;
}

async function getData () {
    let data: object = fetch("http://api.open-notify.org/astros.json")
        .then(response => response.json())
        .then(data => {return data});
    return data;
};

(async function app() {
    let fetchedData = await getData();
    console.log(fetchedData);
    console.log(fetchedData.number);
    let h3 = moduleMaker('h3', 'how_many', 'how_many');
    h3.innerText = `Number of people in space right now: ${fetchedData.number.toString()}`;
    let app = document.getElementById('app');
    app.appendChild(h3);
}())



// (async function app() {
//     let fetchedData: object = await (async () => {
//         let data: object = fetch("http://api.open-notify.org/astros.json")
//         .then(response => response.json())
//         .then(data => {return data})
//         let info = await data;
//         return info;
//     })();

//     function moduleMaker(type:string, moduleClass:string, id:string) {
//         const result = document.createElement(type);
//         result.classList.add(moduleClass);
//         if (id) result.id = id;
//         return result;
//     }

//     const numOfPeople = moduleMaker("h3", "num_of_people", "people");
//     numOfPeople.innerText = await fetchedData.number.toString();
//     const app = document.getElementById('app');
//     app.appendChild(numOfPeople);
    
    
//     console.log(fetchedData);
// }()); 
