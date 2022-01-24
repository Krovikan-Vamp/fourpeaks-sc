const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccount.json')
const prompt = require('prompt-sync')();
var SchemaObject = require('schema-object');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()

var Anesthesiologist = {
    name: String
}
var Service = {
    collection: 'services',
    full_name: String,
    short_name: String,
    description: String
}
var Page = {
    main_title: String,
    parent_path: String,
    related_links: Array,
    main_body: String
}
var Surgeon = {
    surgeon: {
        description: String,
        long_description: String,
        name: String
    }
}
var Employee = {
    collection: `staff`,
    name: String,
    position: String
}
var Testimonial = {
    collection: `Testimonials`,
    comments: String,
    date: String
}
// const choice = prompt(`Choose what to add to: `);

// if (choice == `Anesthesia`) {
//     Anesthesiologist.collection = 'Anesthesia';
//     Anesthesia()
// } else if (choice == '0') {
//     Service.collection = 'services'
//     Services()
// } else if (choice == '1') {
//     Page.collection = 'pages';
//     Pages()
// } else if (choice == '2') {
//     Surgeon.collection = `Surgeons`
//     Surgeons()
// } else if (choice == '3') {
//     Employee.collection = `staff`
//     Staff()
// }

function Anesthesia() {
    // Prompt for info
    const name = prompt(`Anesthesiologist name: `)

    // Put info into the object
    Anesthesiologist.name = name;

    // Send to the db function
    putInDB(Anesthesiologist)
}

function Services() {
    // Prompt for info
    const fn = prompt(`Service full name: `)
    const sn = prompt(`Service short name: `)
    const desc = prompt(`Service description: `)

    // Put info into the obect
    Service.full_name = fn;
    Service.short_name = sn;
    Service.description = desc;

    // Send to the db function
    putInDB(Service)
}

function Surgeons() {
    // Prompt for info
    const fn = prompt(`Surgeon full name: `)
    const desc = prompt(`Input description: `)
    const long_desc = prompt(`Input the auua page: `)

    // Put info into the obect
    Surgeon.surgeon.name = fn;
    Surgeon.surgeon.description = desc;
    Surgeon.surgeon.long_description = long_desc;

    // Send to the db function
    putInDB(Surgeon)
}
function Pages() {
    // Prompt for info

    // Put info into the obect

    // Send to the db function
}

function Staff() {
    // Prompt for info
    const name = prompt(`Employees name: `)
    const pos = prompt(`${name}'s position: `)

    // Put info into the obect
    Employee.name = name;
    Employee.position = pos;

    // Send to the db function
    putInDB(Employee)
}
function Review() {
    // prompt(`Please input the surgeon name: `);
    let ogDate = prompt(`Procedure date (month, year): `)
    Testimonial.date = ogDate.substring(ogDate.length - 2, ogDate.length).concat(ogDate)
    Testimonial.comments = prompt(`Please input any patient comments: `);

    // console.log(Testimonial)
    putInDB(Testimonial)
}
// while (true) {
    Review()
// }
// Services()
async function putInDB(info) {
    console.log(`Adding ${JSON.stringify(info)}`)
    await db.collection(info.collection).doc().set(info)
    // console.log(`Added ${info.full_name} to ${info.collection}`)
}
