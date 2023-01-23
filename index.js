const express= require("express")
const app= express()
require("dotenv").config()
const PORT= process.env.PORT_NUNBER|| 5000
const { auth,attemptSilentLogin,requiresAuth } = require('express-openid-connect');
console.log(process.env.ISSUER_BASE_URL)
app.use(
  auth({
    authRequired:false, // if it is true, then it is check every router is authenticated or not
    auth0Logout:true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    // idpLogout: true,
  })
);
// app.use((req, res,next)=>{
//     console.log("hello")
//     next()
// })

console.log("elli")

app.get("/",(req, res)=>{
    // console.log(req)
    return res.send(req.oidc.isAuthenticated()?"loggedIn":"login")
})


app.get("/profile",requiresAuth(),(req, res)=>{
    try {
        return res.json(req.oidc.user)
    } catch (err) {
        return res.send("not authenticated")        
    }
})




app.listen(PORT,(err)=>{
    if(err){
        console.log(err, "sevver is not start")
    }
    else{
        console.log("server is start at port",`http://localhost:${PORT}`)
    }
})