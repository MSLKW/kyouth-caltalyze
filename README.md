# Caltalyze

## Project Overview

An AI-powered web app for business managers that need data analysis on their calendar/timeline systems to improve and streamline events and meetings for their employees and clients.

## System Architecture

We have a backend FastAPI server hosted by uvicorn. We also have a website folder that contains the front end. The transipled contents of the website folder will be served to the client, then the client will import their .ics file on the website, which will then send a request to the backend servers. The backend servers will process the .ics file and its data, and ping the ollama server for AI responses for the frontend server to show the analytics and AI summaries.

## Setup & Installation

Instal ollama on host machine and make sure it's running at localhost:11434, if it's not online, use `ollama serve`

Run `uv sync` on root

Go into the website directory. run `npm install` and `npm run build` to build the dist folder website. Then make sure that the `dist` folder is in root

Run `uv run uvicorn backend.main:app --reload` to load up the backend server

**env**

VITE_API_BASE_URL is the environment variable for the website to connect to the backend ai for it's .ics file processing

## Features

Is able to import .ics files for analyzing and ai responses on the data.

Is able to export json analytics to the user.

Is able to provide an analytics dashboard and AI summaries to the user.

## Technical Decisions

FastAPI and uvicorn was chosen as it was learnt in the programme and was deemed suitable for our API and server needs.

ics was the python library we chose to process our icalendar files.

React, Tailwind and Chart.js was used for the frontend for the component resuability architecture of react, the useful utilities-first styling of css. And chart.js for the clean, sleek display of information and analytics.

ollama was used for our AI for reliability as API keys for GEMINI or other remote models were rate limited. While the local models will have less arbitrary errors when responding to requests.

## Limitations

The response times can take some time -- around 1-3 minutes, due to local AI processing.

Overall there could definitely be more improvements, such as docker containerization.

