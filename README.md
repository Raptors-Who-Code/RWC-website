<h1>Raptor's Who Code Website</h1>

<p>The Raptors Who Code Website is a website for the Raptors Who Code Club at Montgomery College!</p>

<img src="https://media.licdn.com/dms/image/v2/D4E2DAQFIIQKzwjbW7w/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1737922158526?e=1739574000&v=beta&t=Kc4pGlkBMmrWa-eKBuNDYDzOkAQgt1N_jwWd1Gc_C90" alt="Landing Page Screenshot" width="600"></img>

<h2>Introduction</h2>
<p>The Raptors Who Code Website is a Next.js and Express.js application that utilizes a PostgreSQL database for efficient querying</p>

<h2>Features</h2>
<ul>
  <li>Register, Login, Logout, Profile View, Account Verification, Password Reset</li>
  <li>Sending emails for account verification and Password Reset</li>
  <li>Frontend Jobs, Events, Login, Register, and Reset Password Pages</li>
  <li>Custom React Hooks to handle auth state and application data</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li>Next.Js</li>
  <li>Express.Js</li>
  <li>TypeScript</li>
  <li>PostgreSQL</li>
  <li>Node.js</li>
  <li>shadcn UI</li>
</ul>

<h2>Project Structure</h2>
<p>The project is structured into frontend and backend directories, with the React project contained within the frontend folder. The backend is managed by Express.js and interacts with MongoDB for data storage.</p>

<h1>API Architecture</h1>

<h2>The api is built using routes, controllers, and services</h2>
<ol>
  <li>Routes are responsible for handling the incoming requests and forwarding them to appropriate controllers</li>
  <li>Controllers validate the request and call the appropriate service</li>
  <li>Services are responsible for handling the business logic. They interact with the database and any external services</li>

<h1>Run Locally</h1>
  <ul>
    <li>Clone the project <code>git clone https://github.com/Raptors-Who-Code/rwc-website.git</code></li>
    <li>Frontend: <code>cd client && npm install</code></li>
    <li>Backend: <code>cd server && npm install</code></li>
  </ul>
  <li>Create a `.env` file in the backend directory and add your environment variables based on the .env.local example in the client and the .env.example in the server</li>
  <li>Start the development server:</li>
  <ul>
    <li>Client: <code>npm run dev</code></li>
    <li>Server: <code>npm run dev<code></li>
  </ul>
</ol>

<h2>Contact</h2>
<p>If you have any questions or want to contribute to the project, feel free to fork and open a pull request</p>
