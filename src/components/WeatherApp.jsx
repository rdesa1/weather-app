// components/WeatherApp.jsx

import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Form, Container } from 'react-bootstrap';

const WeatherApp = () => {
     // State variables
     const [searchTerm, setSearchTerm] = useState('');
     const [weatherData, setWeatherData] = useState(null);
     const [error, setError] = useState(null);

     // Default API key
     const API_KEY = '233cacf12ca20c4db467adacd854250d';

     // Handles form submission
     const handleSubmit = (event) => {
          event.preventDefault();
          // Get the city value from the form input
          const city = event.target.elements.city.value.trim();
          // Update search term state
          setSearchTerm(city);
     };

     // Fetch weather data when searchTerm changes
     useEffect(() => {
          const API_Page = 'https://api.openweathermap.org';
          const API_URL = `${API_Page}/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}&units=metric`;

          const fetchData = async () => {
               try {
                    const response = await fetch(API_URL);
                    if (!response.ok) {
                         throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setWeatherData(data);
                    setError(null); // Clear previous errors if any
               } catch (error) {
                    console.error('Error fetching weather data:', error);
                    setWeatherData(null); // Clear previous weather data
                    setError('Could not fetch weather data. Please check the city name and try again.');
               }
          };

          // Only fetch if there's a search term
          if (searchTerm) {
               fetchData();
          }
     }, [searchTerm]);

     return (
          <Container className="mt-5">
               <h1 className="mb-4">Weather App</h1>

               {/* Form to enter city name */}
               <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="city">
                         <Form.Control type="text" placeholder="Enter city name" />
                    </Form.Group>
                    <Button variant="active" type="submit" className="mt-2 rounded-pill px-4">
                         Get Weather
                    </Button>
               </Form>

               {/* Error message if API request fails */}
               {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

               {/* Weather card if data is available */}
               {weatherData && (
                    <Card className="mt-4">
                         <Card.Body>
                              <Card.Title>{weatherData.name}</Card.Title>
                              <Card.Text>
                                   Temperature: {weatherData.main.temp}°C<br />
                                   Weather: {weatherData.weather[0].description}<br />
                                   Humidity: {weatherData.main.humidity}%
                              </Card.Text>
                         </Card.Body>
                    </Card>
               )}
          </Container>
     );
};

export default WeatherApp;
