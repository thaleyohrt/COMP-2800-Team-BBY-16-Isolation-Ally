//login function
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPasswordInput").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                document.location.href = "menu.html";
            } else {
                console.log("Enter you info");
            }
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        })
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
                        email: user.email
                    }).then(function () {
                        console.log("New user added to firestore");
                        $('#modal-signup').modal('hide');
                        let sc = db.collection("users").doc(user.uid).collection("highScore").doc("score");
                        sc.set({
                            score: "0"
                        });
                        document.location.href = "menu.html";
                    })
                } else {

                }
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            })
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
    document.location.href = "leaderboard.html";
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
