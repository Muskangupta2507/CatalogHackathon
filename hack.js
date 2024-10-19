function decodeValue(value, base) {
    return parseInt(value, base);
}

// Lagrange Interpolation to find the constant term (c)
function lagrangeInterpolation(points, k) {
    let result = 0;

    points.forEach(([xi, yi], i) => {
        let term = yi;
        points.forEach(([xj], j) => {
            if (i !== j) {
                term *= -xj / (xi - xj);
            }
        });
        result += term;
    });
    return result;
}

function findSecret(jsonInput) {
    const jsonInpu= document.getElementById('jsonInput').value;
    
    try{
        const data = JSON.parse(jsonInpu);
        const n = data.keys.n; 
        const k = data.keys.k; 
        
        const points = [];

        Object.keys(data).forEach(key => {
            if (key === 'keys') return;
            const x = parseInt(key);
            const base = parseInt(data[key].base);
            const value = data[key].value;
            const y = decodeValue(value, base);
            points.push([x, y]);
        });
        const secret = lagrangeInterpolation(points, k);
        document.getElementById('result').textContent = "The secret constant term c is: " + secret;
    } catch (error) {
        document.getElementById('result').textContent = "Invalid input. Please provide correct JSON input.";
    }
}


// // Example1
// const jsonInput = `
// {
//     "keys": {
//         "n": 4,
//         "k": 3
//     },
//     "1": {
//         "base": "10",
//         "value": "4"
//     },
//     "2": {
//         "base": "2",
//         "value": "111"
//     },
//     "3": {
//         "base": "10",
//         "value": "12"
//     },
//     "6": {
//         "base": "4",
//         "value": "213"
//     }
// }
// `;

// const secret = findSecret(jsonInput);
// console.log("The secret constant term c is: " + secret);
