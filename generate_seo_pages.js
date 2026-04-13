const fs = require('fs');
const path = require('path');

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

// Around 300 locations in GA encompassing Metro Atlanta and beyond
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

const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const TEMPLATE_PATH = path.join(__dirname, 'index.html');
const OUTPUT_DIR = path.join(__dirname, 'dist'); 

if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
} 

console.log(`Loading master template from ${TEMPLATE_PATH}`);
const templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const sitemapUrls = [];
let totalGenerated = 0;

console.log(`Generating pages for ${SERVICES.length} services across ${LOCATIONS.length} locations...`);
console.log(`Expected total pages: ${SERVICES.length * LOCATIONS.length}`);

// Generate HTML Sitemap entries
let htmlSitemapLinks = "";

for (const location of LOCATIONS) {
    for (const service of SERVICES) {
        const slug = toSlug(`${location}-${service}`);
        const dirPath = path.join(OUTPUT_DIR, slug);

        // Pre-compute dynamic string variants
        const lowerService = service.toLowerCase();
        const upperService = service.toUpperCase();
        const upperLocation = location.toUpperCase();

        let html = templateHtml;

        // 1. Meta Title
        html = html.replace(
            /<title>Top Painting Contractors Lawrenceville \| Residential & Commercial Painters<\/title>/g,
            `<title>#1 ${service} in ${location}, GA | Anthony's Painting Service</title>`
        );

        // 2. Meta Description
        html = html.replace(
            /<meta name="description" content="Lawrenceville's #1 rated painting contractors\. We specialize in high-end residential, commercial, interior, exterior, and cabinet refinishing\. Get a free quote today! ">/g,
            `<meta name="description" content="Top-rated ${lowerService} experts in ${location}. We specialize in high-end residential and commercial coatings in ${location}, GA. Get a free quote today! ">`
        );

        // 3. SEO Schema
        html = html.replace(
            /"addressLocality": "Lawrenceville",/g,
            `"addressLocality": "${location}",`
        );
        html = html.replace(
            /"@type": "PaintingBuilder",/g,
            `"@type": "HomeAndConstructionBusiness",`
        );

        // Inject Geo Meta Tags
        html = html.replace(
            /<\/head>/,
            `
    <meta name="geo.region" content="US-GA" />
    <meta name="geo.placename" content="${location}" />
    <meta name="geo.position" content="33.7490;-84.3880" />
    <meta name="ICBM" content="33.7490, -84.3880" />
    </head>`
        );

        // 4. Canonical
        html = html.replace(
            /<link rel="canonical" href="https:\/\/www\.anthonyspaintingservice\.com\/">/g,
            `<link rel="canonical" href="https://www.anthonyspaintingservice.com/${slug}/">`
        );

        // 5. Hero Section
        html = html.replace(
            /LAWRENCEVILLE'S #1 RATED PAINTING CONTRACTORS/g,
            `${upperLocation}'S #1 RATED ${upperService} EXPERTS`
        );
        html = html.replace(
            /TOP RATED <br \/>\s*<span className="text-gradient">\s*PAINTING CONTRACTORS\s*<\/span> <br \/>\s*IN LAWRENCEVILLE\./g,
            `TOP RATED <br />\n                                <span className="text-gradient">\n                                    ${upperService}\n                                </span> <br />\n                                IN ${upperLocation}.`
        );
        html = html.replace(
            /We provide elite painting services designed to perfectly refresh your property and withstand the local weather\./g,
            `We provide elite ${lowerService} services designed to perfectly refresh your property in ${location} and withstand the local weather.`
        );

        // 6. FAQ Section
        html = html.replace(
            /How much does painting a house cost in Lawrenceville\?/g,
            `How much does ${lowerService} cost in ${location}?`
        );
        html = html.replace(
            /The cost to paint a house in Lawrenceville varies/g,
            `The cost of ${lowerService} in ${location} varies`
        );
        html = html.replace(
            /Do you offer commercial painting services in Lawrenceville\?/g,
            `Do you offer ${lowerService} in ${location}?`
        );
        html = html.replace(
            /across Lawrenceville and surrounding areas/g,
            `across ${location} and surrounding areas`
        );
        html = html.replace(
            /How do you prep for Lawrenceville's weather\?/g,
            `How do you prep for ${location}'s weather?`
        );
        html = html.replace(
            /Top answers for Lawrenceville property owners\./g,
            `Top answers for ${location} property owners.`
        );

        // 7. Footer
        html = html.replace(
            /Serving Lawrenceville<br\/>and surrounding areas\./g,
            `Serving ${location}<br/>and surrounding areas.`
        );

        // 8. Silo Insulation Navigation Links (Relative Backpaths)
        // Convert the static footer's "Our Services" `dist/lawrenceville-service/index.html` to `../city-service/index.html`
        html = html.replace(/href="dist\/lawrenceville-/g, `href="../${toSlug(location)}-`);
        
        // Convert Babel generated dynamic strings mapping `dist/lawrenceville-${service.slug}` to `../city-${service.slug}`
        html = html.split('dist/lawrenceville-${service.slug}').join(`../${toSlug(location)}-\${service.slug}`);

        // Convert Geographic Spiderweb references mapping `./dist/suwanee-` to `../suwanee-`
        html = html.replace(/href="\.\/dist\/lawrenceville-/g, `href="../lawrenceville-`);
        html = html.replace(/href="\.\/dist\/suwanee-/g, `href="../suwanee-`);
        html = html.replace(/href="\.\/dist\/duluth-/g, `href="../duluth-`);
        html = html.replace(/href="\.\/dist\/snellville-/g, `href="../snellville-`);
        html = html.replace(/href="\.\/dist\/buford-/g, `href="../buford-`);

        // Convert areas-we-serve.html reference to go up one directory
        html = html.replace(/href="dist\/areas-we-serve\.html"/g, 'href="../areas-we-serve.html"');

        // Write HTML File
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(path.join(dirPath, 'index.html'), html);
        
        // Push URL for sitemaps
        const fullUrl = `https://www.anthonyspaintingservice.com/${slug}/`;
        sitemapUrls.push(`  <url>\n    <loc>${fullUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`);
        
        // HTML Sitemap link
        htmlSitemapLinks += `<li><a href="${slug}/index.html">${service} in ${location}</a></li>\n`;

        totalGenerated++;
        if (totalGenerated % 1000 === 0) {
            console.log(`Generated ${totalGenerated} pages...`);
        }
    }
}

console.log('Finished generating HTML files. Creating sitemaps...');

// Generate XML Sitemap
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
const xmlFooter = `\n</urlset>`;
fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), xmlHeader + sitemapUrls.join('\n') + xmlFooter);

// Generate HTML Sitemap Listing
const htmlSitemapPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Areas We Serve | Anthony's Painting Service</title>
    <style>
        body { font-family: sans-serif; padding: 40px; background: #F9F8F6; }
        h1 { color: #F27D26; }
        ul { display: flex; flex-wrap: wrap; gap: 10px; list-style: none; padding: 0; }
        li { width: 300px; padding: 5px; }
        a { text-decoration: none; color: #000; }
        a:hover { color: #F27D26; }
    </style>
</head>
<body>
    <h1>Areas We Serve</h1>
    <ul>
        ${htmlSitemapLinks}
    </ul>
</body>
</html>`;
fs.writeFileSync(path.join(OUTPUT_DIR, 'areas-we-serve.html'), htmlSitemapPage);

// Generate Robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.anthonyspaintingservice.com/sitemap.xml
`;
fs.writeFileSync(path.join(OUTPUT_DIR, 'robots.txt'), robotsTxt);

console.log(`✅ Success! Generated ${totalGenerated} SEO pages, sitemap.xml, areas-we-serve.html, and robots.txt.`);
