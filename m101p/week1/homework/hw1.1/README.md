# Homework 1.1

Install MongoDB on your computer and run it on the standard port.
Download the HW1 tarball (mac) or zipfile (windows), expand it as follows:

Mac Users
tar -xvf hw1.tar
Windows Users
You probably don't have tar installed so right click on the hw1.zip file and choose "extract all"
Use mongorestore to restore the dump into your running mongod. Do this by opening a terminal window (mac) or cmd window (windows) and navigating to the directory so that the dump directory is directly beneath you. Now type
mongorestore dump
Note you will need to have your path setup correctly to find mongorestore.
Now, using the Mongo shell, perform a findone on the collection called hw1 in the database m101. That will return one document. Please provide the value corresponding to the "answer" key from the document returned.

# Answer : 42