
    var firebaseConfig = {
    apiKey: "AIzaSyBgZrlTZHEbc0K1V-LnSX_ajaPsIbQBotk",
    authDomain: "train-76f2b.firebaseapp.com",
    databaseURL: "https://train-76f2b.firebaseio.com",
    projectId: "train-76f2b",
    storageBucket: "train-76f2b.appspot.com",
    messagingSenderId: "504031947655",
    appId: "1:504031947655:web:d45a192466db34e9"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var trainname = "";
var destination = "";
var firsttime = "";
var frequency = "";


$(".add-train").on("click", function () {
    database.ref().push({
        trainname: "",
        destination: "",
        firstTraintime: "",
        frequency: "",

        })
    })

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        trainname = childSnapshot.val().trainname;
        destination = childSnapshot.val().destination
        firsttime = childSnapshot.val().firsttime;
        frequency = childSnapshot.val().frequency;


        var firsttimeMoment = moment(firsttime, "HH:mm");
        console.log("TIME CONVERTED: " + firsttimeMoment);


        var currenttime = moment();
        console.log("Now TIME: " + currenttime);

        var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');
        var minuteLast = minuteArrival % frequency;
        var awayTrain = frequency - minuteLast;

        console.log("Minutes: " + minuteArrival);
        console.log("Minutes Last: " + minuteLast);
        console.log("Away Train: " + awayTrain);

        var nextArrival = currenttime.add(awayTrain, 'minutes');
        var arrivaltime = nextArrival.format("HH:mm");
        console.log("Away Arrival: " + nextArrival);
        console.log("Arrival Time: " + arrivaltime);

        $("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

    });