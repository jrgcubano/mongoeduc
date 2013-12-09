# Homework 4.4

In this problem you will analyze a profile log taken from a mongoDB instance. You should have included with your homework files a 'sysprofile.json' file. Import this file with the following command:
mongoimport -d m101 -c profile < sysprofile.json
Now query the profile data, looking for all queries to the students collection in the database school2, sorted in order of decreasing latency.

What is the latency of the longest running operation to the collection, in milliseconds?



4715

34430

5018

(OK) 15820

3217


Query used: db.profile.find({ns:/school2.students/}).sort({millis : -1}).limit(1).pretty()
