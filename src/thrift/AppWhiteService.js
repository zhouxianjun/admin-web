//
// Autogenerated by Thrift Compiler (0.9.3)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;

var PublicStruct_ttypes = require('./PublicStruct_types')


var ttypes = require('./AppWhiteService_types');
//HELPER FUNCTIONS AND STRUCTURES

AppWhiteService_add_args = function(args) {
  this.bean = null;
  if (args) {
    if (args.bean !== undefined && args.bean !== null) {
      this.bean = new PublicStruct_ttypes.AppWhiteStruct(args.bean);
    }
  }
};
AppWhiteService_add_args.prototype = {};
AppWhiteService_add_args.prototype.read = function(input) {
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
        this.bean = new PublicStruct_ttypes.AppWhiteStruct();
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

AppWhiteService_add_args.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_add_args');
  if (this.bean !== null && this.bean !== undefined) {
    output.writeFieldBegin('bean', Thrift.Type.STRUCT, 1);
    this.bean.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AppWhiteService_add_result = function(args) {
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
AppWhiteService_add_result.prototype = {};
AppWhiteService_add_result.prototype.read = function(input) {
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

AppWhiteService_add_result.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_add_result');
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

AppWhiteService_update_args = function(args) {
  this.bean = null;
  if (args) {
    if (args.bean !== undefined && args.bean !== null) {
      this.bean = new PublicStruct_ttypes.AppWhiteStruct(args.bean);
    }
  }
};
AppWhiteService_update_args.prototype = {};
AppWhiteService_update_args.prototype.read = function(input) {
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
        this.bean = new PublicStruct_ttypes.AppWhiteStruct();
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

AppWhiteService_update_args.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_update_args');
  if (this.bean !== null && this.bean !== undefined) {
    output.writeFieldBegin('bean', Thrift.Type.STRUCT, 1);
    this.bean.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AppWhiteService_update_result = function(args) {
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
AppWhiteService_update_result.prototype = {};
AppWhiteService_update_result.prototype.read = function(input) {
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

AppWhiteService_update_result.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_update_result');
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

AppWhiteService_remove_args = function(args) {
  this.id = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    }
  }
};
AppWhiteService_remove_args.prototype = {};
AppWhiteService_remove_args.prototype.read = function(input) {
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

AppWhiteService_remove_args.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_remove_args');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I64, 1);
    output.writeI64(this.id);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AppWhiteService_remove_result = function(args) {
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
AppWhiteService_remove_result.prototype = {};
AppWhiteService_remove_result.prototype.read = function(input) {
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

AppWhiteService_remove_result.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_remove_result');
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

AppWhiteService_listByPage_args = function(args) {
  this.page = null;
  if (args) {
    if (args.page !== undefined && args.page !== null) {
      this.page = new PublicStruct_ttypes.PageParamStruct(args.page);
    }
  }
};
AppWhiteService_listByPage_args.prototype = {};
AppWhiteService_listByPage_args.prototype.read = function(input) {
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
        this.page = new PublicStruct_ttypes.PageParamStruct();
        this.page.read(input);
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

AppWhiteService_listByPage_args.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_listByPage_args');
  if (this.page !== null && this.page !== undefined) {
    output.writeFieldBegin('page', Thrift.Type.STRUCT, 1);
    this.page.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AppWhiteService_listByPage_result = function(args) {
  this.success = null;
  this.ex = null;
  if (args instanceof PublicStruct_ttypes.InvalidOperation) {
    this.ex = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new PublicStruct_ttypes.PageStruct(args.success);
    }
    if (args.ex !== undefined && args.ex !== null) {
      this.ex = args.ex;
    }
  }
};
AppWhiteService_listByPage_result.prototype = {};
AppWhiteService_listByPage_result.prototype.read = function(input) {
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
        this.success = new PublicStruct_ttypes.PageStruct();
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

AppWhiteService_listByPage_result.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_listByPage_result');
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

AppWhiteService_changeAppFile_args = function(args) {
  this.id = null;
  this.resources = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    }
    if (args.resources !== undefined && args.resources !== null) {
      this.resources = new PublicStruct_ttypes.ResourcesStruct(args.resources);
    }
  }
};
AppWhiteService_changeAppFile_args.prototype = {};
AppWhiteService_changeAppFile_args.prototype.read = function(input) {
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
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.resources = new PublicStruct_ttypes.ResourcesStruct();
        this.resources.read(input);
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

AppWhiteService_changeAppFile_args.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_changeAppFile_args');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.I64, 1);
    output.writeI64(this.id);
    output.writeFieldEnd();
  }
  if (this.resources !== null && this.resources !== undefined) {
    output.writeFieldBegin('resources', Thrift.Type.STRUCT, 2);
    this.resources.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AppWhiteService_changeAppFile_result = function(args) {
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
AppWhiteService_changeAppFile_result.prototype = {};
AppWhiteService_changeAppFile_result.prototype.read = function(input) {
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

AppWhiteService_changeAppFile_result.prototype.write = function(output) {
  output.writeStructBegin('AppWhiteService_changeAppFile_result');
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

AppWhiteServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
AppWhiteServiceClient.prototype = {};
AppWhiteServiceClient.prototype.seqid = function() { return this._seqid; }
AppWhiteServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
AppWhiteServiceClient.prototype.add = function(bean, callback) {
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

AppWhiteServiceClient.prototype.send_add = function(bean) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('add', Thrift.MessageType.CALL, this.seqid());
  var args = new AppWhiteService_add_args();
  args.bean = bean;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AppWhiteServiceClient.prototype.recv_add = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AppWhiteService_add_result();
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
AppWhiteServiceClient.prototype.update = function(bean, callback) {
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

AppWhiteServiceClient.prototype.send_update = function(bean) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('update', Thrift.MessageType.CALL, this.seqid());
  var args = new AppWhiteService_update_args();
  args.bean = bean;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AppWhiteServiceClient.prototype.recv_update = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AppWhiteService_update_result();
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
AppWhiteServiceClient.prototype.remove = function(id, callback) {
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
    this.send_remove(id);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_remove(id);
  }
};

AppWhiteServiceClient.prototype.send_remove = function(id) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('remove', Thrift.MessageType.CALL, this.seqid());
  var args = new AppWhiteService_remove_args();
  args.id = id;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AppWhiteServiceClient.prototype.recv_remove = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AppWhiteService_remove_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('remove failed: unknown result');
};
AppWhiteServiceClient.prototype.listByPage = function(page, callback) {
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
    this.send_listByPage(page);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_listByPage(page);
  }
};

AppWhiteServiceClient.prototype.send_listByPage = function(page) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('listByPage', Thrift.MessageType.CALL, this.seqid());
  var args = new AppWhiteService_listByPage_args();
  args.page = page;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AppWhiteServiceClient.prototype.recv_listByPage = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AppWhiteService_listByPage_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('listByPage failed: unknown result');
};
AppWhiteServiceClient.prototype.changeAppFile = function(id, resources, callback) {
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
    this.send_changeAppFile(id, resources);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_changeAppFile(id, resources);
  }
};

AppWhiteServiceClient.prototype.send_changeAppFile = function(id, resources) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('changeAppFile', Thrift.MessageType.CALL, this.seqid());
  var args = new AppWhiteService_changeAppFile_args();
  args.id = id;
  args.resources = resources;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

AppWhiteServiceClient.prototype.recv_changeAppFile = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new AppWhiteService_changeAppFile_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.ex) {
    return callback(result.ex);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('changeAppFile failed: unknown result');
};
AppWhiteServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
AppWhiteServiceProcessor.prototype.process = function(input, output) {
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

AppWhiteServiceProcessor.prototype.process_add = function(seqid, input, output) {
  var args = new AppWhiteService_add_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.add.length === 1) {
    Q.fcall(this._handler.add, args.bean)
      .then(function(result) {
        var result = new AppWhiteService_add_result({success: result});
        output.writeMessageBegin("add", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new AppWhiteService_add_result(err);
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
        var result = new AppWhiteService_add_result((err != null ? err : {success: result}));
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

AppWhiteServiceProcessor.prototype.process_update = function(seqid, input, output) {
  var args = new AppWhiteService_update_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.update.length === 1) {
    Q.fcall(this._handler.update, args.bean)
      .then(function(result) {
        var result = new AppWhiteService_update_result({success: result});
        output.writeMessageBegin("update", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new AppWhiteService_update_result(err);
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
        var result = new AppWhiteService_update_result((err != null ? err : {success: result}));
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

AppWhiteServiceProcessor.prototype.process_remove = function(seqid, input, output) {
  var args = new AppWhiteService_remove_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.remove.length === 1) {
    Q.fcall(this._handler.remove, args.id)
      .then(function(result) {
        var result = new AppWhiteService_remove_result({success: result});
        output.writeMessageBegin("remove", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new AppWhiteService_remove_result(err);
          output.writeMessageBegin("remove", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("remove", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.remove(args.id, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new AppWhiteService_remove_result((err != null ? err : {success: result}));
        output.writeMessageBegin("remove", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("remove", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

AppWhiteServiceProcessor.prototype.process_listByPage = function(seqid, input, output) {
  var args = new AppWhiteService_listByPage_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.listByPage.length === 1) {
    Q.fcall(this._handler.listByPage, args.page)
      .then(function(result) {
        var result = new AppWhiteService_listByPage_result({success: result});
        output.writeMessageBegin("listByPage", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new AppWhiteService_listByPage_result(err);
          output.writeMessageBegin("listByPage", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("listByPage", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.listByPage(args.page, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new AppWhiteService_listByPage_result((err != null ? err : {success: result}));
        output.writeMessageBegin("listByPage", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("listByPage", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

AppWhiteServiceProcessor.prototype.process_changeAppFile = function(seqid, input, output) {
  var args = new AppWhiteService_changeAppFile_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.changeAppFile.length === 2) {
    Q.fcall(this._handler.changeAppFile, args.id, args.resources)
      .then(function(result) {
        var result = new AppWhiteService_changeAppFile_result({success: result});
        output.writeMessageBegin("changeAppFile", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        if (err instanceof PublicStruct_ttypes.InvalidOperation) {
          var result = new AppWhiteService_changeAppFile_result(err);
          output.writeMessageBegin("changeAppFile", Thrift.MessageType.REPLY, seqid);
        } else {
          var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
          output.writeMessageBegin("changeAppFile", Thrift.MessageType.EXCEPTION, seqid);
        }
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.changeAppFile(args.id, args.resources, function (err, result) {
      if (err == null || err instanceof PublicStruct_ttypes.InvalidOperation) {
        var result = new AppWhiteService_changeAppFile_result((err != null ? err : {success: result}));
        output.writeMessageBegin("changeAppFile", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("changeAppFile", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}
