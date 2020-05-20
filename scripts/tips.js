var tips = ["Face masks while do not effectively protects you from getting sick, it protects you from infecting others. This is still useful to wear one as COVID-19 is asymptomatic and it doesn't hurt to take extra precautions to be safe.",
    "It is important to avoid touching your face and consistently washing your hands to reduce the chance of getting sick.", 
    "Do try to mainain at least 1 metre distance between yourself and others.",
    "Avoid going to crowded places as it is more likely that you will encounter someone who is sick.",
    "COVID-19 is asymptomatic, meaning that you can be infected with it and can still spread it without having any symptoms. It is important, even if you or others seem healthy to still practice proper precautions.",
    "Make sure to follow good respiratory hygiene. This means covering your mouth and nose with your bent elbow or tissue when you cough or sneze.",
    "Self isolate by staying home even when you have common symptoms like coughing or mild fever.",
    "Keep up to date on the latest information from trusted sources, like your local and national health authorities."];

function tipChoice(){
    var decision = Math.floor((Math.random() * (tips.length - 1)));
    document.getElementById("tip").innerHTML = "Tip: " + tips[decision];
}