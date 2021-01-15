# Documentation

Published January 14, 2021


## Production Link

<a target="_blank" href="">Coming Soon</a>

## Live Demo Link

<a target="_blank" href="https://shakerilab.herokuapp.com/">demo</a>

## Summary

This project is a resource website which presents lab information for the Shakeri Lab. The site includes a Home screen which stores News infromation and allows the lab to make announcements. Additionally, the site allows the lab to display lab personnel with individual bios. Further, projects, publications, and teaching/learning material can be uploaded and linked to the site; this insformation can be filtered by the user. Individual blogs and contact information can be posted in a markdown file.

## Run this project locally

1. Make sure that Javascript is installed on your machine. You can install Node.js <a target="_blank" href="https://nodejs.org/en/">here</a>. 
2. Clone this repository ("git clone https://github.com/Shakeri-Lab/data-science-lab") using your terminal. If you are not using a unix OS (Mac or Linux) and don't already have a unix terminal emulator, <a target="_blank" href="https://git-scm.com/downloads">install git bash here</a>.
3. cd into the project folder (data-science-lab) from your terminal
4. run "npm install"
5. run "npm start". A new browser tab will open displaying the local copy of the project.

## Push changes to the remote repository

1. cd into the project folder (data-science-lab) from your terminal
2. run "git pull" to get all te recent updates from the remote repository, otherwise conflicts can be introduced into the project.
3. run "npm test" to ensure that your changes work locally
4. run "git add *"
5. run "git commit -m "whatever_you_want_here"
6. run "git push"

**I will add more instructions for this section when the site is hosted in production with continuous integration enabled**

## Edit the website Home Screen
### Site description (upper text)

1. Open public/Home.md and make changes

### News (lower left text)

1. Open public/News.md and make changes

## Edit the Blog Tab

1. Open public/Blog.md and make changes

## Edit the Contact Tab

1. Open public/Contact.md and make changes

## Add a personal bio

1. Inside public folder, create a file "FirstnameLastname.md". Add your bio content.
2. Inside src/Components/Personnel create a file "FirstnameLastname.js":

            import React, { useState } from 'react';
            import ReactMd from 'react-md-file';

            const FirstnameLastname = () => {
                return(
                    <div className="App">
                        <div className="content-container">
                            <ReactMd fileName="./FirstnameLastname.md" />
                        </div>
                    </div>
                )
            }

            export default FirstnameLastname; 

3. Open src/Components/Personnel.js. Inside of the second div tag add the following code:

        <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, margin: 20, width: 250, cursor: "pointer"}}
                onClick={() => {
                    window.location.href = "FirstnameLastname"
                }}
                >
                    <img style={{borderRadius: 10, height: 250}} src="A_Link_To_Your_Profile_Pic" />
                    <div style={{padding: 5}}>
                        <strong>Firstname Lastname</strong>
                        <p>What_you_do | Institution</p>
                    </div>
                </div>

4. Open src/App.js. Under the "//personnel" comment insert:

        import FirstnameLastname from "./Components/Personnel/FirstnameLastname"; 

5. Under the "{/*Personnel*/}" comment add the following code:

          <Route path="/FirstnameLastname" component={FirstnameLastname}>
            <FirstnameLastname />
          </Route>

## Add a new Project in the "Project" Tab

1. Inside public folder, create a file "Atitle.md". Add your project content.
2. Open src/Components/Projects.json
3. In the top of the JSON object add a new element in the following format:

        {"title": "Project_Title", "description": "A_description", "tags": "#project #tag", "url": "Atitle", "imageUrl": "anImageSourceURL"},
    
4. Open src/Components/Projects folder
5. Create a new file "Atitle.js" and insert the following code:

        import React, { useState } from 'react';
        import ReactMd from 'react-md-file';

        const Atitle = () => {
            return(
                <div className="App">
                    <div className="content-container">
                        <ReactMd fileName="./Atitle.md" />
                    </div>
                </div>
            )
        }

        export default Atitle; 

6. Open src/App.js. Under the "//projects" comment insert:

        import Atitle from "./Components/Projects/Atitle"; 

7. Under the "{/*Projects*/}" comment add the following code:

        <Route path="/Atitle" component={Atitle}>
            <Atitle />
        </Route>

## Add a new Publication in the "Publication" Tab

1. Inside public folder, create a file "Atitle.md". Add your publication content.
2. Open src/Components/Publications.json
3. In the top of the JSON object add a new element in the following format:

        {"title": "Publication_Title", "journal": "Journal Name", "year": "YYYY", "url": "Atitle", "description": "A_description", "imageUrl": "anImageSourceURL"},
    
4. Open src/Components/Publications folder
5. Create a new file "Atitle.js" and insert the following code:

        import React, { useState } from 'react';
        import ReactMd from 'react-md-file';

        const Atitle = () => {
            return(
                <div className="App">
                    <div className="content-container">
                        <ReactMd fileName="./Atitle.md" />
                    </div>
                </div>
            )
        }

        export default Atitle; 

6. Open src/App.js. Under the "//publications" comment insert:

        import Atitle from "./Components/Publications/Atitle"; 

7. Under the "{/*Publications*/}" comment add the following code:

        <Route path="/Atitle" component={Atitle}>
            <Atitle />
        </Route>

## Add a new Teaching/Lecture in the "Teaching/Lecture" Tab

1. Inside public folder, create a file "Atitle.md". Add your Teaching/Lecture content.
2. Open src/Components/Teaching.json
3. In the top of the JSON object add a new element in the following format:

        {"title": "Teaching/Lecture Title", "tags": "#teaching #tag", "date": "Jan 01, 2021", "url": "Atitle", "description": "A_description", "imageUrl": "anImageSourceURL"},
    
4. Open src/Components/Teaching folder
5. Create a new file "Atitle.js" and insert the following code:

        import React, { useState } from 'react';
        import ReactMd from 'react-md-file';

        const Atitle = () => {
            return(
                <div className="App">
                    <div className="content-container">
                        <ReactMd fileName="./Atitle.md" />
                    </div>
                </div>
            )
        }

        export default Atitle; 

6. Open src/App.js. Under the "//teachings" comment insert:

        import Atitle from "./Components/Teachings/Atitle"; 

7. Under the "{/*Teachings*/}" comment add the following code:

        <Route path="/Atitle" component={Atitle}>
            <Atitle />
        </Route>

<hr></hr>

© 2020 Noah Beamon