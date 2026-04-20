const fs = require('fs');
const path = require('path');
const html = fs.readFileSync('index.html', 'utf8');

const SERVICES = [
    "Residential Painting", "Commercial Painting", "Interior Painting", "Exterior Painting", 
    "Cabinet Refinishing", "Epoxy Flooring", "Pressure Washing", "Drywall Repair", 
    "House Painting", "Office Painting", "Stucco Painting", "Deck Staining", 
    "Fence Painting", "Popcorn Ceiling Removal", "Wallpaper Removal", "Concrete Coatings", 
    "Garage Floor Epoxy", "Wood Trim Painting", "Roof Cleaning", "Driveway Pressure Washing", 
    "Multi-Family Painting", "Industrial Painting", "HOA Painting", "Apartment Painting", 
    "Metal Roof Painting", "Siding Painting", "Brick Painting", "Limewash Painting", 
    "Color Consultation", "Trim Painting", "Power Washing", "Epoxy Garage Coatings", 
    "Basement Painting", "Retail Store Painting", "Warehouse Painting"
];

const LOCATIONS = [
    "Lawrenceville", "Suwanee", "Duluth", "Snellville", "Buford", "Lilburn", "Norcross", "Dacula", "Grayson", "Sugar Hill", "Peachtree Corners", "Berkeley Lake",
    "Atlanta", "Alpharetta", "Roswell", "Johns Creek", "Sandy Springs", "Milton", "East Point", "Union City", "Fairburn", "College Park", "Palmetto", "Chattahoochee Hills", "Mountain Park",
    "Decatur", "Dunwoody", "Brookhaven", "Chamblee", "Tucker", "Stone Mountain", "Doraville", "Clarkston", "Lithonia", "Pine Lake", "Avondale Estates", "Stonecrest",
    "Marietta", "Smyrna", "Kennesaw", "Acworth", "Austell", "Powder Springs", "Mableton", "Vinings",
    "Cumming", "Canton", "Woodstock", "Holly Springs", "Ball Ground", "Waleska",
    "Gainesville", "Flowery Branch", "Oakwood", "Braselton", "Clermont", "Lula",
    "Dallas", "Hiram", "Douglasville", "Lithia Springs",
    "Peachtree City", "Fayetteville", "Tyrone", "Brooks",
    "Newnan", "Senoia", "Sharpsburg", "Grantville",
    "McDonough", "Stockbridge", "Hampton", "Locust Grove",
    "Jonesboro", "Riverdale", "Morrow", "Forest Park", "Lovejoy",
    "Conyers", "Covington", "Oxford", "Porterdale",
    "Loganville", "Monroe", "Social Circle", "Walnut Grove", "Good Hope",
    "Winder", "Auburn", "Bethlehem", "Statham",
    "Jefferson", "Hoschton", "Commerce", "Arcade",
    "Watkinsville", "Bogart", "Athens", "Winterville",
    "Carrollton", "Villa Rica", "Temple", "Bremen",
    "Cartersville", "Emerson", "Euharlee", "White",
    "Griffin", "Zebulon", "Barnesville", "Forsyth",
    "Macon", "Warner Robins", "Perry", "Centerville",
    "Buckhead", "Midtown Atlanta", "Downtown Atlanta", "Virginia-Highland", "Inman Park", "Old Fourth Ward", "Grant Park", "East Atlanta Village", "Little Five Points", "Kirkwood", "Edgewood", "Candler Park", "Morningside", "Lenox", "Ansley Park", "Atlantic Station", "Cabbagetown", "Reynoldstown", "Ormewood Park", "West End", "Castleberry Hill", "Peachtree Heights",
    "Adairsville", "Albany", "Alma", "Americus", "Appling", "Ashburn", "Augusta", "Bainbridge", "Baxley", "Blackshear", "Blairsville", "Blakely", "Blue Ridge", "Bowdon", "Bowman", "Bremen", "Brunswick", "Buchanan", "Buena Vista", "Butler", "Byron", "Cairo", "Calhoun", "Camilla", "Carnesville", "Cave Spring", "Cedartown", "Chatsworth", "Clarkesville", "Claxton", "Clayton", "Cleveland", "Cochran", "Colquitt", "Columbus", "Cordele", "Cornelia", "Crawford", "Crawfordville", "Culloden", "Cusseta", "Cuthbert", "Dahlonega", "Dalton", "Danielsville", "Darien", "Dawson", "Dawsonville", "Demorest", "Donalsonville", "Dublin", "Eastman", "Eatonton", "Elberton", "Ellaville", "Ellijay", "Evans", "Fitzgerald", "Folkston", "Forsyth", "Fort Gaines", "Fort Oglethorpe", "Fort Valley", "Franklin", "Franklin Springs", "Georgetown", "Gibson", "Glennville", "Glenwood", "Gordon", "Gray", "Greensboro", "Greenville", "Hahira", "Hamilton", "Harlem", "Hartwell", "Hawkinsville", "Hazlehurst", "Helen", "Hephzibah", "Hiawassee", "Hinesville", "Hogansville", "Homer", "Homerville", "Irwinton", "Jackson", "Jasper", "Jesup", "Jones County", "Kingsland", "Lafayette", "LaGrange", "Lavonia", "Leesburg", "Lexington", "Lincolnton", "Louisville", "Ludowici", "Lumpkin", "Lyons", "Madison", "Manchester", "Martinez", "McRae", "Metter", "Milan", "Milledgeville", "Millen", "Montezuma", "Monticello", "Morgan", "Moultrie", "Mount Vernon", "Nahunta", "Nashville", "Newington", "Oconee", "Ocilla", "Oglethorpe", "Pearson", "Pelham", "Pembroke", "Pine Mountain", "Pooler", "Port Wentworth", "Quitman", "Reidsville", "Richland", "Richmond Hill", "Ringgold", "Rochelle", "Rockmart", "Rome", "Royston", "Rutledge", "Sandersville", "Savannah", "St. Marys", "St. Simons Island", "Sardis", "Screven", "Smyrna", "Soperton", "Sparta", "Springfield", "Statenville", "Statesboro", "Statham", "Summerville", "Swainsboro", "Sylvania", "Sylvester", "Tallapoosa", "Thomaston", "Thomasville", "Thomson", "Tifton", "Toccoa", "Trenton", "Trion", "Tybee Island", "Unadilla", "Valdosta", "Vidalia", "Vienna", "Warm Springs", "Washington", "Waycross", "Waynesboro", "West Point", "Woodbine", "Wrens", "Wrightsville"
];

for (const location of LOCATIONS) {
    for (const service of SERVICES) {
        let out = html.replace(/"addressLocality": "Lawrenceville",/g, `"addressLocality": "${location}",`);
        out = out.replace(/"@type": "PaintingBuilder",/g, `"@type": "HomeAndConstructionBusiness",`);
        
        // Let's run the other replaces just in case
        const lowerService = service.toLowerCase();
        out = out.replace(
            /How much does painting a house cost in Lawrenceville\?/g,
            `How much does ${lowerService} cost in ${location}?`
        );
        out = out.replace(
            /The cost to paint a house in Lawrenceville varies/g,
            `The cost of ${lowerService} in ${location} varies`
        );
        out = out.replace(
            /Do you offer commercial painting services in Lawrenceville\?/g,
            `Do you offer ${lowerService} in ${location}?`
        );
        
        const scriptStart = out.indexOf('<script type="application/ld+json">');
        const scriptEnd = out.indexOf('</script>', scriptStart);
        const jsonString = out.substring(scriptStart + 35, scriptEnd).trim();
        try {
            JSON.parse(jsonString);
        } catch (e) {
            console.log("JSON parse error on", location, service);
            console.log(e.message);
            console.log(jsonString);
            process.exit(1);
        }
    }
}
console.log("All schemas parsed successfully.");
