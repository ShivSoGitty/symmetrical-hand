p1 = ""
p2 = ""


Webcam.set({
    width:350,
    height:350,
    img_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function pic(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="picture" src="' + data_uri + '"/>'
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ULKx5IScp/model.json');

function modelLoaded(){
    console.log("Model Loaded!");
}
function speak(){
    var synth = window.SpeechSynthesis;
    s1 = "My first prediction is" + p1
    s2 = "My second prediction is" + p2
    var utterThis = new SpeechSynthesisUtterance (s1 + s2);
    synth.speak(utterThis);
    utterThis.rate = 0.5;
}

function check(){
    img = document.getElementById('picture');
    classifier.classify(img, gotResult);}

    function gotResult(error, results){
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            document.getElementById("zen").innerHTML = results[0].label;
            document.getElementById("zen2").innerHTML = results[1].label;
            p1 = results[0].label;
            p2 = results[1].label;
            speak();
            if(p1 == "Noice"){
                document.getElementById("hand").innerHTML = "👌";
            }
            if(p1 == "Thumbs Up"){
                document.getElementById("uemoji").innerHTML = "👍";
            }
            if(p1 == "Peace"){
                document.getElementById("uemoji").innerHTML = "✌️";

                if(p2 == "Noice"){
                    document.getElementById("uhand2").innerHTML = "👌";
                }
                if(p2 == "Thumbs Up"){
                    document.getElementById("uhand2").innerHTML = "👍";
                }
                if(p2 == "Peace"){
                    document.getElementById("uhand2").innerHTML = "✌️";
                }
            }
            
        }
    }