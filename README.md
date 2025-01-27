# Rick & Morty Character Manager

This is a front-end application built to interact with the Rick & Morty API. The application is implemented using React with TypeScript and leverages several modern tools and libraries to enhance development and user experience. A GitHub Actions workflow is set up to automate the build and testing process.
![rickMorty](https://github.com/user-attachments/assets/afd280c6-7077-482a-86cc-e3a4969a30af)


## Technologies Used:
- React + TypeScript (with Vite),
- Tailwind CSS: https://tailwindcss.com/,
- shadcn/ui: https://ui.shadcn.com/,
- TanStack Query: https://tanstack.com/query/latest,
- TanStack Router: https://tanstack.com/router/latest,
- json-server: https://www.npmjs.com/package/json-server,
- Playwright: https://playwright.dev/

## Functionality:
- Display List of Characters: 
The main view displays a list of characters retrieved from the Rick & Morty API, with an option to open a character in full view in a modal.
- Add Characters to Favorites: Users can add characters to their favorites. 
- Favorites Page: 
A separate page where users can see all their favorite characters, utilizing TanStack Router for navigation.

## Getting Started

- Download Dependencies: To get started with the project, download the dependencies using the following command: npm install

- Run the Application: To run the application locally, use the following command: npm run dev

- Run json-server: To start the json-server for mock data, use: npm run json-server

- Run Tests: To ensure everything is working correctly, execute the tests by running: npm test:h

## CI/CD:
- A GitHub Actions workflow is set up to automate the build and testing process.
- The workflow includes the following steps:
   Execute Build: npm run build.
   Run Playwright Tests: All of the Playwright tests are executed to ensure the application functions correctly.

## Usage

- Displaying Characters: Open the application. The main view will display a list of characters. Click on a character to open it in full view in a modal.

- Adding Characters to Favorites: In the main view, select a character to view its details. Click the "Add to Favorites" button to add the character to your favorites.

- Viewing Favorites: Navigate to the favorites page using TanStack Router. The favorites page will display all characters that have been added to favorites.


  # If you have more details to add or need further assistance, let me know! 😊
