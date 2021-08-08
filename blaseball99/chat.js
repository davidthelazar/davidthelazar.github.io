// PS! Replace this with your own channel ID
// If you use this channel ID your app will stop working in the future
const CLIENT_ID = 'LngElqomNYpHhoxw';

const drone = new ScaleDrone(CLIENT_ID, {
  data: { // Will be sent out as clientData via events
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});

function getRandomName() {
  const adjs = ["Sutton","Aldon","Ruslan","Bevan","Carmelo","Foxy","Socks","Joshua","Eugenia","Richmond","Isaac","Richardson","Alston","Fitzgerald","Velasquez","Kichiro","Patel","Mcdowell","Esme","Niq","Flattery","Ortiz","Siobhan","Frankie","Slosh","Yurts","Hercules","Erin","Geraldine","Montgomery","Valentine","Wyatt","Theodore","Zack","Scores","Zion","Peanutiel","Stijn","Igneus","Liquid","Kennedy","Pedro","Tot","Pa-k-r","Trinity","Fish","Chambers","Nic","Glabe","Zesty","Inez","Dunn","Lenny","Salih","Allan","Silvaire","Jacob","Elijah","Tamara","Campos","Walton","Dervin","Bauer","Kathy","Baby","Collins","Steph","Commissioner","Beans","Jesús","Ziwa","Cedric","Lachlan","Lucien","Simon","Stu","--r---","Oliver","Herring","Donna","Goodwin","Stew","Wesley","Goobie","Swamuel","Baby","Justice","Gita","Wanda","Comfort","Lotus","Hendricks","Logan","Beasley","Nerd","Francisco","Tillman","Betsy","NaN","Sparks","Alyssa","Felix","Mira","Christian","Bees","Mindy","Gia","Kelvin","Adelaide","Evelton","James","Hahn","Paula","Reese","Lenny","Denzel","Randy","Francisca","Ren","Ze-hyr","Holden","Cory","Allison","Rai","Conner","Kline","Dickerson","Thomas","Nagomi","Tot","Summers","Eduardo","Rivers","Cannonball","Paula","Nicholas","Ayanna","Matteo","Bates","Spears","Jacob","Beck","Lady","Peanut","Oliver","Yusef","Zeboriah","Joe","Kaj","Eugenia","Kaz","Brisket","Paula","Yeong-Ho","Avila","Math","Yrjö","Knight","Halexandrey","Sandie","Ren","Hewitt","Rodriguez","Jode","Marco","Helga","Kina","Marquez","Rat","Basilio","Basilio","Sexton","Jaxon","Lance","Wyatt","Jessica","Lars","Peanut","Margarito","Mummy","Sebastian","Sixpack","Brock","Tai","Fran","Y--g","Ronan","Stephanie","Wichita","Jasper","Rivers","Nagomi","Riley","Cal-b","Randy","Jomgy","Jasmine","Malik","Stevenson","Patty","Greer","Vito","Theo","Hatfield","Anathema","Andrew","Nandy","Schneider","Mullen","Lenny","Vessalius","S-ratch","Loubert","Muse","Farrell","Fishcake","Teeth","Backwoods","Dunbar","Phoebe","Ikea","HANDSOME","Y3hirv","Quebrada","Friend","Huber","Lang","Yusef","Usurper","Stealix","Stephen","Cory","Cat","Dudley","York","Gunther","Alexander","Pitching","Mint","Percival","Helga","Don","Alaynabella","Quack","Howell","Oliver","Wyatt","Snack","Turing","Datum","None","Batista","Major","Bob","Strike","Beans","Boyfriend","Landry","Randall","Workman","Tyreek","Dominic","Scrap","Morrow","Sebastian","Kiki","Yazmin","Caligula","Emmett","Gerund","Nandy","Elwin","Rylan","Engine","Silvaire","Freemium","Logan","Bonk","Inky","Sam","Cory","Silvia","Jan","Rigby","Elvis","Caleb","Uncle","Parker","Jon","Adalberto","Finn","Gloria","Castillo","Brock","Mikan","Wyatt","Howell","Lowe","August","Greer","Jenkins","Beasley","Augusto","Jaylen","Blood","Cornelius","Snyder","Bright","Lou","Kennedy","Gabriel","Agan","Dunlap","Fletcher","Cudi","Sandford","Winnie","Alexandria","Yosh","Eizabeth","Durham","PolkaDot","Shirai","Bottles","Jolene","Sandoval","Sigmund","Chorby","Leach","Orville","Ronan","Zoey","Arturo","Summers","Juice","Famous","Mordecai","Baldwin","Fenry","Evelton","Hiroto","Jayden","Miguel","Sosa","Emmett","Bennett","Theodore","Sutton","Leach","Mooney","Fynn","PolkaDot","Yummy","Wyatt","Cell","Combs","Burke","Curry","Rafael","Sixpack","Qais","Liam","Penelope","Sandie","Conrad","Xandra","Jacoby","Patchwork","PomPom","Jay","Watson","Roxetta","Cinna","Happy","Henry","Tiana","Electric","Helga","Milo","Bontgomery","King","Karato","Mike","Fitzgerald","Nolanestophia","Magi","Zero","Jason","PolkaDot","Espresso","Nebula","Axel","Coolname","Grollis","Alejandro","Mags","King","Melton"];
  const nouns = ["Dreamy","Cashmoney","Greatness","Wise","Plums","Pebble","Maybe","Watson","Garbage","Harrison","Johnson","Games","Cerveza","Blackburn","Alstott","Guerra","Beyonce","Mason","Ramsey","Nyong'o","McKinley","Lopez","Chark","Hambone","Truk","Buttercup","Alighieri","Jesaulenko","Frost","Bullock","Games","Glover","Duende","Sanders","Baserunner","Aliciakeyes","Duffy","Strongbody","Delacruz","Friend","Loser","Davids","Fox","Men-","Smaht","Summer","Simmons","Winkler","Moon","Yaboi","Owens","Keyes","Spruce","Ultrabass","Kranch","Roadhouse","Haynes","Valenzuela","Crankit","Arias","Sports","Gorczyca","Zimmerman","Mathews","Doyle","Melon","Weeks","Vapor","McBlase","Koch","Mueller","Spliff","Shelton","Patchwork","Haley","Trololol","H----b---","Loofah","Winfield","Milicic","Morin","Briggs","Poole","Ballson","Mora","Triumphant","Spoon","Sparrow","Schenn","Septemberish","Mango","Richardson","Horseman","Day","Pacheco","Presto-","Henderson","Trombone","","Beans","Harrell","Garbage","Lemma","Combs","Taswell","Kugel","Holbrook","Drumsolo","Judochop","McBlase","Mora","Fox","Turnip","Clark","Marijuana","Scott","Castillo","Sasquatch","Hunter","Mc-l--d","Stanton","Ross","Abbott","Spliff","Haley","Greenlemon","Morse","Dracaena","Nava","Clark","Preston","Woodman","Rosa","Sports","Mason","Mora","Dumpington","Triumphant","Bentley","Taylor","Winner","Whitney","Matsuyama","Holloway","Notarobot","Fenestrate","Wilson","Voorhees","Statter Jr.","Bickle","Fiasco","Friendo","Reddick","Garcia","Guzman","Velazquez","Kerfuffle","Triumphant","Walton","Turner","Morin","Best","Internet","Preston","Stink","Washington","Larsen","Clark","Mason","Mason","Fig","Wheerer","Buckley","Serotonin","Quitter","Telephone","Taylor","Bong","Nava","Melcon","Woodman","Dogwalker","Watson","Beanbag","Beans","Wri-ht","Combs","Winters","Toaster","Blather","Clembons","Mcdaniel","Firewall","No-ak","Dennis","Rolsenthal","Washington","Destiny","Heat","Fox","Gwiffin","Kravitz","King","Suzuki","Elemefayo","Solis","Fantastic","Bendie","Peterson","Crumb","Sundae","Deleuze","Ji-Eun","Scantron","Seagull","Can","Bandana","Broker","McLoud","Blasesona","Jellofin","SCARF","Hafgy2738riv","Stone","Void","Frumple","Richardson","Puddles","Violet","Kramer","Shelled","Thirteen","Inning","Mueller","Silk","O'Brian","Horne","Machine","Shupe","Wheeler","Moreno","Mitchell","Hollywood","Enjoyable","Franklin","Mueller","Mason X","Deviation","Capybara","Criminale","Binary","Oatmilk","Arcana","E. Cagayan","Looking","Reblase","Monreal","Violence","Marijuana","Gloom","Olive","Marijuana","Murphy","Doyle","Sunshine","Familia","Mason","Lotus","Internet","Pantheocide","Slumps","McGhee","O'Lantern","Eberhardt","Semiquaver","Seraph","Rodriguez","Jokes","Rutledge","Scandal","Twelve","Rugrat","Canberra","Friedrich","Figueroa","Alvarado","Plasma","Parra","Halifax","Tosser","James","Bugsnax","Turner","Forbes","Hammer","Pothos","Rocha","-orb--","Sky","Lott","Good","Gloom","Reddick","Hotdogfingers","Hamburger","Games","Briggs","Zimmerman","Roseheart","Rodgers","Griffith","Harrison","Figueroa","Yamamoto","Di Batterino","Garner","Hess","Rosales","Carpenter","Elliott","Spaceman","Patterson","McElroy","Suljak","Willowtree","Crossing","Castillo","Short","Herman","Manco","Jaylee","Kirchner","Huerta","Pony","Collins","Owens","Kingbird","Breadwinner","Marlow","McBlase","Wilcox","Wright","James","Hayes","Tabby","Bluesky","Cervantes","Bishop","Ingram","Doctor II","Doyle","Zavala","Elliott","Mason IV","Barajas","Estes","Gonzales","Aliciakeyes","Davids","Santiago","Dogwalker","Snail","Mathews","Carver","Vaughan","Pancakes","Podcast","Southwick","Pomodoro","Grayscale","Ward","Compass","Toast","Yoinky","Marshallow","Takahashi","Kettle","Burton","Brown","Mullock","Roland","Bean","Townsend","Wanderlust","Patterson","Ruiz","Index","Datablase","Matrix","Machine","Holstein","Trololol","Galvanic","Zephyr","Leaf","Banananana","Weatherman","Telephone"];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-room',
    message: value,
  });
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}
