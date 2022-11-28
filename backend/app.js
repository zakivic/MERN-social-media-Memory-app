import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js'
import postsRoutes from './routes/postRoutes.js'
import commentsRoutes from './routes/commentsRoutes.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use("/users", userRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);


mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`)))
.catch((error) => console.log(error.message));