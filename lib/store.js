module.exports = {
  rooms: {},
  init: function(config){
    if (config.db.REDISTOGO_URL) {
      var rtg   = require("url").parse(config.db.REDISTOGO_URL);
      this.redisClient = require("redis").createClient(rtg.port, rtg.hostname);
      this.redisClient.auth(rtg.auth.split(":")[1]);
    } else if(config.db.redis){
      this.redisClient = require("redis").createClient();
    }

  },
  get: function(key, cb){
    if(this.redisClient){
      this.redisClient.get(key, function(err, reply){
        cb(reply);
      });
    }else{
      cb(this.rooms[key]);
    }
  },
  set: function(key, value, cb){
    if(this.redisClient){
      this.redisClient.set(key, value);
    }else{
      this.rooms[key] = value;
    }
    if(cb) cb();
  },
  exists: function(key, cb){
    var exist = this.rooms[key] ? true : false;
    cb(exist);
  }
};


