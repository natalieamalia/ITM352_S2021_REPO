age: 20;
name: Natalie;
attributes = name + ";" + (age + 0.5) + ";" + (0.5 - age)
parts = attributes.split(';');
for(part of parts) {
    console.log(`${part} is a ${typeof part}`)
}
