ResumeGPT – AI-Enhanced Resume Editor

Hi! This is a project I built called ResumeGPT. It's a frontend tool that helps improve resumes in real time using JavaScript logic and a dynamic UI. I created this project to improve my React skills and to explore how simple rule-based logic can help make resumes stronger.

What I Built:

A web app where users can upload or paste their resume

It finds and highlights vague or weak phrases in the resume

It gives better alternatives and rewrites the resume automatically

It shows a side-by-side view of the original and rewritten resume

Users can also paste a job description, and the app shows what keywords are missing from their resume

There's a score system that gives a score out of 100 based on how strong the resume is

I built a smart sidebar that shows insights, suggestions, and a heatmap of the first 30 words

The app supports light and dark mode and includes a modern login screen

How I Built It:

I used React.js for the UI and Tailwind CSS for styling

For file uploads, I used libraries like pdfjs and mammoth to extract text from PDF and Word files

I created a set of rules in a separate file (enhancementRules.js) that checks for weak phrases and gives stronger replacements

The logic finds those phrases in the resume, highlights them, and shows a tooltip explaining what to improve

I added logic to rewrite the resume with clearer, action-oriented phrases

For JD matching, I extract keywords from the job description and compare them with the resume content

I calculate a match score and list missing terms

I built a score system and insights panel that updates live

I used localStorage for simple login/logout and routing with react-router-dom to switch between the login screen and the editor

What I Learned:

Parsing text from multiple file formats

Managing React state and dynamic UI updates

Creating helpful, interactive UI elements like tooltips and heatmaps

Handling real-time rewriting and dual-view layouts

Building a functional login screen using localStorage

Designing with Tailwind CSS to make the UI look futuristic and clean

Demo Login:

Email: user@example.com
Password: password
