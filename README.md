# Four Peaks Surgery Center `1.0.62`

Welcome to the repository for the Four Peaks Surgery Center website. The intent of this project is to create a meaningful and informational place where end-users can engage and learn about the services rendered and offered by [Four Peaks Surgery Center](https://fourpeaks-sc.web.app). Also see below to learn about managing site information.

## Dependencies

All Node dependencies can be seen in the [package.json](https://github.com/Bwnr-Pwnr/fourpeaks-sc/blob/master/package.json) file. However, this project makes use of two major frameworks. They will be listed below along with the things they offer to the project!

- React
  - Path routing
  - User experience (UX) and user interface (UI) tools
  - Webpack compilation time
- Firebase
  - Firestore
  - User Authentication
  - Cloud Messaging
  - Server hosting configuration free
  - Domain acquisition *WIP*

Here are the other Node packages:

```JSON
"dependencies": {
    "@emotion/react": "^11.7.1",
    "@emotion/styled": "^11.6.0",
    "@firebase/analytics": "^0.7.7",
    "@material-ui/icons": "^4.11.2",
    "@mui/material": "^5.6.4",
    "@mui/styled-engine-sc": "^5.1.0",
    "@mui/x-data-grid": "^5.7.0",
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "bootstrap": "^5.1.3",
    "crypto": "^1.0.1",
    "crypto-js": "^4.1.1",
    "encrypt-rsa": "^2.0.1",
    "firebase": "^9.6.6",
    "firebase-admin": "^10.0.1",
    "firebase-cli": "^1.2.0",
    "material-ui-icons": "^1.0.0-beta.36",
    "mdbreact": "^5.2.0",
    "nodemailer": "^6.7.3",
    "prompt-sync": "^4.2.0",
    "react": "^17.0.2",
    "react-bootstrap": "^2.0.4",
    "react-dom": "^17.0.2",
    "react-router-dom": "^6.2.1",
    "react-scripts": "^5.0.1",
    "react-simple-star-rating": "^4.0.5",
    "schema-object": "^4.0.11",
    "styled-components": "^5.3.3",
    "uuid": "^8.3.2",
    "web-vitals": "^2.1.2"
  }
  ```
  
## Installation

To install this repository on a new machine...

1. Run `git clone https://github.com/Bwnr-Pwnr/fourpeaks-sc.git`
2. Change working directory `cd fourpeaks-sc`
3. Install node_modules *(not included with repo)* `npm install`
4. Start the local service through react `npm start`
5. Contact the project manager for service-account keys and install them

## Managing Site Information

Learn where to find specific page information, and how to change it if need be. You must be a manager/owner of the Firebase Project in order to follow these instructions.

### About

1. Visit the [Firebase console](https://console.firebase.google.com/project/fourpeaks-sc/overview)
2. Select the `Firestore` option the Firebase `Build` section on the left panel of the console
3. Move to the `Collection` named "`pages`"
4. You will see two documents → `[about, paperwork_page]` 
   1. View the `document fields` on the right and double click to edit whatever information you would like
   2. **Important** → use `<br />` instead of pressing `enter`

### Paperwork

1. Visit the [Firebase console](https://console.firebase.google.com/project/fourpeaks-sc/overview)
2. Navigate to the `Storage` section of the Firebase `Build` section on the left panel of the console
3. Find the PDF files you are looking for and delete them ( **Ensure the new documents ready to upload** )
4. Click the `Upload file` link and upload the new documents
5. Using a separate browser window, open Firestore Database and move to the `pages` collection and select the `paperwork_page` document and view the `papers` field on the right
6. Select the newly uploaded file from the `storage` window and ensure the `Name` is highlighted &amp; underlined blue
7. Right click the `Name` and select `copy link address`
8. Change the corresponding link in the Firestore document's `link` field
9. Repeat steps 6 → 8 for the remaining documents

### Users

Users for this application have the ability to add testimonials and view the collected physician information collected via my medical records software.

#### **Create a User**

1. [Log in](https://fourpeaks-sc.web.app/login) to the [website](https://fourpeaks-sc.web.app/)
2. In the `Admin Toolbox` select the dropdown and click `Create User`
3. Add an email and create a new password for the user
   * You may choose to make them an administrator-privledged user although this has no integrated use, yet

#### **Delete a User**

1. [Log in](https://fourpeaks-sc.web.app/login) to the [website](https://fourpeaks-sc.web.app/)
2. In the `Admin Toolbox` select the dropdown and click `Delete User`
3. Enter the annul email address and press the `red button`
   * This *will* remove access to sites but will *not* revoke the login from being valid
4. Visit the [Firebase console](https://console.firebase.google.com/project/fourpeaks-sc/overview)
5. Navigate to the `Authentication` section of the Firebase `Build` section on the left panel
6. Under the `Users` tab on the top you can view all valid &amp; active logins for the `project`
