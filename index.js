function getRandomNumber() {
    let random = Math.floor(Math.random() * 100)
    return `Random number is ${random}`
};

if (require.main === module) {
    console.log(getRandomNumber());
}

module.exports = getRandomNumber;
