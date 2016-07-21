//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var PublicStruct_ttypes = require('./PublicStruct_types')


var ttypes = require('./ResourcesService_types');
//HELPER FUNCTIONS AND STRUCTURES

ResourcesService_getByVersion_args = function(args) {
  this.id = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    }
  }
};
ResourcesService_getByVersion_args.prototype = {};
ResourcesService_getByVersion_args.prototype.read = function(input) {
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
        this.id = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ResourcesService_getByVersion_args.prototype.write = function(output) {
  output.writeStructBegin('ResourcesService_getByVersion_args');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I64, 1);
    output.writeI64(this.id);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ResourcesService_getByVersion_result = function(args) {
  this.success = null;
  this.ex = null;
  if (args instanceof PublicStruct_ttypes.InvalidOperation) {
    this.ex = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new PublicStruct_ttypes.ResourcesStruct(args.success);
    }
    if (args.ex !== undefined && args.ex !== null) {
      this.ex = args.ex;
    }
  }
};
ResourcesService_getByVersion_result.prototype = {};
ResourcesService_getByVersion_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new PublicStruct_ttypes.ResourcesStruct();
        this.success.read(input);
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

ResourcesService_getByVersion_result.prototype.write = function(output) {
  output.writeStructBegin('ResourcesService_getByVersion_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
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

ResourcesService_getByMD5_args = function(args) {
  this.md5 = null;
  if (args) {
    if (args.md5 !== undefined && args.md5 !== null) {
      this.md5 = args.md5;
    }
  }
};
ResourcesService_getByMD5_args.prototype = {};
ResourcesService_getByMD5_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRING) {
        this.md5 = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ResourcesService_getByMD5_args.prototype.write = function(output) {
  output.writeStructBegin('ResourcesService_getByMD5_args');
  if (this.md5 !== null && this.md5 !== undefined) {
    output.writeFieldBegin('md5', Thrift.Type.STRING, 1);
    output.writeString(this.md5);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ResourcesService_getByMD5_result = function(args) {
  this.success = null;
  this.ex = null;
  if (args instanceof PublicStruct_ttypes.InvalidOperation) {
    this.ex = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new PublicStruct_ttypes.ResourcesStruct(args.success);
    }
    if (args.ex !== undefined && args.ex !== null) {
      this.ex = args.ex;
    }
  }
};
ResourcesService_getByMD5_result.prototype = {};
ResourcesService_getByMD5_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new PublicStruct_ttypes.ResourcesStruct();
        this.success.read(input);
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

ResourcesService_getByMD5_result.prototype.write = function(output) {
  output.writeStructBegin('ResourcesService_getByMD5_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
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

ResourcesServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
ResourcesServiceClient.prototype = {};
ResourcesServiceClient.prototype.seqid = function() { return this._seqid; }
ResourcesServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
ResourcesServiceClient.prototype.getByVersion = function(id, callback) {
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
    this.send_getByVersion(id);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getByVersion(id);
  }
};

ResourcesServiceClient.prototype.send_getByVersion = function(id) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getByVersion', Thrift.MessageType.CALL, this.seqid());
  var args = new ResourcesService_getByVersion_args();
  args.id = id;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

ResourcesServiceClient.prototype.recv_getByVersion = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new ResourcesService_getByVersion_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getByVersion failed: unknown result');
};
ResourcesServiceClient.prototype.getByMD5 = function(md5, callback) {
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
    this.send_getByMD5(md5);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getByMD5(md5);
  }
};

ResourcesServiceClient.prototype.send_getByMD5 = function(md5) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getByMD5', Thrift.MessageType.CALL, this.seqid());
  var args = new ResourcesService_getByMD5_args();
  args.md5 = md5;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

ResourcesServiceClient.prototype.recv_getByMD5 = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new ResourcesService_getByMD5_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getByMD5 failed: unknown result');
};
ResourcesServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
ResourcesServiceProcessor.prototype.process = function(input, output) {
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

ResourcesServiceProcessor.prototype.process_getByVersion = function(seqid, input, output) {
  var args = new ResourcesService_getByVersion_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getByVersion.length === 1) {
    Q.fcall(this._handler.getByVersion, args.id)
      .then(function(result) {
        var result = new ResourcesService_getByVersion_result({success: result});
        output.writeMessageBegin("getByVersion", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new ResourcesService_getByVersion_result(err);
          output.writeMessageBegin("getByVersion", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("getByVersion", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getByVersion(args.id, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new ResourcesService_getByVersion_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getByVersion", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getByVersion", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

ResourcesServiceProcessor.prototype.process_getByMD5 = function(seqid, input, output) {
  var args = new ResourcesService_getByMD5_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getByMD5.length === 1) {
    Q.fcall(this._handler.getByMD5, args.md5)
      .then(function(result) {
        var result = new ResourcesService_getByMD5_result({success: result});
        output.writeMessageBegin("getByMD5", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new ResourcesService_getByMD5_result(err);
          output.writeMessageBegin("getByMD5", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("getByMD5", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getByMD5(args.md5, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new ResourcesService_getByMD5_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getByMD5", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getByMD5", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

