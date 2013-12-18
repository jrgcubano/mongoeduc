# Homework 2.1

We will use the pcat.products collection from week 1. So start with that; if not already set up, import it:
mongoimport --db pcat -c products < products.json
You can find products.json from the Download Handouts link. In the shell, if you type:
db.products.count()
should return 11.
Next, download homework2.js from the Download Handouts link. Run the shell with this script:

mongo --shell pcat homework2.js
First, make a mini-backup of the collection before we start modifying it. In the shell:
b = db.products_bak; db.products.find().forEach( function(o){ b.insert(o) } )
 // check it worked: 
b.count()
// should print 11
If you have any issues you can restore from "products_bak"; or, you can re-import with mongoimport. (You would perhaps need in that situation to empty the collection first or drop it; see the --drop option on mongoimport --help.) At the shell ">" prompt type:
homework.a()
What is the output? (The above will check that products_bak is populated.)

# Answer
3.05