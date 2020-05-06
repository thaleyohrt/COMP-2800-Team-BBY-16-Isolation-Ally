//login function
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPasswordInput").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    }).then(function (){
        document.location.href = "menu.html";
    });
}

//register function
function register() {
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPasswordInput").value;
    let passwordConfirm = document.getElementById("signupPasswordConfirmInput").value;
    if (password == passwordConfirm) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        }).then(function () {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    db.collection("users").doc(user.uid).set({
                        email: user.email
                    }).then(function () {
                        console.log("New user added to firestore");
                        $('#modal-signup').modal('hide');
                        document.location.href = "menu.html";
                    })
                } else {

                }
            });

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