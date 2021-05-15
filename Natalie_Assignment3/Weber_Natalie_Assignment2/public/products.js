/*Kaka'ako Surf Co. Products Array*/
//Product Type 1
var surfboards = [
    {
    "name": "Minami Surfboards - The Blaze",
    "price": 545.00,
    "description": "The Blaze is the perfect name for this model because it blazes! The main focus when creating this board was to create a high performance shortboard with lots of speed. The Blaze has altered bottom curves concaves.  As it turns out, this board goes very fast!  It’s also very lively, loose, responsive and enables deep carving turns.",
    "image": "./images/blaze.jpg",
    },
    {
    "name": "Pyzel Surfboards - Ghost",
    "price": 650.00,
    "description": "The Ghost has been developed over a number of years to give you a board that performs in bigger, better waves. With full volume through the front section combined with a lower rocker, the Ghost can really fly while the round tail and double concave in the lower half help keep you in control.",
    "image": "./images/ghost.jpg"
    },
    {
    "name": "Lost Surfboards - The Driver 2.0",
    "price": 745.00,
    "description": "The DRIVER 2.0 is the continuing evolution of our most proven and popular Pro-formance Shortboard. Designed through direct feedback and ongoing refinement with rigorous testing, the DRIVER 2.0 is a direct reflection of pinnacle performance surfing demands.",
    "image": "./images/driver.png"
    },
    {
    "name": "Firewire Surfboards - No Brainer",
    "price": 785.00,
    "description": "The No Brainer was created to work well in small, soft surf conditions. With just enough grovel characteristics to make it paddle well and go fast in small surf, and the high-performance feel; this board is a great tool for progressing your surfing in small surf.",
    "image": "./images/nobrainer.jpg"
    },
    {
    "name": "Lost Surfboards - The Rad Ripper",
    "price": 795.00,
    "description": "The Rad Ripper is the latest within Lost Surfboard’s “Post Modern Retro” collection. The entry rocker has been relaxed to allow for faster paddling and earlier entry into the wave. The tail has been switched to provide glide and lift over mushy waves and easily connects sections. Performance is not lost with a hefty tail rocker and aggressive double concave which gives the board a responsive lively-ness to it.",
    "image": "./images/radripper.jpg"
    }
]

//Product Type 2
var deckpads = [
    {
        "name": "Creatures of Leisure - Colapinto Performance Traction",
        "price": 46.00,
        "description": "Griffin Colapinto's Signature 3-Piece Pad is designed for extreme traction with a modern tech look.",
        "image": "./images/colapinto.jpg"
        },
    {
        "name": "Creatures of Leisure - Reliance III Traction",
        "price": 44.00,
        "description": "The RELIANCE CORD offers the best no traction feel. The thin yet grippy cord pattern and mega cut-outs for reduced weight and ultimate response.",
        "image": "./images/freelance.jpg"
    },
    {
        "name": "Dakine - Zeke Lau Pro Surf Traction",
        "price": 42.00,
        "description": "Designed to match Ezekiel Lau's style, this surf traction pad speaks to his Hawaiian heritage. The three-piece pad is fine-tuned with a 7mm center arch and a 25mm vert wedge tail kick for solid control.",
        "image": "./images/lau.jpg"
    },
    {
        "name": "Dakine - Carissa Moore Pro Surf Traction",
        "price": 42.00,
        "description": "Inspired by pro surfer Carissa Moore's island roots and competition-winning style, this three-piece traction pad sets you up to carve like Carissa..",
        "image": "./images/moore.jpg"
    }
]

//Product Type 3
var leashes = [
    {
        "name": "Creatures of Leisure - Surflite Lite 6",
        "price": 40.00,
        "description": "The Creatures of Leisure SURFLITE Lite 6 leash is the lightest, most comfortable leash in the world specifically developed with custom materials for a ‘no leash feel’. Ideal for fast and small wave surfing.",
        "image": "./images/surflite.jpg"
    },
    {
        "name": "Creatures of Leisure - Reliance Comp 6",
        "price": 34.00,
        "description": "Lightweight Leash for small to medium-sized waves. A new generation of reliability in a 6mm cord and 6ft long Comp Leash, perfect for a broad range of conditions and ideal for day-to-day use.",
        "image": "./images/comp.jpg"
    },
    {
        "name": "Dakine - Florence Comp 6' x 3/16'",
        "price": 27.00,
        "description": "Designed for head-high surf, it features the highest quality 3/16-inch (5mm) urethane Dura-Cord with molded ends to keep you connected to your board in the strongest surf.",
        "image": "./images/florence.jpg"
    },  
    {
        "name": "Dakine - Kainui Team 6' x 1/4'",
        "price": 27.00,
        "description": "Serious swell calls for a serious leash. The Kainui surf leash offers trusted security in double to triple overhead peaks.",
        "image": "./images/kainui.jpg"
    },    

]

//Product Type 4
var wax = [
    {
        "name": "Sticky Bumps - Basecoat 6 Pack",
        "price": 13.50,
        "description": "",
        "image": "./images/basecoat.jpg"
    },  
    {
        "name": "Sticky Bumps - Tour Series 6 Pack",
        "price": 13.50,
        "description": "",
        "image": "./images/tour.jpg"
    },        
    {
        "name": "Sticky Bumps - Warm/Tropical 6 Pack",
        "price": 13.50,
        "description": "",
        "image": "./images/tropical.jpg"
    },              

]

var allProducts = {
    "Surfboards": surfboards,
    "Deckpads": deckpads,
    "Leashes": leashes,
    "Wax": wax
}

if (typeof module != "undefined") {
    module.exports.allProducts = allProducts;
}