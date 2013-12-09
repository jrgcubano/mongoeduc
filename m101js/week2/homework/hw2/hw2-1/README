# Homework 2.1

In this problem, you will be using an old weather dataset. You should have included with your homework files a "weather_data.csv" file. This is a comma separated value file that you can import into MongoDB as follows:

mongoimport --type csv --headerline weather_data.csv -d weather -c data

You can verify that you've imported the data correctly by running the following commands in the mongo shell:

> use weather
> db.data.find().count()
> 2963

Reading clockwise from true north, the wind direction is measured by degrees around the compass up to 360 degrees. 

90 is East

180 is South

270 is West

360 is North

Your assignment is to figure out the "State" that recorded the lowest "Temperature" when the wind was coming from the west ("Wind Direction" between 180 and 360). Please enter the name of the state that meets this requirement. Do not include the surrounding quotes in providing your answer.


Query: db.data.find({ "Wind Direction" : { "$gt" : 180, "$lt" : 360 } }}.sort({ "Temperature" : 1}).limit(1).pretty() 

Answer: New Mexico
