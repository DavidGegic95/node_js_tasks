function getRandomNumber() {
    let random = Math.floor(Math.random() * 100)
    return `Random number is ${random}`
};

console.log(getRandomNumber());

module.exports = getRandomNumber;
