let tips = ["While face masks don't effectively protect you from sickness, masks do protect you from infecting others. As COVID-19 is asymptomatic, it doesn't hurt to take extra precautions to be safe.",
    "It is important to avoid touching your face and to frequently wash your hands to reduce the chance of getting sick.", 
    "While in public, do your best to maintain a distance of at least 2 metres between yourself and others.",
    "Avoid going to crowded places, as it is more likely that you will encounter someone who is sick.",
    "COVID-19 is asymptomatic, which means that you can be infected with it and can spread it to others without having any symptoms yourself. Thus, even if you or others seem healthy, it is important to still practice proper precautions.",
    "Make sure to follow good respiratory hygiene. This means covering your mouth and nose with your bent elbow or a tissue when you cough or sneeze.",
    "Self isolate by staying home even when you have common symptoms like coughing or mild fever.",
    "Keep up to date on the latest information from trusted sources, like your local and national health authorities."];

// Shows a random tip on the Game Over screen.
function tipChoice(){
    let decision = Math.floor((Math.random() * (tips.length - 1)));
    document.getElementById("tip").innerHTML = "Tip: " + tips[decision];
}