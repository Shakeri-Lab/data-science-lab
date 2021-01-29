# Documentation

Published January 14, 2021


## Production Link

[Production Link](https://shakeriresearchgroup.vercel.app/)

## Summary

This project is a resource website which includes web applications and lab information for the Shakeri Research Group.

## Run this project locally

1. Make sure that Javascript is installed on your machine. You can install Node.js [here](https://nodejs.org/en/). 
2. Clone this repository ("git clone https://github.com/Shakeri-Lab/data-science-lab") using your terminal. If you are not using a unix OS (Mac or Linux) and don't already have a unix terminal emulator; [install git bash here](https://git-scm.com/downloads). 
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

## Edit the website Home Screen
### Site description (upper text)

Open src/Components/Home.md

### Alert (lower left text)

Open src/Components/Alert.md

### News (lower left text)

Open src/Components/News.md

## Edit the Blog Tab

Open src/Components/Blog.md

## Edit the Contact Tab

Open src/Components/Contact.md

## Add a personal bio

1. Inside src/Components/Personnel folder, create a file "FirstnameLastname.md". Add your bio content.
2. Inside src/Components/Personnel create a file "FirstnameLastname.js":

            import React, { useState, useEffect } from 'react';
            import ReactMarkdown from 'react-markdown'
            import MarkdownPath from "./FirstnameLastname.md"

            const FirstnameLastname = () => {
                var[text, setText] = useState(null)
                useEffect(() => {
                    fetch(MarkdownPath).then((response) => response.text()).then((text) => {
                        setText(text); 
                    })
                }, []);

                return(
                    <div className="App">
                        <div style={{margin: 20, textAlign: "left"}}>
                            <ReactMarkdown source={text} />
                        </div>
                    </div>
                )
            }

            export default FirstnameLastname; 

3. Open src/Components/Personnel.js. At line 36 inside the "BrowserView" and first "div" tags insert:

            <div style={{display: "flex", flexDirection: "column", backgroundColor: "whitesmoke", borderRadius: 10, margin: 20, width: 250, cursor: "pointer"}}
            onMouseClick={() => {
                window.location.href = "FirstnameLastname"
            }}
            >
                <img style={{borderRadius: 10, height: 250}} src="A_LINK_TO_YOUR_PROFILE_PHOTO" />
                <div style={{padding: 5}}>
                    <strong>Firstname Lastname</strong>
                    <p>WHAT YOU DO | INSTITUTION</p>
                </div>
            </div>

4. At line 63 inside the "MobileView" and first "div" tags insert:

             <div style={{borderRadius: 10, margin: 20}}
                onClick={() => {
                    window.location.href = "FirstnameLastname"
                }}
                >
                <img style={{borderRadius: 10, height: 250}} src="A_LINK_TO_YOUR_PROFILE_PHOTO"/>
                <div style={{padding: 5}}>
                    <strong>Firstname Lastname</strong>
                    <p>WHAT YOU DO | INSTITUTION</p>
                </div>
            </div>

5. Open src/App.js. Under the "//personnel" comment at line 25 insert:

        import FirstnameLastname from "./Components/Personnel/FirstnameLastname"; 

6. Under the "{/*Personnel*/}" comment at line 61 insert:

          <Route path="/FirstnameLastname" component={FirstnameLastname}>
            <FirstnameLastname />
          </Route>

## Add a new Project in the "Project" Tab

1. Inside src/Components/Projects folder, create a file "AProjectTitle.md". Add your project content.
2. Open src/Components/Projects.json. In the top of the JSON object add a new element in the following format:

            {"title": "Project_Title", "description": "A_description", "tags": "#project #tag", "url": "Atitle", "imageUrl": "anImageSourceURL"},
    
3. Open src/Components/Projects folder. Create a new file "AProjectTitle.js":

            import React, { useState, useEffect } from 'react';
            import ReactMarkdown from 'react-markdown'
            import MarkdownPath from "./AProjectTitle.md"

            const AProjectTitle = () => {
                var[text, setText] = useState(null)
                useEffect(() => {
                    fetch(MarkdownPath).then((response) => response.text()).then((text) => {
                        setText(text); 
                    })
                }, []);

                return(
                    <div className="App">
                        <div style={{margin: 20, textAlign: "left"}}>
                            <ReactMarkdown source={text} />
                        </div>
                    </div>
                )
            }

            export default AProjectTitle; 

4. Open src/App.js. Under the "//projects" comment at line 14 insert:

        import AProjectTitle from "./Components/Projects/AProjectTitle"; 

5. Under the "{/*Projects*/}" comment at line 43 insert:

        <Route path="/AProjectTitle" component={AProjectTitle}>
            <AProjectTitle />
        </Route>

## Add a new Publication in the "Publication" Tab

1. Inside src/Components/Publications folder, create a file "APublicationTitle.md". Add your publication content.
2. Open src/Components/Publications.json. In the top of the JSON object add a new element in the following format:

        {"title": "Publication_Title", "journal": "Journal Name", "year": "YYYY", "url": "Atitle", "description": "A_description", "imageUrl": "anImageSourceURL"},
    
3. Open src/Components/Publications folder and create a new file "APublicationTitle.js" and insert the following code:

            import React, { useState, useEffect } from 'react';
            import ReactMarkdown from 'react-markdown'
            import MarkdownPath from "./APublicationTitle.md"

            const APublicationTitle = () => {
                var[text, setText] = useState(null)
                useEffect(() => {
                    fetch(MarkdownPath).then((response) => response.text()).then((text) => {
                        setText(text); 
                    })
                }, []);

                return(
                    <div className="App">
                        <div style={{margin: 20, textAlign: "left"}}>
                            <ReactMarkdown source={text} />
                        </div>
                    </div>
                )
            }

            export default APublicationTitle; 

4. Open src/App.js. Under the "//publications" comment at line 19 insert:

        import APublicationTitle from "./Components/Publications/APublicationTitle"; 

5. Under the "{/*Publications*/}" comment at line 53 insert:

        <Route path="/APublicationTitle" component={APublicationTitle}>
            <APublicationTitle />
        </Route>

## Add a new Teaching/Lecture in the "Teaching/Lecture" Tab

1. Inside src/Components/Teaching folder, create a file "ATeachingTitle.md". Add your Teaching/Lecture content.
2. Open src/Components/Teaching.json. In the top of the JSON object add a new element in the following format:

        {"title": "Teaching/Lecture Title", "tags": "#teaching #tag", "date": "Jan 01, 2021", "url": "Atitle", "description": "A_description", "imageUrl": "anImageSourceURL"},
    
3. Open src/Components/Teaching folder. Create a new file "ATeachingTitle.js" and insert the following code:

        import React, { useState } from 'react';
        import ReactMd from 'react-md-file';

        const ATeachingTitle = () => {
            return(
                <div className="App">
                    <div className="content-container">
                        <ReactMd fileName="./ATeachingTitle.md" />
                    </div>
                </div>
            )
        }

        export default ATeachingTitle; 

4. Open src/App.js. Under the "//teaching" comment at line 22 insert:

        import Atitle from "./Components/Teachings/ATeachingTitle"; 

5. Under the "{/*Teaching/Lectures*/}" comment at line 57 insert:

        <Route path="/ATeachingTitle" component={ATeachingTitle}>
            <ATeachingTitle />
        </Route>

<hr></hr>

© 2020 Noah Beamon