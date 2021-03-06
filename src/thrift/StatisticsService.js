//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var PublicStruct_ttypes = require('./PublicStruct_types')


var ttypes = require('./StatisticsService_types');
//HELPER FUNCTIONS AND STRUCTURES

StatisticsService_getStaticIndexByDateForSuper_args = function(args) {
  this.user = null;
  this.startDate = null;
  this.endDate = null;
  this.province = null;
  this.city = null;
  this.sortName = null;
  this.sortDir = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.startDate !== undefined && args.startDate !== null) {
      this.startDate = args.startDate;
    }
    if (args.endDate !== undefined && args.endDate !== null) {
      this.endDate = args.endDate;
    }
    if (args.province !== undefined && args.province !== null) {
      this.province = args.province;
    }
    if (args.city !== undefined && args.city !== null) {
      this.city = args.city;
    }
    if (args.sortName !== undefined && args.sortName !== null) {
      this.sortName = args.sortName;
    }
    if (args.sortDir !== undefined && args.sortDir !== null) {
      this.sortDir = args.sortDir;
    }
  }
};
StatisticsService_getStaticIndexByDateForSuper_args.prototype = {};
StatisticsService_getStaticIndexByDateForSuper_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.user = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I64) {
        this.startDate = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I64) {
        this.endDate = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I64) {
        this.province = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I64) {
        this.city = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.sortName = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.sortDir = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

StatisticsService_getStaticIndexByDateForSuper_args.prototype.write = function(output) {
  output.writeStructBegin('StatisticsService_getStaticIndexByDateForSuper_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I64, 1);
    output.writeI64(this.user);
    output.writeFieldEnd();
  }
  if (this.startDate !== null && this.startDate !== undefined) {
    output.writeFieldBegin('startDate', Thrift.Type.I64, 2);
    output.writeI64(this.startDate);
    output.writeFieldEnd();
  }
  if (this.endDate !== null && this.endDate !== undefined) {
    output.writeFieldBegin('endDate', Thrift.Type.I64, 3);
    output.writeI64(this.endDate);
    output.writeFieldEnd();
  }
  if (this.province !== null && this.province !== undefined) {
    output.writeFieldBegin('province', Thrift.Type.I64, 4);
    output.writeI64(this.province);
    output.writeFieldEnd();
  }
  if (this.city !== null && this.city !== undefined) {
    output.writeFieldBegin('city', Thrift.Type.I64, 5);
    output.writeI64(this.city);
    output.writeFieldEnd();
  }
  if (this.sortName !== null && this.sortName !== undefined) {
    output.writeFieldBegin('sortName', Thrift.Type.STRING, 6);
    output.writeString(this.sortName);
    output.writeFieldEnd();
  }
  if (this.sortDir !== null && this.sortDir !== undefined) {
    output.writeFieldBegin('sortDir', Thrift.Type.STRING, 7);
    output.writeString(this.sortDir);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

StatisticsService_getStaticIndexByDateForSuper_result = function(args) {
  this.success = null;
  this.ex = null;
  if (args instanceof PublicStruct_ttypes.InvalidOperation) {
    this.ex = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
    if (args.ex !== undefined && args.ex !== null) {
      this.ex = args.ex;
    }
  }
};
StatisticsService_getStaticIndexByDateForSuper_result.prototype = {};
StatisticsService_getStaticIndexByDateForSuper_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ex = new PublicStruct_ttypes.InvalidOperation();
        this.ex.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

StatisticsService_getStaticIndexByDateForSuper_result.prototype.write = function(output) {
  output.writeStructBegin('StatisticsService_getStaticIndexByDateForSuper_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  if (this.ex !== null && this.ex !== undefined) {
    output.writeFieldBegin('ex', Thrift.Type.STRUCT, 1);
    this.ex.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

StatisticsService_getStaticIndexByDateForAdmin_args = function(args) {
  this.user = null;
  this.startDate = null;
  this.endDate = null;
  this.province = null;
  this.city = null;
  this.sortName = null;
  this.sortDir = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.startDate !== undefined && args.startDate !== null) {
      this.startDate = args.startDate;
    }
    if (args.endDate !== undefined && args.endDate !== null) {
      this.endDate = args.endDate;
    }
    if (args.province !== undefined && args.province !== null) {
      this.province = args.province;
    }
    if (args.city !== undefined && args.city !== null) {
      this.city = args.city;
    }
    if (args.sortName !== undefined && args.sortName !== null) {
      this.sortName = args.sortName;
    }
    if (args.sortDir !== undefined && args.sortDir !== null) {
      this.sortDir = args.sortDir;
    }
  }
};
StatisticsService_getStaticIndexByDateForAdmin_args.prototype = {};
StatisticsService_getStaticIndexByDateForAdmin_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.user = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I64) {
        this.startDate = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I64) {
        this.endDate = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I64) {
        this.province = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I64) {
        this.city = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.sortName = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.sortDir = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

StatisticsService_getStaticIndexByDateForAdmin_args.prototype.write = function(output) {
  output.writeStructBegin('StatisticsService_getStaticIndexByDateForAdmin_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I64, 1);
    output.writeI64(this.user);
    output.writeFieldEnd();
  }
  if (this.startDate !== null && this.startDate !== undefined) {
    output.writeFieldBegin('startDate', Thrift.Type.I64, 2);
    output.writeI64(this.startDate);
    output.writeFieldEnd();
  }
  if (this.endDate !== null && this.endDate !== undefined) {
    output.writeFieldBegin('endDate', Thrift.Type.I64, 3);
    output.writeI64(this.endDate);
    output.writeFieldEnd();
  }
  if (this.province !== null && this.province !== undefined) {
    output.writeFieldBegin('province', Thrift.Type.I64, 4);
    output.writeI64(this.province);
    output.writeFieldEnd();
  }
  if (this.city !== null && this.city !== undefined) {
    output.writeFieldBegin('city', Thrift.Type.I64, 5);
    output.writeI64(this.city);
    output.writeFieldEnd();
  }
  if (this.sortName !== null && this.sortName !== undefined) {
    output.writeFieldBegin('sortName', Thrift.Type.STRING, 6);
    output.writeString(this.sortName);
    output.writeFieldEnd();
  }
  if (this.sortDir !== null && this.sortDir !== undefined) {
    output.writeFieldBegin('sortDir', Thrift.Type.STRING, 7);
    output.writeString(this.sortDir);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

StatisticsService_getStaticIndexByDateForAdmin_result = function(args) {
  this.success = null;
  this.ex = null;
  if (args instanceof PublicStruct_ttypes.InvalidOperation) {
    this.ex = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
    if (args.ex !== undefined && args.ex !== null) {
      this.ex = args.ex;
    }
  }
};
StatisticsService_getStaticIndexByDateForAdmin_result.prototype = {};
StatisticsService_getStaticIndexByDateForAdmin_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ex = new PublicStruct_ttypes.InvalidOperation();
        this.ex.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

StatisticsService_getStaticIndexByDateForAdmin_result.prototype.write = function(output) {
  output.writeStructBegin('StatisticsService_getStaticIndexByDateForAdmin_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  if (this.ex !== null && this.ex !== undefined) {
    output.writeFieldBegin('ex', Thrift.Type.STRUCT, 1);
    this.ex.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

StatisticsService_getStaticIndexByDate_args = function(args) {
  this.user = null;
  this.startDate = null;
  this.endDate = null;
  this.province = null;
  this.city = null;
  this.sortName = null;
  this.sortDir = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.startDate !== undefined && args.startDate !== null) {
      this.startDate = args.startDate;
    }
    if (args.endDate !== undefined && args.endDate !== null) {
      this.endDate = args.endDate;
    }
    if (args.province !== undefined && args.province !== null) {
      this.province = args.province;
    }
    if (args.city !== undefined && args.city !== null) {
      this.city = args.city;
    }
    if (args.sortName !== undefined && args.sortName !== null) {
      this.sortName = args.sortName;
    }
    if (args.sortDir !== undefined && args.sortDir !== null) {
      this.sortDir = args.sortDir;
    }
  }
};
StatisticsService_getStaticIndexByDate_args.prototype = {};
StatisticsService_getStaticIndexByDate_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.user = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I64) {
        this.startDate = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I64) {
        this.endDate = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I64) {
        this.province = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I64) {
        this.city = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.sortName = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.sortDir = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

StatisticsService_getStaticIndexByDate_args.prototype.write = function(output) {
  output.writeStructBegin('StatisticsService_getStaticIndexByDate_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I64, 1);
    output.writeI64(this.user);
    output.writeFieldEnd();
  }
  if (this.startDate !== null && this.startDate !== undefined) {
    output.writeFieldBegin('startDate', Thrift.Type.I64, 2);
    output.writeI64(this.startDate);
    output.writeFieldEnd();
  }
  if (this.endDate !== null && this.endDate !== undefined) {
    output.writeFieldBegin('endDate', Thrift.Type.I64, 3);
    output.writeI64(this.endDate);
    output.writeFieldEnd();
  }
  if (this.province !== null && this.province !== undefined) {
    output.writeFieldBegin('province', Thrift.Type.I64, 4);
    output.writeI64(this.province);
    output.writeFieldEnd();
  }
  if (this.city !== null && this.city !== undefined) {
    output.writeFieldBegin('city', Thrift.Type.I64, 5);
    output.writeI64(this.city);
    output.writeFieldEnd();
  }
  if (this.sortName !== null && this.sortName !== undefined) {
    output.writeFieldBegin('sortName', Thrift.Type.STRING, 6);
    output.writeString(this.sortName);
    output.writeFieldEnd();
  }
  if (this.sortDir !== null && this.sortDir !== undefined) {
    output.writeFieldBegin('sortDir', Thrift.Type.STRING, 7);
    output.writeString(this.sortDir);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

StatisticsService_getStaticIndexByDate_result = function(args) {
  this.success = null;
  this.ex = null;
  if (args instanceof PublicStruct_ttypes.InvalidOperation) {
    this.ex = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
    if (args.ex !== undefined && args.ex !== null) {
      this.ex = args.ex;
    }
  }
};
StatisticsService_getStaticIndexByDate_result.prototype = {};
StatisticsService_getStaticIndexByDate_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ex = new PublicStruct_ttypes.InvalidOperation();
        this.ex.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

StatisticsService_getStaticIndexByDate_result.prototype.write = function(output) {
  output.writeStructBegin('StatisticsService_getStaticIndexByDate_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  if (this.ex !== null && this.ex !== undefined) {
    output.writeFieldBegin('ex', Thrift.Type.STRUCT, 1);
    this.ex.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

StatisticsServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
StatisticsServiceClient.prototype = {};
StatisticsServiceClient.prototype.seqid = function() { return this._seqid; }
StatisticsServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
StatisticsServiceClient.prototype.getStaticIndexByDateForSuper = function(user, startDate, endDate, province, city, sortName, sortDir, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getStaticIndexByDateForSuper(user, startDate, endDate, province, city, sortName, sortDir);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getStaticIndexByDateForSuper(user, startDate, endDate, province, city, sortName, sortDir);
  }
};

StatisticsServiceClient.prototype.send_getStaticIndexByDateForSuper = function(user, startDate, endDate, province, city, sortName, sortDir) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getStaticIndexByDateForSuper', Thrift.MessageType.CALL, this.seqid());
  var args = new StatisticsService_getStaticIndexByDateForSuper_args();
  args.user = user;
  args.startDate = startDate;
  args.endDate = endDate;
  args.province = province;
  args.city = city;
  args.sortName = sortName;
  args.sortDir = sortDir;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

StatisticsServiceClient.prototype.recv_getStaticIndexByDateForSuper = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new StatisticsService_getStaticIndexByDateForSuper_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getStaticIndexByDateForSuper failed: unknown result');
};
StatisticsServiceClient.prototype.getStaticIndexByDateForAdmin = function(user, startDate, endDate, province, city, sortName, sortDir, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getStaticIndexByDateForAdmin(user, startDate, endDate, province, city, sortName, sortDir);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getStaticIndexByDateForAdmin(user, startDate, endDate, province, city, sortName, sortDir);
  }
};

StatisticsServiceClient.prototype.send_getStaticIndexByDateForAdmin = function(user, startDate, endDate, province, city, sortName, sortDir) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getStaticIndexByDateForAdmin', Thrift.MessageType.CALL, this.seqid());
  var args = new StatisticsService_getStaticIndexByDateForAdmin_args();
  args.user = user;
  args.startDate = startDate;
  args.endDate = endDate;
  args.province = province;
  args.city = city;
  args.sortName = sortName;
  args.sortDir = sortDir;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

StatisticsServiceClient.prototype.recv_getStaticIndexByDateForAdmin = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new StatisticsService_getStaticIndexByDateForAdmin_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getStaticIndexByDateForAdmin failed: unknown result');
};
StatisticsServiceClient.prototype.getStaticIndexByDate = function(user, startDate, endDate, province, city, sortName, sortDir, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getStaticIndexByDate(user, startDate, endDate, province, city, sortName, sortDir);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getStaticIndexByDate(user, startDate, endDate, province, city, sortName, sortDir);
  }
};

StatisticsServiceClient.prototype.send_getStaticIndexByDate = function(user, startDate, endDate, province, city, sortName, sortDir) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getStaticIndexByDate', Thrift.MessageType.CALL, this.seqid());
  var args = new StatisticsService_getStaticIndexByDate_args();
  args.user = user;
  args.startDate = startDate;
  args.endDate = endDate;
  args.province = province;
  args.city = city;
  args.sortName = sortName;
  args.sortDir = sortDir;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

StatisticsServiceClient.prototype.recv_getStaticIndexByDate = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new StatisticsService_getStaticIndexByDate_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getStaticIndexByDate failed: unknown result');
};
StatisticsServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
StatisticsServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

StatisticsServiceProcessor.prototype.process_getStaticIndexByDateForSuper = function(seqid, input, output) {
  var args = new StatisticsService_getStaticIndexByDateForSuper_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getStaticIndexByDateForSuper.length === 7) {
    Q.fcall(this._handler.getStaticIndexByDateForSuper, args.user, args.startDate, args.endDate, args.province, args.city, args.sortName, args.sortDir)
      .then(function(result) {
        var result = new StatisticsService_getStaticIndexByDateForSuper_result({success: result});
        output.writeMessageBegin("getStaticIndexByDateForSuper", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new StatisticsService_getStaticIndexByDateForSuper_result(err);
          output.writeMessageBegin("getStaticIndexByDateForSuper", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("getStaticIndexByDateForSuper", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getStaticIndexByDateForSuper(args.user, args.startDate, args.endDate, args.province, args.city, args.sortName, args.sortDir, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new StatisticsService_getStaticIndexByDateForSuper_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getStaticIndexByDateForSuper", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getStaticIndexByDateForSuper", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

StatisticsServiceProcessor.prototype.process_getStaticIndexByDateForAdmin = function(seqid, input, output) {
  var args = new StatisticsService_getStaticIndexByDateForAdmin_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getStaticIndexByDateForAdmin.length === 7) {
    Q.fcall(this._handler.getStaticIndexByDateForAdmin, args.user, args.startDate, args.endDate, args.province, args.city, args.sortName, args.sortDir)
      .then(function(result) {
        var result = new StatisticsService_getStaticIndexByDateForAdmin_result({success: result});
        output.writeMessageBegin("getStaticIndexByDateForAdmin", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new StatisticsService_getStaticIndexByDateForAdmin_result(err);
          output.writeMessageBegin("getStaticIndexByDateForAdmin", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("getStaticIndexByDateForAdmin", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getStaticIndexByDateForAdmin(args.user, args.startDate, args.endDate, args.province, args.city, args.sortName, args.sortDir, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new StatisticsService_getStaticIndexByDateForAdmin_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getStaticIndexByDateForAdmin", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getStaticIndexByDateForAdmin", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

StatisticsServiceProcessor.prototype.process_getStaticIndexByDate = function(seqid, input, output) {
  var args = new StatisticsService_getStaticIndexByDate_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getStaticIndexByDate.length === 7) {
    Q.fcall(this._handler.getStaticIndexByDate, args.user, args.startDate, args.endDate, args.province, args.city, args.sortName, args.sortDir)
      .then(function(result) {
        var result = new StatisticsService_getStaticIndexByDate_result({success: result});
        output.writeMessageBegin("getStaticIndexByDate", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new StatisticsService_getStaticIndexByDate_result(err);
          output.writeMessageBegin("getStaticIndexByDate", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("getStaticIndexByDate", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getStaticIndexByDate(args.user, args.startDate, args.endDate, args.province, args.city, args.sortName, args.sortDir, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new StatisticsService_getStaticIndexByDate_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getStaticIndexByDate", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getStaticIndexByDate", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

