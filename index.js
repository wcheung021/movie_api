const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');

const app = express();

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.json());
app.use(morgan("common"));

mongoose.connect('mongodb://localhost:27017/123', { useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});



let movies = [
  {
    Title: 'Silence of the Lambs',
    Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.',
    Genre: {
      Name: 'Thriller',
      Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
    },
    Director: {
      Name: 'Jonathan Demme',
      Bio: 'Robert Joathan Demme was an American director, producer, and screenwriter.',
      Birth: '1944',
      Death: '2017'
    },
    ImagePath: 'silenceofthelambs.png',
    Feathured: true,
    Actors: [ 'Kasi Lemmings' ]
  },
  {
    Title: 'Saving Private Ryan',
    Description: 'Opening with the Allied invasion of Normandy on 6 June 1944, members of the 2nd Ranger Battalion under Cpt. Miller fight ashore to secure a beachhead. Amidst the fighting, two brothers are killed in action. Earlier in New Guinea, a third brother is KIA. Their mother, Mrs. Ryan, is to receive all three of the grave telegrams on the same day. The United States Army Chief of Staff, George C. Marshall, is given an opportunity to alleviate some of her grief when he learns of a fourth brother, Private James Ryan, and decides to send out 8 men to find him and bring him back home to his mother...',
    Genre: [
      {
        Name: 'Drama',
        Description: 'Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between.'
      },
      {
        Name: 'War',
        Description: 'War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century. The fateful nature of battle scenes means that war films often end with them.'
      }
    ],
    Director: {
      Name: 'Steven Spielberg',
      Bio: 'Steven Allan Spielberg is an American filmmaker. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history.[1] He is the recipient of many accolades, including three Academy Awards, two BAFTA Awards, nine Golden Globe Awards, and four Directors Guild of America Awards.',
      Birth: '1946-12-18',
      Death: ''
    },
    Actors: [ 'Tom Hanks', 'Matt Damon', 'Tom Sizemore' ],
    ImapePath: 'savingprivateryan.png',
    Featured: true
  },
  {
    Title: 'Gladiator',
    Description: 'Sir Ridley Scott GBE is an English filmmaker. He is best known for directing films in the science fiction, crime and historical drama genres. His work is known for its atmospheric and highly concentrated visual style. He ranks among the highest-grossing directors and has received many accolades, including the BAFTA Fellowship for lifetime achievement in 2018, two Primetime Emmy Awards, and a Golden Globe Award. He was knighted by Queen Elizabeth II in 2003, and appointed a Knight Grand Cross by King Charles III in 2024.',
    Genre: [
      {
        Name: 'Drama',
        Description: 'Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between.'
      },
      {
        Name: 'Action',
        Description: 'Action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.'
      }
    ],
    Director: {
      Name: 'Ridley Scott',
      Bio: 'Sir Ridley Scott GBE is an English filmmaker. He is best known for directing films in the science fiction, crime and historical drama genres. His work is known for its atmospheric and highly concentrated visual style.[1][2][3] He ranks among the highest-grossing directors and has received many accolades, including the BAFTA Fellowship for lifetime achievement in 2018, two Primetime Emmy Awards, and a Golden Globe Award.[4] He was knighted by Queen Elizabeth II in 2003,[5] and appointed a Knight Grand Cross by King Charles III in 2024.',
      Birth: '1937-11-30',
      Death: ''
    },
    Actors: [ 'Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen' ],
    ImagePath: 'gladiator.png',
    Featured: true
  },
  {
    Title: 'Top Gun',
    Description: 'US Navy Lieutenant Pete Mitchell, call sign Maverick--an impetuous, daredevil pilot ace--is accepted into Top Gun, elite Fighter School. But there, the impulsive young pilot will have to compete with the best of the best, including Iceman, a brilliant and highly competitive fellow student. Now, Mitchell must give his all; however, his fathers mysterious and untimely demise still haunts him. Can Maverick prove his worth to Charlie, the flying school is no-nonsense astrophysics instructor? Will he be able to suppress his wild nature to win the prestigious Top Gun Trophy?',
    Genre: [
      {
        Name: 'Drama',
        Description: 'Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between.'
      },
      {
        Name: 'Action',
        Description: 'Action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.'
      }
    ],
    Director: {
      Name: 'Tony Scott',
      Bio: 'Anthony David Leighton Scott was an English film director and producer. He made his theatrical film debut with The Hunger (1983) and went on to direct highly successful action and thriller films.',
      Birth: '1944-06-21',
      Death: '2012-08-19'
    },
    Actors: [ 'Tom Cruise', 'Tim Robbins', 'Kelly McGillis' ],
    ImapePath: 'topgun.png',
    Featured: true
  },
  {
    Title: 'The OutPost',
    Description: 'During the Afghanistan war, several outposts were placed to control the Taliban movement and their supply chain. Camp Keating, situated in a valley surrounded by mountains, was one them. While being shot at by the Talibans was business as usual, they tried to gain respect from local village elders and have them help stop these skirmishes. One day, when 400 Talibans rallied for a surprise attack, it was up to them to leverage the poor defenses and lack of ammo and manpower they had, to ultimately survive and go back to their loved ones.',
    Genre: [
      {
        Name: 'Action',
        Description: 'Action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.'
      },
      {
        Name: 'Drama',
        Description: 'Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between.'
      },
      {
        Name: 'War',
        Description: 'War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century. The fateful nature of battle scenes means that war films often end with them.'
      }
    ],
    Director: {
      Name: 'Rod Lurie',
      Bio: 'Rod Lurie is an American director, screenwriter, and former film critic.',
      Birth: '1962-05-15',
      Death: ''
    },
    Actors: [ 'Scott Eastwood', 'Caleb Landry Jones', 'Orlando Bloom' ],
    ImagePath: 'theoutpost.png',
    Featured: true
  },
  {
    Title: '13 Hours: The Secret Soldiers of Benghazi',
    Description: 'Libya, 2012. At an unofficial CIA base in Benghazi, a group of ex-military contractors are providing security. In the aftermath of Gaddafis downfall, a power vacuum exists and the climate is volatile. Military weapons are freely available. The US Ambassador to Libya, Chris Stevens, makes a visit to the area, staying in a compound near the CIA base. On the night of 11 September, 2012, the Ambassadors compound is attacked by hordes of heavily armed locals; the only forces willing and able to defend it are six CIA contractors.',
    Genre: [
      {
        Name: 'Action',
        Description: 'Action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.'
      },
      {
        Name: 'Drama',
        Description: 'Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between.'
      }
    ],
    Director: {
      Name: 'Michael Bay',
      Bio: 'Michael Benjamin Bay is an American film director and producer. He is best known for making big-budget, high-concept action films characterized by fast cutting, stylistic cinematography and visuals, and extensive use of special effects, including frequent depictions of explosions.[2][3] The films he has produced and directed, which include Armageddon (1998), Pearl Harbor (2001) and the Transformers film series (2007–present), have grossed over US$7.8 billion worldwide, making him one of the most commercially successful directors in history.',
      Birth: '1965-02-17',
      Death: ''
    },
    Actors: [ 'John Krasinski', 'Pablo Schreiber', 'James Badge Dale' ],
    ImagePath: '13HoursTheSecretSoldiersofBenghazi.png',
    Featured: true
  },
  {
    Title: 'Black Hawk Down',
    Description: 'Based on the best-selling book detailing a near-disastrous mission in Somalia on October 3, 1993. On this date nearly 100 U.S. Army Rangers, commanded by Capt. Mike Steele, were dropped by helicopter deep into the capital city of Mogadishu to capture two top lieutenants of a Somali warlord. This led to a large and drawn-out firefight between the Army Rangers, US Special Forces, and hundreds of Somali gunmen, resulting in the destruction of two U.S. Black Hawk helicopters. The film focuses on the heroic efforts of various Rangers to get to the downed helicopters, centering on SSG Eversmann, leading the Ranger unit Chalk Four to the first crash site, Chief Warrant Officer Durant who was captured after being the only survivor of the second crash, as well as many others who were involved.',
    Genre: [
      {
        Name: 'War',
        Description: 'War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century. The fateful nature of battle scenes means that war films often end with them.'
      },
      {
        Name: 'Action',
        Description: 'Action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.'
      }
    ],
    Director: {
      Name: 'Ridley Scott',
      Bio: 'Sir Ridley Scott GBE is an English filmmaker. He is best known for directing films in the science fiction, crime and historical drama genres. His work is known for its atmospheric and highly concentrated visual style.[1][2][3] He ranks among the highest-grossing directors and has received many accolades, including the BAFTA Fellowship for lifetime achievement in 2018, two Primetime Emmy Awards, and a Golden Globe Award.[4] He was knighted by Queen Elizabeth II in 2003,[5] and appointed a Knight Grand Cross by King Charles III in 2024',
      Birth: '1937-11-30',
      Death: ''
    },
    Actors: [ 'Josh Hartnett', 'Ewan Mcgregor', 'Tom Sizemore' ],
    ImagePath: 'blackhawkdown.png',
    Featured: true
  },
  {
    Title: 'We Were Soldiers',
    Description: 'A telling of the 1st Battalion, 7 Cavalry Regiment, 1st Calvary Divisions battle against overwhelming odds in the Ia Drang valley of Vietnam in 1965. Seen through the eyes of the battalions commander, Lieutenant Colonel Hal Moore, we see him take command of the battalion and its preparations to go into Vietnam. We also see how the French had, years earlier, been defeated in the same area. The battle was to be the first major engagement between U.S. and N.V.A. forces in South Vietnam, and showed the use of helicopters as mobility providers and assault support aircraft.',
    Genre: [
      {
        Name: 'Action',
        Description: 'Action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.'
      },
      {
        Name: 'War',
        Description: 'War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century. The fateful nature of battle scenes means that war films often end with them.'
      }
    ],
    Director: {
      Name: 'Randall Wallace',
      Bio: 'Randall Wallace (born July 28, 1949) is an American screenwriter, film director and producer who came to prominence by writing the screenplay for the historical drama film Braveheart (1995). His work on the film earned him a nomination for the Academy Award for Best Original Screenplay and a Writers Guild of America Award in the same category.',
      Birth: '1949-07-28',
      Death: ''
    },
    Actors: [ 'Mel Gibson', 'Madeleine Stowe', 'Greg Kinnear' ],
    ImagePath: 'weweresoldiers.png',
    Featured: true
  },
  {
    Title: 'Tears of the Sun',
    Description: 'A fictitious U.S. Navy SEAL team rescue mission amidst the 21st-century version of the civil war in Nigeria. Lieutenant A.K. Waters commands the team sent to rescue U.S. citizen Dr. Lena Fiore Kendricks before the approaching rebels reach her jungle hospital.',
    Genre: {
      Name: 'Action',
      Description: 'Action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.'
    },
    Director: {
      Name: 'Antoine Fuqua',
      Bio: 'Antoine Fuqua is an American film director known for his work in the action and thriller genres. He was originally known as a director of music videos, and made his film debut in 1998 with The Replacement Killers. His critical breakthrough was the 2001 crime thriller Training Day, winning the Black Reel Award for Outstanding Director.',
      Birth: '1965-05-30',
      Death: ''
    },
    Actors: [ 'Bruce Willis', 'Cole Hauser', 'Monica Bellucci' ],
    ImagePath: 'tearsofthesun.png',
    Featured: true
  },
  {
    Title: 'Windtalkers',
    Description: 'During World War II when the Americans needed to find a secure method of communicating they devised a code using the Navajo language. So Navajos were recruited to become what they call code talkers. They would be assigned to a unit and would communicate with other units using the code so that even though the enemy could listen they could not understand what they were saying. And to insure that the code is protected men are assigned to protect it at all costs. One of these men is Joe Enders, a man who sustained an injury that can make him unfit for duty but he manages to avoid it and is told of his duty and that the man he is suppose to protect is Ben Yahzee. Initially there is tension but the two men learn to get along.',
    Genre: [
      {
        Name: 'Action',
        Description: 'Action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.'
      },
      {
        Name: 'War',
        Description: 'War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century. The fateful nature of battle scenes means that war films often end with them.'
      }
    ],
    Director: {
      Name: 'John Woo',
      Bio: 'John Woo Yu-Sen SBS is a Hong Kong filmmaker, known as a highly influential figure in the action film genre. He is a pioneer of heroic bloodshed films and the gun fu genre in Hong Kong action cinema, before working in Hollywood films. He is known for his highly chaotic bullet ballet action sequences, stylized imagery, Mexican standoffs, frequent use of slow motion and allusions to wuxia, film noir and Western cinema.',
      Birth: '1946-09-22',
      Death: ''
    },
    Actors: [ 'Nicolas Cage', 'Adam Beach', 'Peter Stormare' ],
    ImagePath: 'windtalkers.png',
    Featured: true
  },
  {
    Title: 'Full Metal Jacket',
    Description: 'A two-segment look at the effect of the military mindset and war itself on Vietnam era Marines. The first half follows a group of recruits in boot camp under the command of the punishing Gunnery Sergeant Hartman. The second half shows one of those recruits, Joker, covering the war as a correspondent for Stars and Stripes, focusing on the Tet offensive.',
    Genre: {
      Name: 'War',
      Description: 'War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama. It has been strongly associated with the 20th century. The fateful nature of battle scenes means that war films often end with them.'
    },
    Director: {
      Name: 'Stanley Kubrick',
      Bio: 'Stanley Kubrick was an American filmmaker and photographer. Widely considered one of the greatest filmmakers of all time, his films were nearly all adaptations of novels or short stories, spanning a number of genres and gaining recognition for their intense attention to detail, innovative cinematography, extensive set design, and dark humor.',
      Birth: '1928-07-26',
      Death: '1999-03-07'
    },
    Actors: [ 'Matthew Modine', 'R.Lee Ermey', "Vincent D'Onofrio" ],
    ImagePath: 'fullmetaljacket.png',
    Featured: true
  }
];

let users = [
  {
    Username: 'johndoe',
    Password: 'password123',
    Email: 'johndoe@example.com',
    Birthday: '1990-01-15',
    FavoriteMovies: ""
  },
  {
    Username: 'janesmith',
    Password: 'securepass456',
    Email: 'janesmith@example.com',
    Birthday: '1985-07-22',
    FavoriteMovies: ""
  },
  {
    Username: 'michaelbrown',
    Password: 'mypassword789',
    Email: 'michaelbrown@example.com',
    Birthday: '1978-11-05',
    FavoriteMovies: ""
  },
  {
    Username: 'emilywhite',
    Password: 'whiteemily321',
    Email: 'emilywhite@example.com',
    Birthday: '1995-03-30',
    FavoriteMovies: ""
  }
];

//documents
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

//users
app.get('/users', async (req, res) => {
  await Users.find()
      .then((users) => {
          res.status(201).json(users);
  })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
  });
});



app.post('/users', async (req, res) => {
  try {
    const existingUser = await Users.findOne({ Username: req.body.Username });
    if (existingUser) {
      return res.status(400).send(req.body.Username + ' already exists');
    }
    const newUser = await Users.create({
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user: ' + error.message);
  }
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Error 404");
});

app.listen(8080, () => {
    console.log("Your App is listening on port 8080");
});