const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')


app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
require('dotenv/config');


//connect to db
mongoose.connect(process.env.DB_CONNECTION, () => console.log('Connected to db'));

const projectSchema = {
  title: String,
  content: String,
  goal: Number,
  backers: Number,
  days: Number,
};

const Project = mongoose.model("Project", projectSchema);

app.get("/projects", (req, res) => {
  Project.find((err, foundProject) => {
    if (!err) {
      res.send(foundProject);
    } else {
      res.send(err);
    }
  });
});


// app.get("/projects/:news_location", function (req, res) {

//   News.find({ location: req.params.news_location }, function (err, found_news) {
//     if (found_news) {
//       res.send(found_news);
//     } else {
//       res.send("No match found");
//     }
//   });
// });

app.get("/projects/:id", function (req, res) {
  Project.find({ _id: req.params.id }, function (err, found_project) {
    if (!err) {
      res.send(found_project);
    } else {
      res.send(err);
    }
  });
});

app.listen(process.env.PORT || 3001, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



