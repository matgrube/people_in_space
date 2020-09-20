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
    let fetchedData: object = await getData();
    console.log(fetchedData);
    let { people, number } = fetchedData;
    console.log(people);
    let h3 = moduleMaker('h3', 'how_many', 'how_many');
    h3.innerText = `Number of people in space right now: ${fetchedData.number.toString()}`;
    let app = document.getElementById('app');
    app.appendChild(h3);

    let listOfPeople = moduleMaker('ul', 'list_space');
    app.appendChild(listOfPeople);

    people.forEach((e:object, index:number) => {
        console.log(e, index);
        let person = moduleMaker('li', `item_${index}`);
        person.innerText = e.name;
        listOfPeople.appendChild(person);
    })
}())
