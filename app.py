import requests, os
from flask import jsonify, Flask, render_template, request
from dotenv import load_dotenv
from datetime import datetime

app = Flask(__name__, template_folder="templates", static_folder="static")

api = os.getenv("api")
hlink = "https://api.openweathermap.org/data/2.5/weather"  


tempdb = {}

img = {
    "clear sky": "../static/images/sun.png",
    "clouds": "../static/images/clouds.png",
    "rain": "/static/images/rain.png",
    "snow": "/static/images/snow.png",
    "hurricane": "/static/images/hurricane.png"
}

def getweather(city):
    link = f"{hlink}?q={city}&appid={api}"
    try:
        response = requests.get(link) #json.load(request.stream)
        return response.json()  
    except requests.exceptions.RequestException as e:
        print(f"Error while fetching data : {e}")
        return None


@app.route("/", methods=["GET", "POST"])
def w():
    if request.method == "POST":
        city = request.json.get("city", "");

        if(tempdb.get("city", "") and (datetime.now() - tempdb["city"]["time"]).seconds < 180):
            return jsonify({"weather": tempdb["city"]});

        else:
            info = getweather(city)
            print(info, end="\n")

            if(not info or not info.get("weather", "")):
                return jsonify({"Error": "Information could not received"}), 400

            else:
                weather = info["weather"][0]["description"]
                print(weather, end="\n")

                if("cloud" in weather):
                    path = img.get("clouds")
                elif("rain" in weather):
                    path = img.get("rain")
                else:
                    path = img.get(weather, img["clear sky"] + " Default")

                tt = {
                    "weather": weather,
                    "path": path,
                    "time": datetime.now()
                    
                }  
                
                print(tt["path"])    

                tempdb[city] = tt

                return jsonify({"weather": tt})

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)




    


    

    



