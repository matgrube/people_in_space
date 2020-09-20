// import config = require('./config');

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

async function getPhoto (key) {
    let data: object = fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
        .then(response => response.json())
        .then(data => {return data});
    return data;
}

(async function app() {
    let fetchedData: object = await getData();
    let { people, number } = fetchedData;

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

    let header = moduleMaker('h3', 'photo_desc');
    header.innerText = 'NASA Photo of the Day:';
    app.appendChild(header);

    // let key:string = config ? config.NASA_KEY : "DEMO_KEY";
    let key:string = "DEMO_KEY";
    let photoData: object = await getPhoto(key);
    let { url, explanation } = photoData;

    const photo = moduleMaker('img', 'space_photo');
    photo.setAttribute('src', url);
    app.appendChild(photo);

    const desc = moduleMaker('p', 'photo_description');
    desc.innerText = explanation;
    app.appendChild(desc);
}())
