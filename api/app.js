import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import postRoute from './routes/post.route.js';
import testRoute from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';

const app = express();

app.use(cors({
    origin: '*',
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true
}));



app.options('*', cors({
    origin: '*',
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);

//testing
app.get("/testing", (req,res) => {
    console.log("I am Called");
    res.json({ message: "API is working fine" });
});

//testing
app.get('/',(req,res)=>{
    res.send('API is running...');
})
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(8800,()=>{
    console.log("Server is running! on 8800")
})

export default app;