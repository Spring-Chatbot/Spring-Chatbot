import React from "react";
import "../css/ConversationStyle.css";
import $ from "jquery";
import firebase from "../firebase.js"

export default function Conversation() {
	var phase = 1;

    function thankUser() {
            document.getElementById("ContainerBox")!.style.display = "none";
            document.getElementById("Buttons")!.style.display = "none";
            document.getElementById("Welcome")!.style.display = "none";
            document.getElementById("thankyou")!.style.display = "block";
			firebase.auth().signOut();
			console.log("signout");
    }

    function appendUserConvo() {
        const userComment = (document.getElementById(
            "ConvoUserInput"
        )! as HTMLTextAreaElement).value;
		document.getElementById("ConvoHistory")!.innerHTML +=
			"<p id='UserComment'>" + userComment + "</p>";
        
		function findHighestScore(list:any) {
			var highest = list[0];
			var highestIndex = 0;
			for (var x=1;x<list.length;x++) {
				if (list[x]>highest) {
					highest = list[x];
					highestIndex = x;
				}
			}
			var results = [highest, highestIndex];
			return results;
		}
    
		var greet = ["Hello!", "Hi!", "Greetings!", "Hola!", "Good day to you!", " Hey, how are you?"];
		var farewell = ["Good Bye!", "Bye!", "See you later!", "Lets talk again sometime!", "See you soon!", "Farewell!", "Adios!"];
		var interrupted = ["Leaving so soon?", "Awe, we were getting somewhere.", "Already leaving?"];
		var nullResponse = ["I didn't catch that. Can you say that again?", "Did you say something?", "Hello? Are you there?"];

		//All emotions and their keywords
		var happy = ["happy", "joy", "joyful", "cheerful", "chipper", "excited", "relaxed"];
		var angry = ["mad", "anger", "angry", "furious", "agitated", "resentful", "infuriated", "rage", "enraged", "indignant"];
		var sad = ["sad", "blue", "down", "despondent", "discouraged", "gloomy", "sorrow", "sorrowful", "miserable", "unhappy"];
		var fear = ["scared", "fear", "fearful", "anxious", "nervous", "frightened", "terrified"];
		var depression = ["depressed", "downcast", "unmotivated", "uninterested", "disinterested"];
		var emotions = [happy, angry, sad, fear, depression];

		//Reasons for Anger
		var angryUserIsFrustrated = ["frustrated", "annoyed", "irritated", "jilted", "unsatisfied"];
		var angryUserIsGrieving = ["grieving", "mourning", "lost", "loss", "lament"];
		var angryUserHasAngerIssues = ["always", "constantly", "constant", "often", "usually"];
		var userIsAngry = [angryUserIsFrustrated, angryUserIsGrieving, angryUserHasAngerIssues];

		//Reasons for Sadness
		var sadUserIsDepressed = ["depressed", "unmotivated", "despondent", "discouraged", "downcast", "gloomy", "dejected", "crestfallen"];
		var sadUserIsGrieving = ["grieving", "loss", "lost", "mourning", "lament"];
		var sadUserHasNoReason = ["unsure", "uncertain"];
		var userIsSad = [sadUserHasNoReason, sadUserIsDepressed, sadUserIsGrieving];

		//Reasons for Fear
		var scaredUserHasPanicAttack = ["sudden", "suddenly", "nowhere"];
		var scaredUserIsAnxious = ["anxious", "nervous", "restless", "distressed", "worried", "dread"];
		var scaredUserIsPhobic = ["hate", "scared", "dislike"];
		var userIsScared = [scaredUserHasPanicAttack, scaredUserIsAnxious, scaredUserIsPhobic];

		//Reasons for Depression
		var depressedUserHasPastTrauma = ["loss", "rape", "ptsd", "hurt", "attacked", "assaulted", "abuse", "abused", "hit", "beaten", "beat"];
		var depressedUserInheritedDepression = ["family", "ancestors", "relatives", "uncle", "aunt", "parents", "dad", "father", "mom", "mother", "inherited", "genes", "genetics", ];
		var depressedUserAbusesDrugs = ["drugs", "meth", "methamphetamine", "cocain", "crack", "tobacco", "smoke", "weed", "inject", "snort"];
		var userIsDepressed = [depressedUserHasPastTrauma, depressedUserInheritedDepression, depressedUserAbusesDrugs];

        var statement = userComment.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        var words = statement.split(" ");
		console.log(words);

        console.log("Current phase is " + phase);
        if (phase==0) {
            document.getElementById("ConvoHistory")!.innerHTML += 
				"<p id='TherabotComment'>Oh, you have something else to say?</p>";
        }
        else if (words.length==0) {
            const randomRank = Math.floor((Math.random() * nullResponse.length));
            console.log("Empty input.");
            document.getElementById("ConvoHistory")!.innerHTML += 
				"<p id='TherabotComment'>"+nullResponse[randomRank]+"</p>";
        }
        else if (words.includes("HELLO") || words.includes("HI")) {
			console.log("User greeted bot.");
            const randomRank = Math.floor((Math.random() * greet.length));
            document.getElementById("ConvoHistory")!.innerHTML += 
				"<p id='TherabotComment'>"+greet[randomRank]+"</p>";
        }
        else if (words.includes("GOODBYE") || words.includes("BYE") || words.includes("FAREWELL") || userComment.search("See you later")>-1) {
			console.log("User says farewell.");
			if (phase!=1) {
                const randomRank = Math.floor((Math.random() * interrupted.length));
                document.getElementById("ConvoHistory")!.innerHTML += 
					"<p id='TherabotComment'>"+interrupted[randomRank]+"</p>";
                phase = 0;
            }
            else {
                const randomRank = Math.floor((Math.random() * farewell.length));
                document.getElementById("ConvoHistory")!.innerHTML += 
					"<p id='TherabotComment'>"+farewell[randomRank]+"</p>";
            }
			phase = 0;
        }
        else if (phase==1) {           
            var feelingChoice;                
            var negative = 0;
            var feelingScores = [0,0,0,0,0];
            for (var e in emotions) { 
                negative = 0; 
                for (var w in words) {
                    if (words[w]=="NOT" || words[w]=="DON'T") {
                        negative += 1;
                    }                
                    else {
						for (var e in emotions) {
							for (var k in emotions[e]) {
								if (words[w]==emotions[e][k].toUpperCase()) {                        
									if (negative>0) {
										feelingScores[e]--;
										negative--;
									}
									else {
										feelingScores[e]++;
									}
								}
							}
						}
					}
                }
            }
            feelingChoice = findHighestScore(feelingScores);
            if (feelingChoice[0]==0) {
                document.getElementById("ConvoHistory")!.innerHTML += 
					"<p id='TherabotComment'>I'm not sure what you mean. Can you rephrase that?</p>";
            }
            else {
                switch(feelingChoice[1]) {
                    case 0: 
                        phase = 2;
                        document.getElementById("ConvoHistory")!.innerHTML +=
							"<p id='TherabotComment'>Describe your happiness.</p>";
                        break;
                    case 1: 
                        phase = 3;
                        document.getElementById("ConvoHistory")!.innerHTML +=
							"<p id='TherabotComment'>Describe your anger. What is making you angry?</p>";
                        break;
                    case 2: 
                        phase = 4;
                        document.getElementById("ConvoHistory")!.innerHTML +=
							"<p id='TherabotComment'>Describe your sadness. What is making you sad?</p>";
                        break;
                    case 3: 
                        phase = 5;
                        document.getElementById("ConvoHistory")!.innerHTML +=
							"<p id='TherabotComment'>Describe your fear. What is scaring you?</p>";
                        break;
                    case 4:
                        phase = 6;
                        document.getElementById("ConvoHistory")!.innerHTML +=
							"<p id='TherabotComment'>Depression is serious, but can be fixed. Can you describe the circustances surrounding your depression?</p>";
                        break;
                }
            }    
        }
        //Why is user happy?
        else if (phase==2) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT HAPPY")>-1) {
                phase = 1;
                document.getElementById("ConvoHistory")!.innerHTML +=
					"<p id='TherabotComment'>That's too bad. How do you actually feel?</p>";
            }
            else {
                phase = 1;
                document.getElementById("ConvoHistory")!.innerHTML +=
					"<p id='TherabotComment'>I am glad you feel this way!</p>";
            }
        }
        //Why is user angry?
        else if (phase==3) {            
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT ANGRY")>-1) {
                phase = 1;
                document.getElementById("ConvoHistory")!.innerHTML +=
					"<p id='TherabotComment'>Alright then. How do you actually feel?</p>";
            }
            else {
                var responseScores = [0,0,0];
                for (var u in userIsAngry) { 
                    negative = 0; 
                    for (var w in words) {               
                        for (var k in userIsAngry[u]) {                                                            
                            if (words[w]==userIsAngry[u][k].toUpperCase()) {                        
                                responseScores[u]++;
                            }
                        }

                    }
                }                
                const responseChoice = findHighestScore(responseScores);
                if (responseChoice[0]==0) {
                    document.getElementById("ConvoHistory")!.innerHTML +=
						"<p id='TherabotComment'>I'm not sure what you mean.</p>";
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User is frustrated.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to be frustrated.</p>";
                            phase = 0;
                            break;
                        case 1:
                            console.log("User is grieving.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to be grieving.</p>";
                            phase = 0;
                            break;
                        case 2:
                            console.log("User has anger issues.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to have anger issues.</p>";
                            phase = 0;
                            break;
                    }
                }
            }
        }
        //Why is user sad?
        else if (phase==4) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT SAD")>-1) {
                phase = 1;
                document.getElementById("ConvoHistory")!.innerHTML +=
					"<p id='TherabotComment'>Alright then. How do you actually feel?</p>";
            }
            else {
                var responseScores = [0,0,0];
                for (var u in userIsSad) { 
                    negative = 0; 
                    for (var w in words) {               
                        for (var k in userIsSad[u]) {                                                            
                            if (words[w]==userIsSad[u][k].toUpperCase()) {                        
                                responseScores[u]++;
                            }
                        }

                    }
                }
                const responseChoice = findHighestScore(responseScores);
                if (responseChoice[0]==0) {
                    document.getElementById("ConvoHistory")!.innerHTML +=
						"<p id='TherabotComment'>I'm not sure what you mean.</p>";
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User has medical issues.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to have medical issues.</p>";
                            phase = 0;
                            break;
                        case 1:
                            phase = 6;
                            console.log("User is depressed.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>Your sadness might actually be depression. Can you describe the circumstances surrounding your depression?</p>";
                            break;
                        case 2:
                            console.log("User is grieving.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to be grieving.</p>";
                            phase = 0;
                            break;
                    }
                } 
            }
        }
        //Why is user scared?
        else if (phase==5) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT SCARED")>-1) {
                phase = 1;
                document.getElementById("ConvoHistory")!.innerHTML +=
					"<p id='TherabotComment'>Alright then. How do you actually feel?</p>";
            }
            else {
                var responseScores = [0,0,0];
                for (var u in userIsScared) { 
                    negative = 0; 
                    for (var w in words) {               
                        for (var k in userIsScared[u]) {                                                            
                            if (words[w]==userIsScared[u][k].toUpperCase()) {                        
                                responseScores[u]++;
                            }
                        }

                    }
                }
                const responseChoice = findHighestScore(responseScores);
                if (responseChoice[0]==0) {
                    document.getElementById("ConvoHistory")!.innerHTML +=
						"<p id='TherabotComment'>I'm not sure what you mean.</p>";
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User has panic attacks.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to have panic attacks.</p>";
                            phase = 0;
                            break;
                        case 1:
                            console.log("User is anxious.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to be anxious.</p>";
                            phase = 0;
                            break;
                        case 2:
                            console.log("User has a phobia.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to have a phobia.</p>";
                            phase = 0;
                            break;
                    }
                } 
            }
        }
        //Why is user depressed?
        else if (phase==6) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT DEPRESSED")>-1) {
                phase = 1;
                document.getElementById("ConvoHistory")!.innerHTML +=
					"<p id='TherabotComment'>Alright then. How do you actually feel?</p>";
            }
            else {
                var responseScores = [0,0,0];
                for (var u in userIsDepressed) { 
                    negative = 0; 
                    for (var w in words) {               
                        for (var k in userIsDepressed[u]) {                                                            
                            if (words[w]==userIsDepressed[u][k].toUpperCase()) {                        
                                responseScores[u]++;
                            }
                        }
    
                    }
                }
                const responseChoice = findHighestScore(responseScores);
                if (responseChoice[0]==0) {
                    document.getElementById("ConvoHistory")!.innerHTML +=
						"<p id='TherabotComment'>I'm not sure what you mean</p>";
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User has past trauma.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You might have some unresolved past trauma. It might be beneficial to discuss these with a therapist or loved one.</p>";
                            phase = 0;
                            break;
                        case 1:
                            console.log("User family has history of depression.");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>Depression may run in your family. It might be best to seek medical help.</p>";
                            phase = 0;
                            break;
                        case 2:
                            console.log("User abuses drugs");
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>Your depression may be linked to your drug use. Thirty-percent of drug users experience depression. It might be best to stop use until you recover from your depression.</p>";
                            phase = 0;
                            break;
                    }
                } 
            }
        }
		
        $("#ConvoHistory").scrollTop($("#ConvoHistory")[0].scrollHeight);
        $("#ConvoUserInput").val("");
    }

    return (
        <div>
            <h1 id="Welcome">Welcome to Therabot</h1>
            <div id="ContainerBox">
                <textarea
                    id="ConvoUserInput"
                    placeholder="What's on your mind?"
                    defaultValue={""}
                />
                <div id="ConvoHistory" />
            <div id="Buttons">
                <button id="LeaveRoom" type="button" onClick={thankUser}>
                    Leave Chatroom
                </button>
                <button
                    id="UserSubmitConvo"
                    type="button"
                    onClick={appendUserConvo}
                >
                    Submit
                </button>
            </div>
		</div>
            <div id="thankyou" style={{ display: "none" }}>
                <p>Thank you for using Therabot!</p>
            </div>
        </div>
    );
}
