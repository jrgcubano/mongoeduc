# Creating a Replica Set

Which command, when issued from the mongo shell, will allow you to read from a secondary?


db.isMaster()

db.adminCommand({'readPreference':'Secondary'})

rs.setStatus("Primary")

(OK) rs.slaveOk()

