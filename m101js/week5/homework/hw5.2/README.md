# Homework 5.2

Crunching the Zipcode dataset
Please download the zips.json dataset and import it into a collection of your choice. 

Please calculate the average population of cities in California (abbreviation CA) and New York (NY) (taken together) with populations over 25,000. 

For this problem, assume that a city name that appears in more than one state represents two separate cities. 

Please round the answer to a whole number. 
Hint: The answer for CT and NJ is 49749.

78347

96343

86253

93164

(OK) 82541

68341

# Answer:

mongoimport -d hw52 -c zips --drop < zips.json

app.js