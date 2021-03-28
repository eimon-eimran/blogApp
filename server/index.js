const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use('/posts',postRoutes)
app.use('/user',userRoutes)


const CONNECTION_URL = 'mongodb+srv://mursalinaraf:sabarnof@cluster0.0klvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)}))
.catch((err) => {console.log(err.message)})

mongoose.set('useFindAndModify',false)
