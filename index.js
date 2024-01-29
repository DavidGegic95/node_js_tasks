function getRandomNumber() {
    let random = Math.floor(Math.random() * 1000) + 1
    return `Random number is ${random}`
};

console.log(getRandomNumber());

module.exports = getRandomNumber;
