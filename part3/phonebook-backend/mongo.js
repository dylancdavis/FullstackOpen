const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('insufficient number of arguments, exiting');
    process.exit(1)
}

const password = process.argv[2]
const url=`mongodb+srv://dylcdav:${password}@phonebook.hjrjhsm.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 5) {
    Person.find({}).then(r => {
        console.log("Phonebook:");
        r.forEach(r => {
            console.log(`- ${r.name} (${r.number})`)
        })
        mongoose.connection.close();
    })

} else {
    const nameToAdd = process.argv[3]
    const numberToAdd = process.argv[4]
    
    const p = new Person ({
        name: nameToAdd,
        number: numberToAdd
    })
    
    p.save().then(r => {
        console.log(`${nameToAdd} (${numberToAdd}) addded to phonebook`)
        mongoose.connection.close();
    })
}

