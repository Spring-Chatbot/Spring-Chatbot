export const therabot = (userComment: string, phase: number)=>{
	let negative = 0;
	
    function findHighestScore(list : number[]) : [number, number] {
	  const max = Math.max(...list);
	  return [max, list.indexOf(max)]
	}
    
		const greet = ["Hello!", "Hi!", "Greetings!", "Hola!", "Good day to you!", " Hey, how are you?"];
		const farewell = ["Good Bye!", "Bye!", "See you later!", "Lets talk again sometime!", "See you soon!", "Farewell!", "Adios!"];
		const interrupted = ["Leaving so soon?", "Awe, we were getting somewhere.", "Already leaving?"];
		const nullResponse = ["I didn't catch that. Can you say that again?", "Did you say something?", "Hello? Are you there?"];

		//All emotions and their keywords
		const happy = ["happy", "joy", "joyful", "cheerful", "chipper", "excited", "relaxed"];
		const angry = ["mad", "anger", "angry", "furious", "agitated", "resentful", "infuriated", "rage", "enraged", "indignant"];
		const sad = ["sad", "blue", "down", "despondent", "discouraged", "gloomy", "sorrow", "sorrowful", "miserable", "unhappy"];
		const fear = ["scared", "fear", "fearful", "anxious", "nervous", "frightened", "terrified"];
		const depression = ["depressed", "downcast", "unmotivated", "uninterested", "disinterested"];
		const emotions = [happy, angry, sad, fear, depression];

		//Reasons for Anger
		const angryUserIsFrustrated = ["frustrated", "annoyed", "irritated", "jilted", "unsatisfied"];
		const angryUserIsGrieving = ["grieving", "mourning", "lost", "loss", "lament"];
		const angryUserHasAngerIssues = ["always", "constantly", "constant", "often", "usually"];
		const userIsAngry = [angryUserIsFrustrated, angryUserIsGrieving, angryUserHasAngerIssues];

		//Reasons for Sadness
		const sadUserIsDepressed = ["depressed", "unmotivated", "despondent", "discouraged", "downcast", "gloomy", "dejected", "crestfallen"];
		const sadUserIsGrieving = ["grieving", "loss", "lost", "mourning", "lament"];
		const sadUserHasNoReason = ["unsure", "uncertain"];
		const userIsSad = [sadUserHasNoReason, sadUserIsDepressed, sadUserIsGrieving];

		//Reasons for Fear
		const scaredUserHasPanicAttack = ["sudden", "suddenly", "nowhere"];
		const scaredUserIsAnxious = ["anxious", "nervous", "restless", "distressed", "worried", "dread"];
		const scaredUserIsPhobic = ["hate", "scared", "dislike"];
		const userIsScared = [scaredUserHasPanicAttack, scaredUserIsAnxious, scaredUserIsPhobic];

		//Reasons for Depression
		const depressedUserHasPastTrauma = ["loss", "rape", "ptsd", "hurt", "attacked", "assaulted", "abuse", "abused", "hit", "beaten", "beat"];
		const depressedUserInheritedDepression = ["family", "ancestors", "relatives", "uncle", "aunt", "parents", "dad", "father", "mom", "mother", "inherited", "genes", "genetics", ];
		const depressedUserAbusesDrugs = ["drugs", "meth", "methamphetamine", "cocain", "crack", "tobacco", "smoke", "weed", "inject", "snort"];
		const userIsDepressed = [depressedUserHasPastTrauma, depressedUserInheritedDepression, depressedUserAbusesDrugs];

        const statement = userComment.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const words = statement.split(" ");

        if (phase==0) {
            document.getElementById("ConvoHistory")!.innerHTML += 
				"<p id='TherabotComment'>Oh, you have something else to say?</p>";
			phase = 1;
        }
        else if (words.length==0) {
            const randomRank = Math.floor((Math.random() * nullResponse.length));
            document.getElementById("ConvoHistory")!.innerHTML += 
				"<p id='TherabotComment'>"+nullResponse[randomRank]+"</p>";
        }
        else if (words.includes("HELLO") || words.includes("HI")) {
            const randomRank = Math.floor((Math.random() * greet.length));
            document.getElementById("ConvoHistory")!.innerHTML += 
				"<p id='TherabotComment'>"+greet[randomRank]+"</p>";
        }
        else if (words.includes("GOODBYE") || words.includes("BYE") || words.includes("FAREWELL") || userComment.search("See you later")>-1) {
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
            let feelingChoice;                
            
            let feelingScores = [0,0,0,0,0];
            for (let e in emotions) { 
                negative = 0; 
                for (let w in words) {
                    if (words[w]=="NOT" || words[w]=="DON'T") {
                        negative += 1;
                    }                
                    else {
						for (let e in emotions) {
							for (let k in emotions[e]) {
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
                let responseScores = [0,0,0];
                for (let u in userIsAngry) { 
                    negative = 0; 
                    for (let w in words) {               
                        for (let k in userIsAngry[u]) {                                                            
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
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to be frustrated.</p>";
                            phase = 0;
                            break;
                        case 1:
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to be grieving.</p>";
                            phase = 0;
                            break;
                        case 2:
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
                let responseScores = [0,0,0];
                for (let u in userIsSad) { 
                    negative = 0; 
                    for (let w in words) {               
                        for (let k in userIsSad[u]) {                                                            
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
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to have medical issues.</p>";
                            phase = 0;
                            break;
                        case 1:
                            phase = 6;
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>Your sadness might actually be depression. Can you describe the circumstances surrounding your depression?</p>";
                            break;
                        case 2:
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
                let responseScores = [0,0,0];
                for (let u in userIsScared) { 
                    negative = 0; 
                    for (let w in words) {               
                        for (let k in userIsScared[u]) {                                                            
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
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to have panic attacks.</p>";
                            phase = 0;
                            break;
                        case 1:
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You seem to be anxious.</p>";
                            phase = 0;
                            break;
                        case 2:
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
                let responseScores = [0,0,0];
                for (let u in userIsDepressed) { 
                    negative = 0; 
                    for (let w in words) {               
                        for (let k in userIsDepressed[u]) {                                                            
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
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>You might have some unresolved past trauma. It might be beneficial to discuss these with a therapist or loved one.</p>";
                            phase = 0;
                            break;
                        case 1:
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>Depression may run in your family. It might be best to seek medical help.</p>";
                            phase = 0;
                            break;
                        case 2:
                            document.getElementById("ConvoHistory")!.innerHTML +=
								"<p id='TherabotComment'>Your depression may be linked to your drug use. Thirty-percent of drug users experience depression. It might be best to stop use until you recover from your depression.</p>";
                            phase = 0;
                            break;
                    }
                } 
            }
        }
	return phase;
}