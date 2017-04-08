# Multi-room chat application
  Session based multi-room chat application. 
  
## Technologies: 
  Socket.io, Express, AngularJS
  
## Usage:
  ```
  Terminal 1: mongod --dbpath=<%dbpath%>
  
  Terminal 2: npm start
  ```
  
  OR
  
  ```
    mongod --dbpath=<%dbpath%> && npm start
  ```
  
## Settings:

  Kindly check whether ./settings.json match your system settings.
  
  ```
    "MongoConnection": {
        "host": "127.0.0.1",
        "port": "27017",
        "db": "session",
        "url": "mongodb://localhost:27017/chatsessions",
        "ttl": 3600
    }
  ```  
