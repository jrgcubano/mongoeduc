# Homework 3.4

In this homework, we're going to use the built-in Map/Reduce functionality in MongoDB to answer a simple question about zip codes in the U.S. state of Pennsylvania (PA). Zip codes are U.S. postal codes and may identify a city, region of a city, or rural area. The two largest cities in PA are Pittsburgh and Philadelphia. Use Map/Reduce to determine how many zip codes in PA are closer to Pittsburgh than to Philadelphia and how many are closer to Philadelphia than to Pittsburgh.

The map function is already written for you. It uses some lat/longs that are not exactly the center of Pittsburgh and Philadelphia. It also assumes the world is flat. For this problem, these simplifications are OK.

Note: We could solve this problem using MongoDB's geospatial features. However, for this homework we will use Map/Reduce.

The map function for our solution is provided in the aforementioned week3.js file. Thus if you run:

mongo --shell week3.js
The method map_closest() will already be defined. You can type it at the shell prompt without parameters to see its source code:

> map_closest
function map_closest() {
    var pitt = [-80.064879, 40.612044];
    var phil = [-74.978052, 40.089738];

    function distance(a, b) {
        var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    if (distance(this.loc, pitt) < distance(this.loc, phil)) {
        emit("pitt", 1);
    } else {
        emit("phil", 1);
    }
}
> 
Question: Given the map function above, how many zip codes in PA are closer to Philadelphia? Use map/reduce to find the answer.