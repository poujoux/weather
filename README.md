# Weather App

A simple weather application with a **Flask backend** and a **JavaScript frontend** that displays the current weather for selected cities or a manually typed city name using the **OpenWeather API**.

## Features

- **Add Cities**: Manually add cities by typing their names.
- **Weather Display**: View the current weather forecast with an image and descriptive text.
- **Remove Cities**: Remove cities from the page with a single click.
- **Backend API Handling**: The backend securely handles the OpenWeather API key and communicates with the API.

## Setup

### Backend (Flask)
1. **Clone the Repository**:
   ```
   git clone https://github.com/poujoux/weather.git
   cd weather-app
   ```

2. **Set Up a Virtual Environment and Install Dependencies**:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**:
   ```
   Create a .env file in the project root.
   Add your OpenWeather API key:
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```

4. **Run the Flask Server**:
   ```
   flask run
   ```

### Frontend (JavaScript)
1. **Open index.html in your browser.**
2. **The frontend will communicate with the Flask backend to fetch weather data.**

## Usage
1. **Add a City**:
    - Click the plus icon to type a city name.
    - Enter a city name in the input field or select a city from the list, then click Add City.

2. **View Weather Forecast**:
    - The current weather, along with an image and description, will be displayed.

3. **Remove a City**:
    - Click the remove icon to delete a city from the list.

## Dependencies
   ```
    pip3 install -r requirements.txt
   ```

## License
This project is licensed under the MIT License.
