## Budget Calculator

This project was built for a [coding challenge](https://gist.github.com/cowabungapeppercorn/cc851d881565ed90f08a54927d7f80bb).  Although I had/have little to no experience with React at the time of writing this, I thought it would be fun to go ahead and challenge myself to use it.  Aaand there's definitely a lot to learn!


## Live Example
[Budget Calculator](https://zbowhay.github.io/WebAppDev/budget-calculator.html)

For fun I threw in a little easter egg too.  Can you find it? *( Desktop only :/ )*

## Known Issues

In the spirit of chaos, I decided to trust all user input and not perform any error handling.  As this isn't actual production code I feel that that is ok.  Even if I were to include some validation, it wouldn't prevent a malicious user from manipulating the DOM or subsequent requests to firebase.  Traditionally I would have forwarded these requests to a backend and performed a more thorough validation there before finally forwarding it to any other backend resources.  But hey, we're storing the API Key on the front end anyway, they already have the keys to the kingdom.

I would like to see how this would have turned out using something like Redux.  I initially built the project with a redux-typesctipt template but since I was already figuring out Material and React... adding in Redux seemed like a bit much so I stuck to using Hooks.