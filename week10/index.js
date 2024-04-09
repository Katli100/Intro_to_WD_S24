function convertTemperature() {
    // Get input values
    let temperature = parseFloat(document.getElementById('temperatureInput').value);
    let fromUnit = document.getElementById('fromUnit').value;
    let toUnit = document.getElementById('toUnit').value;
    
    // Check if the input temperature is valid
    if (isNaN(temperature)) {
        document.getElementById('result').innerText = "Please enter a valid temperature.";
        return;
    }

    // Convert temperature
    let convertedTemperature;
    if (fromUnit === "Celsius") {
        if (toUnit === "Fahrenheit") {
            convertedTemperature = (temperature * 9/5) + 32;
        } else if (toUnit === "Kelvin") {
            convertedTemperature = temperature + 273.15;
        } else {
            convertedTemperature = temperature;
        }
    } else if (fromUnit === "Fahrenheit") {
        if (toUnit === "Celsius") {
            convertedTemperature = (temperature - 32) * 5/9;
        } else if (toUnit === "Kelvin") {
            convertedTemperature = (temperature - 32) * 5/9 + 273.15;
        } else {
            convertedTemperature = temperature;
        }
    } else if (fromUnit === "Kelvin") {
        if (toUnit === "Celsius") {
            convertedTemperature = temperature - 273.15;
        } else if (toUnit === "Fahrenheit") {
            convertedTemperature = (temperature - 273.15) * 9/5 + 32;
        } else {
            convertedTemperature = temperature;
        }
    }

    // Display result
    document.getElementById('result').innerText = `${temperature} ${fromUnit} is ${convertedTemperature.toFixed(2)} ${toUnit}`;
}
