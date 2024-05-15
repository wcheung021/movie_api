const express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

    let users =[
        {
            id: 1,
            name: "Wai",
            favouriteMovies: "Full Metal Jacket"
        },{
            id: 2,
            name: "Charlie",
            favouriteMovies: "Top Gun"
        }
    ]

    let theBestMovies =[
        {
            title: "Top Gun",
            release_year: "1986",
            story_line: "US Navy Lieutenant Pete Mitchell, call sign Maverick--an impetuous, daredevil pilot ace--is accepted into Top Gun, Miramar's elite Fighter School. But there, the impulsive young pilot will have to compete with the best of the best, including Iceman, a brilliant and highly competitive fellow student. Now, Mitchell must give his all; however, his father's mysterious and untimely demise still haunts him. Can Maverick prove his worth to Charlie, the flying school's no-nonsense astrophysics instructor? Will he be able to suppress his wild nature to win the prestigious Top Gun Trophy?",
            director: "Tony Scott"
        },{
            title: "Saving Private Ryan",
            release_year: "1998",
            story_line: "Opening with the Allied invasion of Normandy on 6 June 1944, members of the 2nd Ranger Battalion under Cpt. Miller fight ashore to secure a beachhead. Amidst the fighting, two brothers are killed in action. Earlier in New Guinea, a third brother is KIA. Their mother, Mrs. Ryan, is to receive all three of the grave telegrams on the same day. The United States Army Chief of Staff, George C. Marshall, is given an opportunity to alleviate some of her grief when he learns of a fourth brother, Private James Ryan, and decides to send out 8 men (Cpt. Miller and select members from 2nd Rangers) to find him and bring him back home to his mother...",
            director: "Steven Spielberg"
        },{
            title: "Gladiator",
            release_year: "2000",
            story_line: "Maximus is a powerful Roman general, loved by the people and the aging Emperor, Marcus Aurelius. Before his death, the Emperor chooses Maximus to be his heir over his own son, Commodus, and a power struggle leaves Maximus and his family condemned to death. The powerful general is unable to save his family, and his loss of will allows him to get captured and put into the Gladiator games until he dies. The only desire that fuels him now is the chance to rise to the top so that he will be able to look into the eyes of the man who will feel his revenge.",
            director: "Robert Zemeckis"
        },{
            title: "The Outpost",
            release_year: "2019",
            story_line: "During the Afghanistan war, several outposts were placed to control the Taliban movement and their supply chain. Camp Keating, situated in a valley surrounded by mountains, was one them. While being shot at by the Talibans was business as usual, they tried to gain respect from local village elders and have them help stop these skirmishes. One day, when 400 Talibans rallied for a surprise attack, it was up to them to leverage the poor defenses and lack of ammo and manpower they had, to ultimately survive and go back to their loved ones.",
            director: "Rod Lurie"
        },{
            title: "13 Hours: The Secret Soldiers of Benghazi",
            release_year: "2016",
            story_line: "Libya, 2012. At an unofficial CIA base in Benghazi, a group of ex-military contractors are providing security. In the aftermath of Gaddafi's downfall, a power vacuum exists and the climate is volatile. Military weapons are freely available. The US Ambassador to Libya, Chris Stevens, makes a visit to the area, staying in a compound near the CIA base. On the night of 11 September, 2012, the Ambassador's compound is attacked by hordes of heavily armed locals; the only forces willing and able to defend it are six CIA contractors.",
            director: "Michael Ray"
        },{
            title: "Black Hawk Down",
            release_year: "2001",
            story_line: "Action/war drama based on the best-selling book detailing a near-disastrous mission in Somalia on October 3, 1993. On this date nearly 100 U.S. Army Rangers, commanded by Capt. Mike Steele, were dropped by helicopter deep into the capital city of Mogadishu to capture two top lieutenants of a Somali warlord. This led to a large and drawn-out firefight between the Army Rangers, US Special Forces, and hundreds of Somali gunmen, resulting in the destruction of two U.S. Black Hawk helicopters. The film focuses on the heroic efforts of various Rangers to get to the downed helicopters, centering on SSG Eversmann, leading the Ranger unit Chalk Four to the first crash site, Chief Warrant Officer Durant who was captured after being the only survivor of the second crash, as well as many others who were involved.",
            director: "Ridley Scott"
        },{
            title: "We Were Soldiers",
            release_year: "2002",
            story_line: "A telling of the 1st Battalion, 7 Cavalry Regiment, 1st Calvary Division's battle against overwhelming odds in the Ia Drang valley of Vietnam in 1965. Seen through the eyes of the battalion's commander, Lieutenant Colonel Hal Moore (played by Mel Gibson), we see him take command of the battalion and its preparations to go into Vietnam. We also see how the French had, years earlier, been defeated in the same area. The battle was to be the first major engagement between U.S. and N.V.A. forces in South Vietnam, and showed the use of helicopters as mobility providers and assault support aircraft.",
            director: "Randall Wallace"
        },{
            title: "Tears of the Sun",
            release_year: "2003",
            story_line: "Navy SEAL Lieutenant A.K. Waters and his elite squadron of tactical specialists are forced to choose between their duty and their humanity, between following orders by ignoring the conflict that surrounds them, or finding the courage to follow their conscience and protect a group of innocent refugees. When the democratic government of Nigeria collapses and the country is taken over by a ruthless military dictator, Waters, a fiercely loyal and hardened veteran is dispatched on a routine mission to retrieve a Doctors Without Borders physician, Dr. Lena Kendricks. Dr. Kendricks, an American citizen by marriage, is tending to the victims of the ongoing civil war at a Catholic mission in a remote village. When Waters arrives, however, Dr. Kendricks refuses to leave unless he promises to help deliver the villagers to political asylum at the nearby border. If they are left behind, they will be at the mercy of the enormous rebel army. Waters is under strict orders from his commanding officer Captain Bill Rhodes to remain disengaged from the conflict. But as he and his men witness the brutality of the rebels first-hand, they are won over to Dr. Kendricks' cause and place their lives at risk by agreeing to escort the villagers on a perilous trek through the dense jungle. As they move through the countryside on foot, Waters' team, experts at evasion and concealment, are inexplicably and ferociously pursued by an army of rebels. They are confounded until they discover that, among the refugees, is the sole survivor of the country's previous ruling family, whom the rebels have been ordered to eliminate at all costs. Waters and his small band of soldiers must weigh the life of one man against their own and the refugees they feel obliged to protect.",
            director: "Antoinie Fuqua"
        },{
            title: "Windtalkers",
            release_year: "2002",
            story_line: "During World War II when the Americans needed to find a secure method of communicating they devised a code using the Navajo language. So Navajos were recruited to become what they call code talkers. They would be assigned to a unit and would communicate with other units using the code so that even though the enemy could listen they couldn't understand what they were saying. And to insure that the code is protected men are assigned to protect it at all costs. One of these men is Joe Enders, a man who sustained an injury that can make him unfit for duty but he manages to avoid it and is told of his duty and that the man he is suppose to protect is Ben Yahzee. Initially there is tension but the two men learn to get along.",
            director: "John Woo"
        },{
            title: "Full Metal Jacket",
            release_year: "1987",
            story_line: "A two-segment look at the effect of the military mindset and war itself on Vietnam era Marines. The first half follows a group of recruits in boot camp under the command of the punishing Gunnery Sergeant Hartman. The second half shows one of those recruits, Joker, covering the war as a correspondent for Stars and Stripes, focusing on the Tet offensive.",
            director: "Stanley Kubrick"
        },
    ];
// invoke your middleware function
app.use (morgan("common"));


// request for retrieving data about a user by their name employs a request parameter
    app.get("/user", (req, res) =>{
        res.json(users)
    })    

    app.get('/user/:name', (req, res) => {
        res.json(users.find((users) =>
          { return users.name === req.params.name }));
      });

// Adds data for a new user to our list of user.
    app.post("/user", (req, res)=>{
        const newUsers = req.body;
        
        if (!newUsers.name){
            const message = 'Missing "name" in request body';
            res.status (400).send (message);
        }else{
            newUsers.id = uuid.v4();
            users.push(newUsers);
            res.status(201).send(newUsers);
        }
    });

    app.put("/user/:name", (req, res)=>{
        let user = users.find((users) => { return users.id === req.params.id });
        
        if (users){
            users.favouriteMovies[req.params.favouriteMovies] = parseInt(req.params.favouriteMovies);
            res.status(201).send ("Request Approved" );
        } else {
            res.status(404).send("Request denied");
        }
    });

    app.delete('/user/:id', (req, res) => {
        let user = users.find((users) => { return users.id === req.params.id });
      
        if (users) {
          users = users.filter((obj) => { return obj.id !== req.params.id });
          res.status(201).send('User ' + req.params.id + ' was deleted.');
        }
      });


//movie
app.get("/",(req,res)=>{
    res.send("Welcome to My Top 10 Movies");
});

app.get("/theBestMovies",(req,res)=>{
    res.json(theBestMovies);
});

app.get("/documentation",(req,res)=>{
    res.sendFile("public/documentation.html",{root:__dirname});
});

// express.static
    app.use(express.static("public"));

// Error Handling
    app.use((err,req,res,next)=>{
        console.error(err.stack);
        response.status(500).send("Error 404");
    });

// listen for requests
    app.listen(8080,()=>{
        console.log("Your App is listening on port 8080");
    });
