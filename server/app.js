const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// =====================================================
// SERVE UPLOADED FILES
// =====================================================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// =====================================================
// ROUTES
// =====================================================

app.use(
    "/patient",
    patientRoutes
);

app.use(
    "/doctor",
    doctorRoutes
);


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.send(
        "Hospital Backend Running"
    );

});


// =====================================================
// MONGODB
// =====================================================

mongoose
    .connect(process.env.MONGO_URL)

    .then(() => {

        console.log(
            "MongoDB Connected"
        );

    })

    .catch((err) => {

        console.error(
            "MongoDB Connection Error:",
            err
        );

    });


// =====================================================
// SERVER
// =====================================================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(
            `Server Running on Port ${PORT}`
        );

    }
);