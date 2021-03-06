//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var PublicStruct_ttypes = require('./PublicStruct_types')


var ttypes = require('./UserRefService_types');
//HELPER FUNCTIONS AND STRUCTURES

UserRefService_setRef_args = function(args) {
  this.user = null;
  this.refs = null;
  this.type = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.refs !== undefined && args.refs !== null) {
      this.refs = Thrift.copyList(args.refs, [null]);
    }
    if (args.type !== undefined && args.type !== null) {
      this.type = args.type;
    }
  }
};
UserRefService_setRef_args.prototype = {};
UserRefService_setRef_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.refs = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = input.readI64();
          this.refs.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.type = input.readI32();
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

UserRefService_setRef_args.prototype.write = function(output) {
  output.writeStructBegin('UserRefService_setRef_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I64, 1);
    output.writeI64(this.user);
    output.writeFieldEnd();
  }
  if (this.refs !== null && this.refs !== undefined) {
    output.writeFieldBegin('refs', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.I64, this.refs.length);
    for (var iter7 in this.refs)
    {
      if (this.refs.hasOwnProperty(iter7))
      {
        iter7 = this.refs[iter7];
        output.writeI64(iter7);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.type !== null && this.type !== undefined) {
    output.writeFieldBegin('type', Thrift.Type.I32, 3);
    output.writeI32(this.type);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

UserRefService_setRef_result = function(args) {
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
UserRefService_setRef_result.prototype = {};
UserRefService_setRef_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.BOOL) {
        this.success = input.readBool();
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

UserRefService_setRef_result.prototype.write = function(output) {
  output.writeStructBegin('UserRefService_setRef_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.BOOL, 0);
    output.writeBool(this.success);
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

UserRefService_setRefs_args = function(args) {
  this.user = null;
  this.box = null;
  this.app_package = null;
  this.require_package = null;
  this.app_white = null;
  this.install_active = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.box !== undefined && args.box !== null) {
      this.box = Thrift.copyList(args.box, [null]);
    }
    if (args.app_package !== undefined && args.app_package !== null) {
      this.app_package = Thrift.copyList(args.app_package, [null]);
    }
    if (args.require_package !== undefined && args.require_package !== null) {
      this.require_package = Thrift.copyList(args.require_package, [null]);
    }
    if (args.app_white !== undefined && args.app_white !== null) {
      this.app_white = Thrift.copyList(args.app_white, [null]);
    }
    if (args.install_active !== undefined && args.install_active !== null) {
      this.install_active = Thrift.copyList(args.install_active, [null]);
    }
  }
};
UserRefService_setRefs_args.prototype = {};
UserRefService_setRefs_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.LIST) {
        var _size8 = 0;
        var _rtmp312;
        this.box = [];
        var _etype11 = 0;
        _rtmp312 = input.readListBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = input.readI64();
          this.box.push(elem14);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        var _size15 = 0;
        var _rtmp319;
        this.app_package = [];
        var _etype18 = 0;
        _rtmp319 = input.readListBegin();
        _etype18 = _rtmp319.etype;
        _size15 = _rtmp319.size;
        for (var _i20 = 0; _i20 < _size15; ++_i20)
        {
          var elem21 = null;
          elem21 = input.readI64();
          this.app_package.push(elem21);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.LIST) {
        var _size22 = 0;
        var _rtmp326;
        this.require_package = [];
        var _etype25 = 0;
        _rtmp326 = input.readListBegin();
        _etype25 = _rtmp326.etype;
        _size22 = _rtmp326.size;
        for (var _i27 = 0; _i27 < _size22; ++_i27)
        {
          var elem28 = null;
          elem28 = input.readI64();
          this.require_package.push(elem28);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.LIST) {
        var _size29 = 0;
        var _rtmp333;
        this.app_white = [];
        var _etype32 = 0;
        _rtmp333 = input.readListBegin();
        _etype32 = _rtmp333.etype;
        _size29 = _rtmp333.size;
        for (var _i34 = 0; _i34 < _size29; ++_i34)
        {
          var elem35 = null;
          elem35 = input.readI64();
          this.app_white.push(elem35);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.LIST) {
        var _size36 = 0;
        var _rtmp340;
        this.install_active = [];
        var _etype39 = 0;
        _rtmp340 = input.readListBegin();
        _etype39 = _rtmp340.etype;
        _size36 = _rtmp340.size;
        for (var _i41 = 0; _i41 < _size36; ++_i41)
        {
          var elem42 = null;
          elem42 = input.readI64();
          this.install_active.push(elem42);
        }
        input.readListEnd();
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

UserRefService_setRefs_args.prototype.write = function(output) {
  output.writeStructBegin('UserRefService_setRefs_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I64, 1);
    output.writeI64(this.user);
    output.writeFieldEnd();
  }
  if (this.box !== null && this.box !== undefined) {
    output.writeFieldBegin('box', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.I64, this.box.length);
    for (var iter43 in this.box)
    {
      if (this.box.hasOwnProperty(iter43))
      {
        iter43 = this.box[iter43];
        output.writeI64(iter43);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.app_package !== null && this.app_package !== undefined) {
    output.writeFieldBegin('app_package', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.I64, this.app_package.length);
    for (var iter44 in this.app_package)
    {
      if (this.app_package.hasOwnProperty(iter44))
      {
        iter44 = this.app_package[iter44];
        output.writeI64(iter44);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.require_package !== null && this.require_package !== undefined) {
    output.writeFieldBegin('require_package', Thrift.Type.LIST, 4);
    output.writeListBegin(Thrift.Type.I64, this.require_package.length);
    for (var iter45 in this.require_package)
    {
      if (this.require_package.hasOwnProperty(iter45))
      {
        iter45 = this.require_package[iter45];
        output.writeI64(iter45);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.app_white !== null && this.app_white !== undefined) {
    output.writeFieldBegin('app_white', Thrift.Type.LIST, 5);
    output.writeListBegin(Thrift.Type.I64, this.app_white.length);
    for (var iter46 in this.app_white)
    {
      if (this.app_white.hasOwnProperty(iter46))
      {
        iter46 = this.app_white[iter46];
        output.writeI64(iter46);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.install_active !== null && this.install_active !== undefined) {
    output.writeFieldBegin('install_active', Thrift.Type.LIST, 6);
    output.writeListBegin(Thrift.Type.I64, this.install_active.length);
    for (var iter47 in this.install_active)
    {
      if (this.install_active.hasOwnProperty(iter47))
      {
        iter47 = this.install_active[iter47];
        output.writeI64(iter47);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

UserRefService_setRefs_result = function(args) {
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
UserRefService_setRefs_result.prototype = {};
UserRefService_setRefs_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.BOOL) {
        this.success = input.readBool();
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

UserRefService_setRefs_result.prototype.write = function(output) {
  output.writeStructBegin('UserRefService_setRefs_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.BOOL, 0);
    output.writeBool(this.success);
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

UserRefServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
UserRefServiceClient.prototype = {};
UserRefServiceClient.prototype.seqid = function() { return this._seqid; }
UserRefServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
UserRefServiceClient.prototype.setRef = function(user, refs, type, callback) {
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
    this.send_setRef(user, refs, type);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_setRef(user, refs, type);
  }
};

UserRefServiceClient.prototype.send_setRef = function(user, refs, type) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('setRef', Thrift.MessageType.CALL, this.seqid());
  var args = new UserRefService_setRef_args();
  args.user = user;
  args.refs = refs;
  args.type = type;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

UserRefServiceClient.prototype.recv_setRef = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new UserRefService_setRef_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('setRef failed: unknown result');
};
UserRefServiceClient.prototype.setRefs = function(user, box, app_package, require_package, app_white, install_active, callback) {
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
    this.send_setRefs(user, box, app_package, require_package, app_white, install_active);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_setRefs(user, box, app_package, require_package, app_white, install_active);
  }
};

UserRefServiceClient.prototype.send_setRefs = function(user, box, app_package, require_package, app_white, install_active) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('setRefs', Thrift.MessageType.CALL, this.seqid());
  var args = new UserRefService_setRefs_args();
  args.user = user;
  args.box = box;
  args.app_package = app_package;
  args.require_package = require_package;
  args.app_white = app_white;
  args.install_active = install_active;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

UserRefServiceClient.prototype.recv_setRefs = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new UserRefService_setRefs_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('setRefs failed: unknown result');
};
UserRefServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
UserRefServiceProcessor.prototype.process = function(input, output) {
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

UserRefServiceProcessor.prototype.process_setRef = function(seqid, input, output) {
  var args = new UserRefService_setRef_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.setRef.length === 3) {
    Q.fcall(this._handler.setRef, args.user, args.refs, args.type)
      .then(function(result) {
        var result = new UserRefService_setRef_result({success: result});
        output.writeMessageBegin("setRef", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new UserRefService_setRef_result(err);
          output.writeMessageBegin("setRef", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("setRef", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.setRef(args.user, args.refs, args.type, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new UserRefService_setRef_result((err != null ? err : {success: result}));
        output.writeMessageBegin("setRef", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("setRef", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

UserRefServiceProcessor.prototype.process_setRefs = function(seqid, input, output) {
  var args = new UserRefService_setRefs_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.setRefs.length === 6) {
    Q.fcall(this._handler.setRefs, args.user, args.box, args.app_package, args.require_package, args.app_white, args.install_active)
      .then(function(result) {
        var result = new UserRefService_setRefs_result({success: result});
        output.writeMessageBegin("setRefs", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new UserRefService_setRefs_result(err);
          output.writeMessageBegin("setRefs", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("setRefs", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.setRefs(args.user, args.box, args.app_package, args.require_package, args.app_white, args.install_active, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new UserRefService_setRefs_result((err != null ? err : {success: result}));
        output.writeMessageBegin("setRefs", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("setRefs", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

