let local_testing = true;
let requestPrefix;

if(local_testing){
    requestPrefix = "http://127.0.0.1:8000/"
}
else{
    requestPrefix = "http://192.168.1.1:8000/"
}

// Does the acutal request to the server
let sendRequest = (type, url, callback) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            if(xhttp.responseText){
                let dict = JSON.parse(xhttp.responseText)
                callback(dict)
            }
            else{
                callback()
            }
        } 

        //it failed to respond correctly
        else if(xhttp.readyState === 4){
            // alert("failed to do some crap")
        }
    };
    xhttp.open(type, url, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    
    return xhttp
}


const functions = {

    // All the insert functions
    update_drivetrain(data, callback){
        let requestString = requestPrefix + "drive_train?";

        requestString += "x="+data["x"];
        requestString += "&y="+data["y"];
        let xhttp = sendRequest("POST", requestString, callback)
        xhttp.send(JSON.stringify(data));
    },

    update_arm_position(data, callback){
        let requestString = requestPrefix + "arm?";

        requestString += "x="+data["x"];
        requestString += "&y="+data["y"];
        requestString += "&z="+data["z"];
        requestString += "&x_angle="+data["x_angle"]; //side by side
        requestString += "&y_angle="+data["y_angle"]; //up and down
        requestString += "&rotation="+data["rotation"]; //spinning the arm (spinning)

        let xhttp = sendRequest("POST", requestString, callback)
        xhttp.send(JSON.stringify(data));
    }
}


export default functions