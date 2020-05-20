//login function
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPasswordInput").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                if (db.collection("users").doc(user.uid).score == undefined) {
                    let sc = db.collection("users").doc(user.uid);
                    sc.set({
                        email: user.email,
                        score: 0
                    });
                }
                loadMain();
            } else {
                console.log("Enter you info");
            }
        });
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

//register function
function register() {
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPasswordInput").value;
    let passwordConfirm = document.getElementById("signupPasswordConfirmInput").value;
    if (password == passwordConfirm) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    db.collection("users").doc(user.uid).set({
                        email: user.email,
                        score: 0
                    }).then(function () {
                        console.log("New user added to firestore");
                        $('#modal-signup').modal('hide');
                        loadMain();
                    });
                } else {

                }
            })
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    } else {
        alert("Your passwords don't match");
    }
}

//logout function
function logout() {
    firebase.auth().signOut().then(function () {
        document.location.href = "index.html";
    }).catch(function (error) {
        alert(error.message);
    });
}

//load main
function loadMain() {
    document.location.href = "menu.html";
}

//load game
function loadGame() {
    document.location.href = "game.html";
}

//load leaderboard
function loadLeaderboard() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).get().then(doc => {
                if (doc.data().username == undefined) {
                    $("#modal-username").modal('show');
                } else {
                    document.location.href = "leaderboard.html";
                }
            });
        } else {

        }
    });
}

//load achievement-list
function loadAchievementList() {
    document.location.href = "achievement-list.html";
}

//load help
function loadHelp() {
    document.location.href = "help.html";
}

//load about-us
function loadAbout() {
    document.location.href = "about-us.html";
}

function loadGameOver() {
    document.location.href = "game-over.html";
}

function loadEaster() {
    document.location.href = "barrel-roll.html";
}
function loadAchievement1() {document.location.href = "achievement1.html"}
function loadAchievement2() {document.location.href = "achievement2.html"}
function loadAchievement3() {document.location.href = "achievement3.html"}
function loadAchievement4() {document.location.href = "achievement4.html"}

//checks if the user has a username
function checkUsername() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).get().then(doc => {
                if (doc.data().username == undefined) {
                    $("#modal-username").modal('show');
                }
            });
        } else {

        }
    });
}

//adds username to account
function username() {
    let j = document.getElementById("enterUsername").value;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection("users").doc(user.uid).update({
                username: j
            });
        } else {

        }
    });
    $("#modal-username").modal('hide');
}