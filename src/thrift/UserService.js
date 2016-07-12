//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var PublicStruct_ttypes = require('./PublicStruct_types')


var ttypes = require('./UserService_types');
//HELPER FUNCTIONS AND STRUCTURES

UserService_users_args = function(args) {
};
UserService_users_args.prototype = {};
UserService_users_args.prototype.read = function(input) {
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
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

UserService_users_args.prototype.write = function(output) {
  output.writeStructBegin('UserService_users_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

UserService_users_result = function(args) {
  this.success = null;
  this.ex = null;
  if (args instanceof PublicStruct_ttypes.InvalidOperation) {
    this.ex = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = Thrift.copyList(args.success, [PublicStruct_ttypes.UserStruct]);
    }
    if (args.ex !== undefined && args.ex !== null) {
      this.ex = args.ex;
    }
  }
};
UserService_users_result.prototype = {};
UserService_users_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.success = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = new PublicStruct_ttypes.UserStruct();
          elem6.read(input);
          this.success.push(elem6);
        }
        input.readListEnd();
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

UserService_users_result.prototype.write = function(output) {
  output.writeStructBegin('UserService_users_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter7 in this.success)
    {
      if (this.success.hasOwnProperty(iter7))
      {
        iter7 = this.success[iter7];
        iter7.write(output);
      }
    }
    output.writeListEnd();
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

UserService_usersByUser_args = function(args) {
};
UserService_usersByUser_args.prototype = {};
UserService_usersByUser_args.prototype.read = function(input) {
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
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

UserService_usersByUser_args.prototype.write = function(output) {
  output.writeStructBegin('UserService_usersByUser_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

UserService_usersByUser_result = function(args) {
  this.success = null;
  this.ex = null;
  if (args instanceof PublicStruct_ttypes.InvalidOperation) {
    this.ex = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = Thrift.copyList(args.success, [PublicStruct_ttypes.UserStruct]);
    }
    if (args.ex !== undefined && args.ex !== null) {
      this.ex = args.ex;
    }
  }
};
UserService_usersByUser_result.prototype = {};
UserService_usersByUser_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.LIST) {
        var _size8 = 0;
        var _rtmp312;
        this.success = [];
        var _etype11 = 0;
        _rtmp312 = input.readListBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = new PublicStruct_ttypes.UserStruct();
          elem14.read(input);
          this.success.push(elem14);
        }
        input.readListEnd();
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

UserService_usersByUser_result.prototype.write = function(output) {
  output.writeStructBegin('UserService_usersByUser_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter15 in this.success)
    {
      if (this.success.hasOwnProperty(iter15))
      {
        iter15 = this.success[iter15];
        iter15.write(output);
      }
    }
    output.writeListEnd();
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

UserService_add_args = function(args) {
  this.bean = null;
  if (args) {
    if (args.bean !== undefined && args.bean !== null) {
      this.bean = new PublicStruct_ttypes.UserStruct(args.bean);
    }
  }
};
UserService_add_args.prototype = {};
UserService_add_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRUCT) {
        this.bean = new PublicStruct_ttypes.UserStruct();
        this.bean.read(input);
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

UserService_add_args.prototype.write = function(output) {
  output.writeStructBegin('UserService_add_args');
  if (this.bean !== null && this.bean !== undefined) {
    output.writeFieldBegin('bean', Thrift.Type.STRUCT, 1);
    this.bean.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

UserService_add_result = function(args) {
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
UserService_add_result.prototype = {};
UserService_add_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.I64) {
        this.success = input.readI64();
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

UserService_add_result.prototype.write = function(output) {
  output.writeStructBegin('UserService_add_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.I64, 0);
    output.writeI64(this.success);
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

UserService_update_args = function(args) {
  this.bean = null;
  if (args) {
    if (args.bean !== undefined && args.bean !== null) {
      this.bean = new PublicStruct_ttypes.UserStruct(args.bean);
    }
  }
};
UserService_update_args.prototype = {};
UserService_update_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRUCT) {
        this.bean = new PublicStruct_ttypes.UserStruct();
        this.bean.read(input);
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

UserService_update_args.prototype.write = function(output) {
  output.writeStructBegin('UserService_update_args');
  if (this.bean !== null && this.bean !== undefined) {
    output.writeFieldBegin('bean', Thrift.Type.STRUCT, 1);
    this.bean.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

UserService_update_result = function(args) {
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
UserService_update_result.prototype = {};
UserService_update_result.prototype.read = function(input) {
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

UserService_update_result.prototype.write = function(output) {
  output.writeStructBegin('UserService_update_result');
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

UserService_setRoles_args = function(args) {
  this.user = null;
  this.parent = null;
  this.roles = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.parent !== undefined && args.parent !== null) {
      this.parent = args.parent;
    }
    if (args.roles !== undefined && args.roles !== null) {
      this.roles = Thrift.copyList(args.roles, [null]);
    }
  }
};
UserService_setRoles_args.prototype = {};
UserService_setRoles_args.prototype.read = function(input) {
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
        this.parent = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        var _size16 = 0;
        var _rtmp320;
        this.roles = [];
        var _etype19 = 0;
        _rtmp320 = input.readListBegin();
        _etype19 = _rtmp320.etype;
        _size16 = _rtmp320.size;
        for (var _i21 = 0; _i21 < _size16; ++_i21)
        {
          var elem22 = null;
          elem22 = input.readI64();
          this.roles.push(elem22);
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

UserService_setRoles_args.prototype.write = function(output) {
  output.writeStructBegin('UserService_setRoles_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I64, 1);
    output.writeI64(this.user);
    output.writeFieldEnd();
  }
  if (this.parent !== null && this.parent !== undefined) {
    output.writeFieldBegin('parent', Thrift.Type.I64, 2);
    output.writeI64(this.parent);
    output.writeFieldEnd();
  }
  if (this.roles !== null && this.roles !== undefined) {
    output.writeFieldBegin('roles', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.I64, this.roles.length);
    for (var iter23 in this.roles)
    {
      if (this.roles.hasOwnProperty(iter23))
      {
        iter23 = this.roles[iter23];
        output.writeI64(iter23);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

UserService_setRoles_result = function(args) {
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
UserService_setRoles_result.prototype = {};
UserService_setRoles_result.prototype.read = function(input) {
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

UserService_setRoles_result.prototype.write = function(output) {
  output.writeStructBegin('UserService_setRoles_result');
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

UserServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
UserServiceClient.prototype = {};
UserServiceClient.prototype.seqid = function() { return this._seqid; }
UserServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
UserServiceClient.prototype.users = function(callback) {
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
    this.send_users();
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_users();
  }
};

UserServiceClient.prototype.send_users = function() {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('users', Thrift.MessageType.CALL, this.seqid());
  var args = new UserService_users_args();
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

UserServiceClient.prototype.recv_users = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new UserService_users_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('users failed: unknown result');
};
UserServiceClient.prototype.usersByUser = function(callback) {
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
    this.send_usersByUser();
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_usersByUser();
  }
};

UserServiceClient.prototype.send_usersByUser = function() {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('usersByUser', Thrift.MessageType.CALL, this.seqid());
  var args = new UserService_usersByUser_args();
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

UserServiceClient.prototype.recv_usersByUser = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new UserService_usersByUser_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('usersByUser failed: unknown result');
};
UserServiceClient.prototype.add = function(bean, callback) {
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
    this.send_add(bean);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_add(bean);
  }
};

UserServiceClient.prototype.send_add = function(bean) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('add', Thrift.MessageType.CALL, this.seqid());
  var args = new UserService_add_args();
  args.bean = bean;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

UserServiceClient.prototype.recv_add = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new UserService_add_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('add failed: unknown result');
};
UserServiceClient.prototype.update = function(bean, callback) {
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
    this.send_update(bean);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_update(bean);
  }
};

UserServiceClient.prototype.send_update = function(bean) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('update', Thrift.MessageType.CALL, this.seqid());
  var args = new UserService_update_args();
  args.bean = bean;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

UserServiceClient.prototype.recv_update = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new UserService_update_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('update failed: unknown result');
};
UserServiceClient.prototype.setRoles = function(user, parent, roles, callback) {
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
    this.send_setRoles(user, parent, roles);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_setRoles(user, parent, roles);
  }
};

UserServiceClient.prototype.send_setRoles = function(user, parent, roles) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('setRoles', Thrift.MessageType.CALL, this.seqid());
  var args = new UserService_setRoles_args();
  args.user = user;
  args.parent = parent;
  args.roles = roles;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

UserServiceClient.prototype.recv_setRoles = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new UserService_setRoles_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('setRoles failed: unknown result');
};
UserServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
UserServiceProcessor.prototype.process = function(input, output) {
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

UserServiceProcessor.prototype.process_users = function(seqid, input, output) {
  var args = new UserService_users_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.users.length === 0) {
    Q.fcall(this._handler.users)
      .then(function(result) {
        var result = new UserService_users_result({success: result});
        output.writeMessageBegin("users", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new UserService_users_result(err);
          output.writeMessageBegin("users", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("users", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.users(function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new UserService_users_result((err != null ? err : {success: result}));
        output.writeMessageBegin("users", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("users", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

UserServiceProcessor.prototype.process_usersByUser = function(seqid, input, output) {
  var args = new UserService_usersByUser_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.usersByUser.length === 0) {
    Q.fcall(this._handler.usersByUser)
      .then(function(result) {
        var result = new UserService_usersByUser_result({success: result});
        output.writeMessageBegin("usersByUser", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new UserService_usersByUser_result(err);
          output.writeMessageBegin("usersByUser", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("usersByUser", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.usersByUser(function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new UserService_usersByUser_result((err != null ? err : {success: result}));
        output.writeMessageBegin("usersByUser", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("usersByUser", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

UserServiceProcessor.prototype.process_add = function(seqid, input, output) {
  var args = new UserService_add_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.add.length === 1) {
    Q.fcall(this._handler.add, args.bean)
      .then(function(result) {
        var result = new UserService_add_result({success: result});
        output.writeMessageBegin("add", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new UserService_add_result(err);
          output.writeMessageBegin("add", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("add", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.add(args.bean, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new UserService_add_result((err != null ? err : {success: result}));
        output.writeMessageBegin("add", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("add", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

UserServiceProcessor.prototype.process_update = function(seqid, input, output) {
  var args = new UserService_update_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.update.length === 1) {
    Q.fcall(this._handler.update, args.bean)
      .then(function(result) {
        var result = new UserService_update_result({success: result});
        output.writeMessageBegin("update", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new UserService_update_result(err);
          output.writeMessageBegin("update", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("update", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.update(args.bean, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new UserService_update_result((err != null ? err : {success: result}));
        output.writeMessageBegin("update", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("update", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

UserServiceProcessor.prototype.process_setRoles = function(seqid, input, output) {
  var args = new UserService_setRoles_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.setRoles.length === 3) {
    Q.fcall(this._handler.setRoles, args.user, args.parent, args.roles)
      .then(function(result) {
        var result = new UserService_setRoles_result({success: result});
        output.writeMessageBegin("setRoles", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new UserService_setRoles_result(err);
          output.writeMessageBegin("setRoles", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("setRoles", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.setRoles(args.user, args.parent, args.roles, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new UserService_setRoles_result((err != null ? err : {success: result}));
        output.writeMessageBegin("setRoles", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("setRoles", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

