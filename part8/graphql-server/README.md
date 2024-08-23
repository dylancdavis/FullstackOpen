# Setup
- `npm install`
- Create `.env` in the root `graphql-server` folder
- Add to `.env` the `MONGODB_URI` key, including password (found at Database > Security > Database Access in MongoDB Atlas)
- Add to `.env` the `JWT_SECRET` key. Must be `hunter2` for now.
- Run `node .` to start the server (or, explicitly, `node src/library-backend.js`)