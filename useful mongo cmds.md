# Useful MongoDB Commands for the REPL

`use CUIPDataStore` selects the right db

`db.userInfo.find()` lists all users

`db.userInfo.update({"email": "<email>"}, {$set: {"<property>": "<new value>"}})` sets / updates a property for an object

`db.userInfo.remove({"_id": ObjectId("<id>")});` removes the entry of ID `<id>`
